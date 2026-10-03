/* main.js: nav, toasts, FAQ, service filters, product page, forms */
(function () {
  "use strict";

  var Cart = window.AutoFlowCart;
  var icon = function (n) { return (Cart && Cart.icon(n)) || ""; };

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Toast notifications ---------- */
  function toast(message, opts) {
    opts = opts || {};
    var region = document.querySelector(".toast-region");
    if (!region) return;
    var el = document.createElement("div");
    el.className = "toast" + (opts.type === "error" ? " error" : "");
    el.setAttribute("role", opts.type === "error" ? "alert" : "status");
    var action = opts.action ? '<a href="' + opts.action.href + '">' + escapeHTML(opts.action.label) + "</a>" : "";
    el.innerHTML = icon(opts.icon || (opts.type === "error" ? "alert" : "check-circle")) +
      '<span class="toast-msg">' + escapeHTML(message) + "</span>" + action;
    region.appendChild(el);
    while (region.children.length > 3) region.removeChild(region.firstChild);
    setTimeout(function () {
      el.classList.add("leaving");
      setTimeout(function () { el.remove(); }, 220);
    }, opts.duration || 3600);
  }
  window.AutoFlowToast = toast;

  /* ---------- Header: scroll state + mobile navigation ---------- */
  function initNav() {
    var header = document.querySelector(".site-header");
    var onScroll = function () { if (header) header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("primary-nav");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("open", open);
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !e.target.closest(".nav")) setOpen(false);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 980) setOpen(false); });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    document.querySelectorAll(".faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        btn.setAttribute("aria-expanded", String(!open));
        if (panel) panel.hidden = open;
      });
    });
  }

  /* ---------- Services page filters ---------- */
  function initFilters() {
    var buttons = document.querySelectorAll("[data-filter]");
    if (!buttons.length) return;
    var cards = document.querySelectorAll("[data-categories]");
    var status = document.getElementById("filter-status");

    function apply(filter) {
      var shown = 0;
      cards.forEach(function (card) {
        var cats = card.getAttribute("data-categories").split(" ");
        var match = filter === "all" || cats.indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === filter)); });
      if (status) status.textContent = "Showing " + shown + (shown === 1 ? " service" : " services");
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); });
    });
  }

  /* ---------- Product detail page: show the requested product ---------- */
  function initProductPage() {
    var articles = document.querySelectorAll("[data-product-detail]");
    if (!articles.length) return;
    var id = new URLSearchParams(window.location.search).get("id");
    var target = id && document.querySelector('[data-product-detail="' + CSS.escape(id) + '"]');
    if (!target) return; // keep default (Invoice Automation)
    articles.forEach(function (a) { a.hidden = a !== target; });
    var p = Cart && Cart.byId(id);
    if (p) {
      document.title = p.name + " | AutoFlow";
      var crumb = document.querySelector("[data-crumb-current]");
      if (crumb) crumb.textContent = p.name;
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", p.short);
    }
  }

  /* ---------- Form validation ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}([\/?#][^\s]*)?$/i;

  function validateField(el) {
    var field = el.closest(".field");
    if (!field) return true;
    var err = field.querySelector(".error-msg");
    var isCheck = el.type === "checkbox";
    var v = isCheck ? el.checked : el.value.trim();
    var rule = el.getAttribute("data-validate");
    var msg = "";

    if (el.required && !v) {
      msg = el.getAttribute("data-required-msg") || (isCheck ? "Please confirm to continue." : "This field is required.");
    } else if (v && !isCheck) {
      if (el.type === "email" && !EMAIL_RE.test(v)) msg = "Enter a valid email address, e.g. name@business.com.";
      else if (rule === "url" && !URL_RE.test(v)) msg = "Enter a valid website, e.g. yourbusiness.com.";
      else if (rule === "phone" && v.replace(/\D/g, "").length < 10) msg = "Enter a valid phone number with area code.";
      else if (rule === "card" && !/^\d{13,19}$/.test(v.replace(/\s/g, ""))) msg = "Enter a 13–19 digit demo card number.";
      else if (rule === "expiry") msg = expiryError(v);
      else if (rule === "cvv" && !/^\d{3,4}$/.test(v)) msg = "Enter a 3 or 4 digit CVV.";
      else if (el.getAttribute("data-min") && v.length < Number(el.getAttribute("data-min")))
        msg = "Please add a little more detail (at least " + el.getAttribute("data-min") + " characters).";
    }

    field.classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg;
    return !msg;
  }

  function expiryError(v) {
    var m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(v);
    if (!m) return "Use the format MM/YY.";
    var month = Number(m[1]), year = 2000 + Number(m[2]);
    if (month < 1 || month > 12) return "Enter a month between 01 and 12.";
    var now = new Date();
    var endOfMonth = new Date(year, month, 0, 23, 59, 59);
    if (endOfMonth < now) return "This expiry date is in the past.";
    return "";
  }

  function fieldsOf(form) {
    return Array.prototype.filter.call(form.querySelectorAll("input, select, textarea"), function (el) {
      return el.type !== "hidden" && !el.disabled && el.closest(".field");
    });
  }

  function validateForm(form) {
    var firstInvalid = null;
    fieldsOf(form).forEach(function (el) {
      if (!validateField(el) && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      toast("Please fix the highlighted fields.", { type: "error" });
    }
    return !firstInvalid;
  }

  function liveValidation(form) {
    fieldsOf(form).forEach(function (el) {
      el.addEventListener("blur", function () { if (el.value || el.dataset.touched) validateField(el); el.dataset.touched = "1"; });
      el.addEventListener(el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input", function () {
        if (el.closest(".field.invalid")) validateField(el);
      });
    });
  }

  /* Card-number / expiry formatting (demo fields only) */
  function initPaymentFormatting(form) {
    var card = form.querySelector('[data-validate="card"]');
    var exp = form.querySelector('[data-validate="expiry"]');
    var cvv = form.querySelector('[data-validate="cvv"]');
    if (card) card.addEventListener("input", function () {
      var d = card.value.replace(/\D/g, "").slice(0, 19);
      card.value = d.replace(/(\d{4})(?=\d)/g, "$1 ");
    });
    if (exp) exp.addEventListener("input", function (e) {
      var d = exp.value.replace(/\D/g, "").slice(0, 4);
      if (e.inputType && e.inputType.indexOf("delete") === 0) { exp.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; return; }
      exp.value = d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
    });
    if (cvv) cvv.addEventListener("input", function () { cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4); });
  }

  /* ---------- Contact form ---------- */
  function initContact() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    liveValidation(form);

    var interest = new URLSearchParams(window.location.search).get("interest");
    var select = form.querySelector("#interest");
    if (interest && select && select.querySelector('option[value="' + CSS.escape(interest) + '"]')) select.value = interest;

    var success = document.getElementById("contact-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      var name = form.querySelector("#name").value.trim().split(" ")[0];
      form.hidden = true;
      if (success) {
        success.querySelector("[data-success-name]").textContent = name;
        success.hidden = false;
        success.focus();
      }
      form.reset();
      toast("Message sent (demo). Thanks, " + name + "!");
    });
    var again = document.getElementById("contact-again");
    if (again) again.addEventListener("click", function () {
      success.hidden = true; form.hidden = false;
      fieldsOf(form).forEach(function (el) { el.closest(".field").classList.remove("invalid"); el.removeAttribute("aria-invalid"); });
      form.querySelector("input").focus();
    });
  }

  /* ---------- Demo checkout ---------- */
  function initCheckout() {
    var form = document.getElementById("checkout-form");
    if (!form || !Cart) return;
    var summary = document.getElementById("checkout-summary");
    var submit = form.querySelector('button[type="submit"]');
    var confirmation = document.getElementById("order-confirmation");
    var main = document.getElementById("checkout-main");

    function renderSummary() {
      if (!summary || main.hidden) return;
      var t = Cart.totals();
      if (!t.items.length) {
        summary.innerHTML =
          '<h2 id="checkout-summary-title">Order summary</h2>' +
          '<p>Your cart is empty. Add a service before checking out.</p>' +
          '<a class="btn btn-primary btn-block" href="services.html">Browse services</a>';
        submit.disabled = true;
        return;
      }
      submit.disabled = false;
      summary.innerHTML =
        '<h2 id="checkout-summary-title">Order summary</h2>' +
        '<ul class="summary-items">' + t.items.map(function (i) {
          return "<li><span>" + i.product.name + (i.qty > 1 ? ' <span class="qty-x">× ' + i.qty + "</span>" : "") + "</span><span>" + Cart.fmt(i.line) + "</span></li>";
        }).join("") + "</ul>" +
        Cart.summaryRows(t) +
        '<p class="demo-note">' + icon("lock") + '<span>Demo checkout. No payment is processed and nothing you enter is sent or stored. <a class="text-link" href="cart.html">Edit cart</a></span></p>';
    }

    renderSummary();
    document.addEventListener("cart:change", renderSummary);
    document.addEventListener("cart:sync", renderSummary);
    liveValidation(form);
    initPaymentFormatting(form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (Cart.count() === 0) { toast("Your cart is empty.", { type: "error" }); return; }
      if (!validateForm(form)) return;

      var t = Cart.totals();
      var orderNo = "AF-" + Date.now().toString(36).toUpperCase().slice(-6);
      var first = form.querySelector("#firstName").value.trim();
      var email = form.querySelector("#email").value.trim();

      confirmation.innerHTML =
        '<div class="card success-panel">' +
          '<span class="icon-box lg">' + icon("check") + "</span>" +
          '<h2 tabindex="-1" id="confirm-title">Demo order placed</h2>' +
          "<p>Thanks, " + escapeHTML(first) + '. Your order <span class="order-number">' + orderNo + "</span> has been recorded in this browser only.</p>" +
          "<p>In a live store, a setup questionnaire would now be sent to <strong>" + escapeHTML(email) + "</strong> so we could start building your workflow.</p>" +
          '<div class="order-recap">' +
            '<ul class="summary-items">' + t.items.map(function (i) {
              return "<li><span>" + i.product.name + (i.qty > 1 ? ' <span class="qty-x">× ' + i.qty + "</span>" : "") + "</span><span>" + Cart.fmt(i.line) + "</span></li>";
            }).join("") + "</ul>" +
            Cart.summaryRows(t) +
          "</div>" +
          '<div class="notice" style="margin-top:28px;text-align:left">' + icon("info") +
            "<p><strong>No payment was processed.</strong> This website is an academic demonstration and does not process real payments.</p></div>" +
          '<div class="cta-actions"><a class="btn btn-primary" href="index.html">Back to home</a><a class="btn btn-secondary" href="blog.html">Read the blog</a></div>' +
        "</div>";

      form.reset(); // clears demo card fields immediately
      main.hidden = true;
      confirmation.hidden = false;
      Cart.clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
      var title = document.getElementById("confirm-title");
      if (title) title.focus({ preventScroll: true });
      toast("Demo order " + orderNo + " placed.");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initFAQ();
    initFilters();
    initProductPage();
    initContact();
    initCheckout();
  });

  window.AutoFlowForms = { validateForm: validateForm, validateField: validateField };
})();
