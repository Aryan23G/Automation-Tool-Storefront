/* ==========================================================================
   AutoFlow — Automation Builder
   Turns the visitor's selections into a visual workflow and suggests
   the matching service with an estimated price. Front-end only.
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("builder-form");
  var output = document.getElementById("builder-output");
  if (!form || !output) return;

  var Cart = window.AutoFlowCart;
  var icon = function (n) { return (Cart && Cart.icon(n)) || ""; };

  var TASKS = {
    emails:       { label: "Emails",              product: "email" },
    spreadsheets: { label: "Spreadsheets",        product: "spreadsheet" },
    invoices:     { label: "Invoices",            product: "invoice" },
    followups:    { label: "Customer Follow-Ups", product: "followup" },
    reports:      { label: "Reports",             product: "spreadsheet" },
    dataentry:    { label: "Data Entry",          product: "spreadsheet" }
  };

  var TRIGGERS = {
    order:    { label: "New Order",       detail: "Starts when an order is placed",        icon: "bag" },
    form:     { label: "Form Submitted",  detail: "Starts when someone completes a form",  icon: "clipboard" },
    customer: { label: "New Customer",    detail: "Starts when a new customer is added",   icon: "user-plus" },
    schedule: { label: "Scheduled Time",  detail: "Runs automatically on a set schedule",  icon: "clock" },
    manual:   { label: "Manual Trigger",  detail: "Starts when you click a button",        icon: "pointer" }
  };

  // Display order keeps the workflow logical regardless of click order.
  var ACTIONS = {
    save:        { label: "Save Customer",      detail: "Customer details stored",        icon: "user" },
    spreadsheet: { label: "Update Spreadsheet", detail: "New row added, totals updated",  icon: "table" },
    invoice:     { label: "Create Invoice",     detail: "Invoice generated from details", icon: "receipt" },
    report:      { label: "Generate Report",    detail: "Summary report prepared",        icon: "chart" },
    email:       { label: "Send Email",         detail: "Message delivered automatically", icon: "mail" },
    notify:      { label: "Notify Employee",    detail: "Your team gets an alert",        icon: "bell" }
  };
  var ORDER = ["save", "spreadsheet", "invoice", "report", "email", "notify"];

  function selected() {
    var task = form.querySelector('input[name="task"]:checked');
    var trigger = form.querySelector('input[name="trigger"]:checked');
    var actions = Array.prototype.map.call(form.querySelectorAll('input[name="actions"]:checked'), function (i) { return i.value; });
    actions.sort(function (a, b) { return ORDER.indexOf(a) - ORDER.indexOf(b); });
    return { task: task && task.value, trigger: trigger && trigger.value, actions: actions };
  }

  /* Work out which packaged service(s) cover the selections. */
  function recommend(sel) {
    var needs = [TASKS[sel.task].product];
    function need(id) { if (needs.indexOf(id) === -1) needs.push(id); }

    sel.actions.forEach(function (a) {
      if (a === "invoice") need("invoice");
      if (a === "spreadsheet" || a === "report") need("spreadsheet");
      if (a === "email" || a === "notify") need(sel.task === "followups" ? "followup" : "email");
    });
    // Invoice Automation already emails the invoice; the follow-up system already sends emails.
    if (needs.indexOf("email") !== -1 && (needs.indexOf("invoice") !== -1 || needs.indexOf("followup") !== -1)) {
      needs.splice(needs.indexOf("email"), 1);
    }

    var products = needs.map(function (id) { return Cart.byId(id); });
    var sum = products.reduce(function (s, p) { return s + p.price; }, 0);
    var custom = Cart.byId("custom");

    if (sel.actions.length >= 5 || products.length >= 3 || sum >= custom.price) {
      return {
        type: "custom", products: [custom],
        reason: "Your workflow connects several tools and steps, so a tailored setup is the best fit."
      };
    }
    if (products.length === 2) {
      return {
        type: "bundle", products: products, total: sum,
        reason: "This workflow combines two of our packaged services."
      };
    }
    return { type: "single", products: products, total: sum, reason: products[0].short };
  }

  function stepHTML(cls, ic, title, detail, tag) {
    return '<li class="flow-step ' + cls + '">' +
      '<span class="step-icon">' + icon(ic) + "</span>" +
      '<span class="step-text"><strong>' + title + "</strong><small>" + detail + "</small></span>" +
      (tag ? '<span class="step-tag">' + tag + "</span>" : '<span class="step-check">' + icon("check") + "</span>") +
      "</li>";
  }

  function render() {
    var sel = selected();
    if (!sel.task || !sel.trigger) return;
    var trig = TRIGGERS[sel.trigger];

    var steps = stepHTML("trigger", trig.icon, trig.label, trig.detail, "Trigger");
    sel.actions.forEach(function (a) { steps += stepHTML("", ACTIONS[a].icon, ACTIONS[a].label, ACTIONS[a].detail); });

    var flowText = [trig.label].concat(sel.actions.map(function (a) { return ACTIONS[a].label; })).join(" → ");

    var recHTML;
    if (!sel.actions.length) {
      recHTML = '<div class="builder-empty">Choose at least one action in step 3 to complete your workflow.</div>';
    } else {
      var r = recommend(sel);
      var names = r.products.map(function (p) { return p.name; }).join(" + ");
      var priceHTML = r.type === "custom"
        ? '<span class="price-prefix">Starting at</span><span class="price-amount">' + Cart.fmt(r.products[0].price).replace(".00", "") + '</span><span class="price-suffix">final quote after review</span>'
        : '<span class="price-amount">' + Cart.fmt(r.total).replace(".00", "") + '</span><span class="price-suffix">estimated one-time setup</span>';
      var actions = r.type === "custom"
        ? '<a class="btn btn-gradient" href="contact.html?interest=custom">Request Custom Setup</a>' +
          '<a class="btn btn-secondary" href="product.html?id=custom">View details</a>'
        : '<button type="button" class="btn btn-primary" data-add-to-cart="' + r.products.map(function (p) { return p.id; }).join(",") + '">' + icon("cart") + "<span>Add to Cart</span></button>" +
          '<a class="btn btn-secondary" href="product.html?id=' + r.products[0].id + '">View details</a>';
      recHTML =
        '<div class="recommend">' +
          '<p class="label">' + (r.type === "custom" ? "Recommended · Custom solution" : r.type === "bundle" ? "Recommended bundle" : "Recommended service") + "</p>" +
          "<h3>" + names + "</h3>" +
          "<p>" + r.reason + "</p>" +
          '<div class="price">' + priceHTML + "</div>" +
          '<div class="card-actions">' + actions + "</div>" +
        "</div>";
    }

    output.innerHTML =
      '<ol class="flow-steps">' + steps + "</ol>" +
      '<p class="builder-summary"><strong>Automating ' + TASKS[sel.task].label.toLowerCase() + ":</strong> " + flowText + "</p>" +
      recHTML;
  }

  /* Pre-select a task from the URL, e.g. automation-builder.html?task=invoices */
  var preset = new URLSearchParams(window.location.search).get("task");
  if (preset && TASKS[preset]) {
    var radio = form.querySelector('input[name="task"][value="' + preset + '"]');
    if (radio) radio.checked = true;
  }

  form.addEventListener("change", render);
  form.addEventListener("reset", function () { setTimeout(render, 0); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  render();
})();
