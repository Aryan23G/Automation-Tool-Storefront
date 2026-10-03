/* Product catalogue and shared icons */
window.AUTOFLOW_PRODUCTS = [
  {
    "id": "email",
    "name": "Email Automation Setup",
    "price": 99,
    "from": false,
    "premium": false,
    "icon": "mail",
    "short": "Automatically send routine emails without manually writing and sending them every time.",
    "categories": [
      "communication"
    ]
  },
  {
    "id": "spreadsheet",
    "name": "Spreadsheet Automation",
    "price": 149,
    "from": false,
    "premium": false,
    "icon": "table",
    "short": "Reduce repetitive spreadsheet work by automatically organizing, updating, and processing business data.",
    "categories": [
      "data"
    ]
  },
  {
    "id": "invoice",
    "name": "Invoice Automation",
    "price": 199,
    "from": false,
    "premium": false,
    "icon": "receipt",
    "short": "Automatically create and send invoices when a customer makes a purchase or completes a service request.",
    "categories": [
      "sales"
    ]
  },
  {
    "id": "followup",
    "name": "Customer Follow-Up System",
    "price": 249,
    "from": false,
    "premium": false,
    "icon": "followup",
    "short": "Automatically follow up with customers after purchases, bookings, or service appointments.",
    "categories": [
      "communication",
      "sales"
    ]
  },
  {
    "id": "custom",
    "name": "Custom Business Workflow",
    "price": 499,
    "from": true,
    "premium": true,
    "icon": "layers",
    "short": "A customized automation system that connects several business tools and automates an entire process.",
    "categories": [
      "operations"
    ]
  }
];

window.AUTOFLOW_ICONS = {
  "mail": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3.5 7 8.5 6 8.5-6\"/></svg>",
  "table": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 10h18M3 15h18M9 4v16\"/></svg>",
  "receipt": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M6 3h12v18l-3-2-3 2-3-2-3 2V3z\"/><path d=\"M9 8h6M9 12h6M9 16h3\"/></svg>",
  "followup": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 20 12z\"/><path d=\"M12 8v4l2.5 1.5\"/></svg>",
  "layers": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m12 3 9 5-9 5-9-5 9-5z\"/><path d=\"m3 13 9 5 9-5\"/><path d=\"m3 17.5 9 4.5 9-4.5\" opacity=\".5\"/></svg>",
  "clock": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>",
  "shield": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3 4.5 6v6c0 4.4 3.2 8.2 7.5 9 4.3-.8 7.5-4.6 7.5-9V6L12 3z\"/><path d=\"m9 12 2 2 4-4\"/></svg>",
  "folder": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.5h7.5A2.5 2.5 0 0 1 21 10v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17V7.5z\"/><path d=\"m9 13.5 2 2 4-4\"/></svg>",
  "sparkles": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z\"/><path d=\"M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7L19 15z\"/></svg>",
  "check": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m5 12.5 4.5 4.5L19 7\"/></svg>",
  "check-circle": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8 12.5 3 3 5-6\"/></svg>",
  "cart": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"9\" cy=\"20\" r=\"1.4\"/><circle cx=\"18\" cy=\"20\" r=\"1.4\"/><path d=\"M2.5 3.5h2.6l2.5 11.6a1.2 1.2 0 0 0 1.2.9h9.3a1.2 1.2 0 0 0 1.2-.9L21 7.5H6\"/></svg>",
  "arrow-right": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg>",
  "arrow-left": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M19 12H5M11 6l-6 6 6 6\"/></svg>",
  "arrow-down": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 5v14M6 13l6 6 6-6\"/></svg>",
  "menu": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 7h16M4 12h16M4 17h16\"/></svg>",
  "x": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M6 6l12 12M18 6 6 18\"/></svg>",
  "plus": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 5v14M5 12h14\"/></svg>",
  "minus": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 12h14\"/></svg>",
  "trash": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3\"/></svg>",
  "user": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/></svg>",
  "user-plus": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"10\" cy=\"8\" r=\"4\"/><path d=\"M2.5 21a7.5 7.5 0 0 1 15 0M19 8v6M16 11h6\"/></svg>",
  "users": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"9\" cy=\"8\" r=\"3.5\"/><path d=\"M2.5 20a6.5 6.5 0 0 1 13 0\"/><path d=\"M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6\"/></svg>",
  "bag": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8z\"/><path d=\"M9 8V6.5a3 3 0 0 1 6 0V8\"/></svg>",
  "send": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M21 3 10 14\"/><path d=\"m21 3-7 18-4-7-7-4 18-7z\"/></svg>",
  "bell": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M6 9a6 6 0 1 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9z\"/><path d=\"M10 20.5a2.2 2.2 0 0 0 4 0\"/></svg>",
  "chart": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 20V11M10 20V5M16 20v-6M3 20h18\"/></svg>",
  "lock": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7.5a4 4 0 0 1 8 0V11\"/></svg>",
  "info": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5.5M12 7.8v.2\"/></svg>",
  "alert": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7.5v5.5M12 16.2v.2\"/></svg>",
  "clipboard": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"/><path d=\"M9 3h6v3H9zM9 11h6M9 15h4\"/></svg>",
  "pointer": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M9 4v9.5l-2-2a1.6 1.6 0 0 0-2.3 2.3L9 18.5c1.2 1.4 2.7 2.5 5 2.5 3 0 5-2.3 5-5.3V11a1.5 1.5 0 0 0-3 0v-.5a1.5 1.5 0 0 0-3 0V10a1.5 1.5 0 0 0-3 0V4a1.5 1.5 0 0 0-3 0z\"/></svg>",
  "calendar": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2\"/><path d=\"M3.5 10h17M8 3v4M16 3v4\"/></svg>",
  "book": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z\"/><path d=\"M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z\"/></svg>",
  "code": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16\"/></svg>",
  "zap": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M13 3 4 14h7l-1 7 9-11h-7l1-7z\"/></svg>",
  "file": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5z\"/><path d=\"M14 3v5h5M9 13h6M9 17h4\"/></svg>",
  "workflow": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/><path d=\"M6.5 10v3.5a2 2 0 0 0 2 2H14\"/></svg>",
  "graduation": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M2 9.5 12 5l10 4.5L12 14 2 9.5z\"/><path d=\"M6 11.5V16c3.5 2.7 8.5 2.7 12 0v-4.5M22 9.5V15\"/></svg>",
  "message": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 5h16v11H9l-5 4V5z\"/><path d=\"M8 9.5h8M8 12.5h5\"/></svg>",
  "globe": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z\"/></svg>",
  "card": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2\"/><path d=\"M2.5 10h19M6.5 15h4\"/></svg>",
  "repeat": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M17 3l3 3-3 3\"/><path d=\"M4 11V9.5A3.5 3.5 0 0 1 7.5 6H20M7 21l-3-3 3-3\"/><path d=\"M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H4\"/></svg>",
  "target": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/></svg>",
  "hand": "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M18 11V6.5a1.5 1.5 0 0 0-3 0V11M15 10V4.5a1.5 1.5 0 0 0-3 0V10M12 10V5.5a1.5 1.5 0 0 0-3 0V13l-1.8-1.8a1.6 1.6 0 0 0-2.3 2.3l3.6 4C9.8 19.4 11.3 21 14 21c3 0 4-2 4-5v-5z\"/></svg>"
};
