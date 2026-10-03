/* cart.js: cart stored in localStorage so it persists across pages */
(function () {
  "use strict";

  var STORAGE_KEY = "autoflow_cart_v1";
  var TAX_RATE = 0.13; // Ontario HST, estimate only
  var MAX_QTY = 10;
  var PRODUCTS = window.AUTOFLOW_PRODUCTS || [];
  var ICONS = window.AUTOFLOW_ICONS || {};
  var memoryCart = []; // fallback if localStorage is unavailable (e.g. private mode)

  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  function sanitize(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(function (item) {
      return item && byId(item.id) && Number.isInteger(item.qty) && item.qty > 0;
    }).map(function (item) {
      return { id: item.id, qty: Math.min(MAX_QTY, item.qty) };
    });
  }

  function read() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null) return memoryCart.slice();
      return sanitize(JSON.parse(raw));
    } catch (e) {
      return memoryCart.slice();
    }
  }

  function write(items) {
    memoryCart = items.slice();
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* ignore */ }
    document.dispatchEvent(new CustomEvent("cart:change", { detail: { items: items } }));
  }

  function add(id, qty) {
    qty = qty || 1;
    if (!byId(id)) return false;
    var items = read();
    var existing = items.find(function (i) { return i.id === id; });
    if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
    else items.push({ id: id, qty: Math.min(MAX_QTY, qty) });
    write(items);
    return true;
  }

  function setQty(id, qty) {
    var items = read();
    if (qty <= 0) items = items.filter(function (i) { return i.id !== id; });
    else {
      var it = items.find(function (i) { return i.id === id; });
      if (it) it.qty = Math.min(MAX_QTY, qty);
    }
    write(items);
  }

  function remove(id) { write(read().filter(function (i) { return i.id !== id; })); }
  function clear() { write([]); }
  function count() { return read().reduce(function (s, i) { return s + i.qty; }, 0); }

  function totals() {
    var items = read().map(function (i) {
      var p = byId(i.id);
      return { id: i.id, qty: i.qty, product: p, line: p.price * i.qty };
    });
    var subtotal = items.reduce(function (s, i) { return s + i.line; }, 0);
    var tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    return { items: items, subtotal: subtotal, tax: tax, total: Math.round((subtotal + tax) * 100) / 100 };
  }

  var currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
  function fmt(n) { return currency.format(n); }

  function icon(name) { return ICONS[name] || ""; }

  /* ---------- Header badge ---------- */
  function updateBadges(bump) {
    var n = count();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = String(n);
      if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
    });
    document.querySelectorAll("[data-cart-link]").forEach(function (el) {
      el.setAttribute("aria-label", "Cart, " + n + (n === 1 ? " item" : " items"));
    });
  }

  /* ---------- Add-to-cart buttons (event delegation) ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    e.preventDefault();
    var ids = btn.getAttribute("data-add-to-cart").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var names = [];
    ids.forEach(function (id) { if (add(id, 1)) names.push(byId(id).name); });
    if (!names.length) return;

    if (!btn.dataset.label) btn.dataset.label = btn.innerHTML;
    btn.classList.add("is-added");
    btn.innerHTML = icon("check") + "<span>Added</span>";
    clearTimeout(btn._resetTimer);
    btn._resetTimer = setTimeout(function () {
      btn.classList.remove("is-added");
      btn.innerHTML = btn.dataset.label;
    }, 1600);

    if (window.AutoFlowToast) {
      window.AutoFlowToast(names.join(" + ") + (names.length > 1 ? " were" : " was") + " added to your cart.", {
        action: { href: "cart.html", label: "View cart" }
      });
    }
  });

  /* ---------- Cart page rendering ---------- */
  var live; // aria-live announcer
  function announce(msg) {
    if (!live) {
      live = document.createElement("div");
      live.className = "sr-only";
      live.setAttribute("aria-live", "polite");
      document.body.appendChild(live);
    }
    live.textContent = msg;
  }

  function itemRow(i) {
    var p = i.product;
    var url = "product.html?id=" + p.id;
    return (
      '<li class="cart-item">' +
        '<span class="icon-box' + (p.premium ? " cyan" : "") + '">' + icon(p.icon) + "</span>" +
        '<div class="cart-item-info">' +
          '<a class="cart-item-name" href="' + url + '">' + p.name + "</a>" +
          '<span class="cart-item-meta">' + fmt(p.price) + (p.from ? " starting price" : "") + " · one-time setup</span>" +
        "</div>" +
        '<div class="qty" role="group" aria-label="Quantity for ' + p.name + '">' +
          '<button type="button" data-qty-dec="' + p.id + '" aria-label="Decrease quantity"' + (i.qty <= 1 ? " disabled" : "") + ">" + icon("minus") + "</button>" +
          "<output aria-live=\"polite\">" + i.qty + "</output>" +
          '<button type="button" data-qty-inc="' + p.id + '" aria-label="Increase quantity"' + (i.qty >= MAX_QTY ? " disabled" : "") + ">" + icon("plus") + "</button>" +
        "</div>" +
        '<span class="cart-line-total">' + fmt(i.line) + "</span>" +
        '<button type="button" class="remove-btn" data-remove="' + p.id + '" aria-label="Remove ' + p.name + ' from cart">' + icon("trash") + "</button>" +
      "</li>"
    );
  }

  function summaryRows(t) {
    var n = t.items.reduce(function (s, i) { return s + i.qty; }, 0);
    return (
      '<div class="summary-row"><span>Subtotal (' + n + (n === 1 ? " service" : " services") + ")</span><span>" + fmt(t.subtotal) + "</span></div>" +
      '<div class="summary-row"><span>Estimated tax (13% HST)</span><span>' + fmt(t.tax) + "</span></div>" +
      '<div class="summary-row summary-total"><span>Total</span><span>' + fmt(t.total) + "</span></div>"
    );
  }

  function renderCart() {
    var root = document.getElementById("cart-root");
    if (!root) return;
    var t = totals();
    if (!t.items.length) {
      root.innerHTML =
        '<div class="card empty-state">' +
          '<span class="icon-box lg">' + icon("cart") + "</span>" +
          "<h2 class=\"h3\">Your cart is empty</h2>" +
          "<p>Browse our automation services and add the setup that fits your business.</p>" +
          '<div class="cta-actions"><a class="btn btn-primary" href="services.html">Browse services ' + icon("arrow-right").replace('class="icon"', 'class="icon icon-arrow"') + '</a>' +
          '<a class="btn btn-secondary" href="automation-builder.html">Build your automation</a></div>' +
        "</div>";
      return;
    }
    root.innerHTML =
      '<div class="cart-layout">' +
        '<div class="card">' +
          '<h2 class="h3">Your services</h2>' +
          '<ul class="cart-list">' + t.items.map(itemRow).join("") + "</ul>" +
          '<div class="cart-footer">' +
            '<a class="btn btn-secondary" href="services.html">' + icon("arrow-left") + "Continue Shopping</a>" +
            '<button type="button" class="btn btn-ghost" data-cart-clear>Clear cart</button>' +
          "</div>" +
        "</div>" +
        '<aside class="card summary" aria-labelledby="summary-title">' +
          '<h2 id="summary-title">Order summary</h2>' +
          summaryRows(t) +
          '<a class="btn btn-primary btn-block btn-lg" href="checkout.html">Proceed to Checkout ' + icon("arrow-right").replace('class="icon"', 'class="icon icon-arrow"') + "</a>" +
          '<p class="demo-note">' + icon("info") + "<span>Prices are one-time setup fees in Canadian dollars. Tax is an estimate. This is a demo store, so no real payments are processed.</span></p>" +
        "</aside>" +
      "</div>";
  }

  function onCartClick(e) {
    var t = e.target.closest("[data-qty-inc],[data-qty-dec],[data-remove],[data-cart-clear]");
    if (!t) return;
    var id, item;
    if (t.hasAttribute("data-qty-inc")) {
      id = t.getAttribute("data-qty-inc");
      item = read().find(function (i) { return i.id === id; });
      if (item) { setQty(id, item.qty + 1); announce("Quantity increased to " + Math.min(MAX_QTY, item.qty + 1)); }
      refocus('[data-qty-inc="' + id + '"]');
    } else if (t.hasAttribute("data-qty-dec")) {
      id = t.getAttribute("data-qty-dec");
      item = read().find(function (i) { return i.id === id; });
      if (item && item.qty > 1) { setQty(id, item.qty - 1); announce("Quantity decreased to " + (item.qty - 1)); }
      refocus('[data-qty-dec="' + id + '"]');
    } else if (t.hasAttribute("data-remove")) {
      id = t.getAttribute("data-remove");
      var name = byId(id).name;
      remove(id);
      announce(name + " removed from cart");
      if (window.AutoFlowToast) window.AutoFlowToast(name + " was removed from your cart.", { icon: "trash" });
      refocus(".remove-btn, .empty-state a");
    } else if (t.hasAttribute("data-cart-clear")) {
      clear();
      announce("Cart cleared");
      refocus(".empty-state a");
    }
  }

  function refocus(selector) {
    var el = document.querySelector("#cart-root " + selector.split(", ").join(", #cart-root "));
    if (el && !el.disabled) el.focus();
  }

  /* ---------- Init ---------- */
  document.addEventListener("cart:change", function () { updateBadges(true); renderCart(); });
  window.addEventListener("storage", function (e) {
    if (e.key === STORAGE_KEY) { updateBadges(false); renderCart(); document.dispatchEvent(new CustomEvent("cart:sync")); }
  });
  document.addEventListener("DOMContentLoaded", function () {
    updateBadges(false);
    renderCart();
    var root = document.getElementById("cart-root");
    if (root) root.addEventListener("click", onCartClick);
  });

  window.AutoFlowCart = {
    add: add, remove: remove, setQty: setQty, clear: clear, count: count, read: read,
    totals: totals, byId: byId, fmt: fmt, icon: icon, summaryRows: summaryRows,
    TAX_RATE: TAX_RATE, products: PRODUCTS
  };
})();
