/* Mkweli share icons: WhatsApp, X, LinkedIn, Copy link.
   Places small 26×26 icon-only buttons in the footer meta row (.mkf-meta).
   Labels follow <html lang> / data-lang (en / fr). */
(function () {
  "use strict";
  if (document.getElementById("mk-share")) return;

  var CSS =
    ".mk-share{display:inline-flex;align-items:center;gap:6px;margin:0;padding:0;border:0;background:none}" +
    ".mkf-meta:has(.mk-share){display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.45rem 1rem;width:100%}" +
    ".mk-share .mk-sh{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border-radius:6px;border:0;cursor:pointer;text-decoration:none!important;box-sizing:border-box;flex:0 0 auto;line-height:0}" +
    ".mk-share .mk-sh svg{width:15px;height:15px;display:block}" +
    ".mk-share .mk-sh--wa{background:#128C4B;color:#fff}" +
    ".mk-share .mk-sh--x{background:#111;color:#fff;border:1px solid rgba(255,255,255,.18)}" +
    ".mk-share .mk-sh--li{background:#0A66C2;color:#fff}" +
    ".mk-share .mk-sh--copy{background:transparent;color:inherit;border:1px solid rgba(232,232,232,.28)}" +
    ".mk-share .mk-sh:hover{opacity:.88}" +
    ".mk-share--light .mk-sh--x{background:#111;border-color:rgba(0,0,0,.18)}" +
    ".mk-share--light .mk-sh--copy{border-color:color-mix(in srgb,currentColor 30%,transparent)}.mk-share--solo{display:flex;justify-content:flex-end;width:100%;max-width:1120px;margin:10px auto 4px;padding:0 18px;box-sizing:border-box}";

  var T = {
    en: { wa: "WhatsApp", x: "X", li: "LinkedIn", c: "Copy link", d: "Link copied" },
    fr: { wa: "WhatsApp", x: "X", li: "LinkedIn", c: "Copier le lien", d: "Lien copié" }
  };

  var SVG = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path fill="currentColor" d="M12.05 2.003A9.94 9.94 0 0 0 2.1 11.95c0 1.755.46 3.47 1.335 4.983L2 22l5.21-1.366A9.94 9.94 0 0 0 12.05 21.9c5.49 0 9.95-4.46 9.95-9.95 0-2.66-1.036-5.16-2.917-7.04A9.93 9.93 0 0 0 12.05 2.003zm0 18.14a8.18 8.18 0 0 1-4.17-1.14l-.3-.178-3.09.81.825-3.01-.195-.31a8.17 8.17 0 0 1-1.25-4.365c0-4.52 3.68-8.2 8.2-8.2a8.16 8.16 0 0 1 5.81 2.41 8.16 8.16 0 0 1 2.39 5.79c0 4.52-3.68 8.2-8.2 8.2z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.71-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>',
    li: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    cp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
  };

  function lang() {
    var l = (document.documentElement.getAttribute("data-lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return l === "fr" ? "fr" : "en";
  }
  function pageUrl() { return location.origin + location.pathname + location.search; }

  function isLightBg(el) {
    try {
      var n = el, bg = "rgba(0,0,0,0)";
      while (n && n !== document.documentElement) {
        var c = getComputedStyle(n).backgroundColor;
        if (c && c !== "transparent" && c !== "rgba(0, 0, 0, 0)") { bg = c; break; }
        n = n.parentElement;
      }
      var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return false;
      var r = +m[1], g = +m[2], b = +m[3];
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 160;
    } catch (e) { return false; }
  }

  function build() {
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    var row = document.createElement("span");
    row.id = "mk-share";
    row.className = "mk-share";
    row.setAttribute("role", "group");
    row.innerHTML =
      '<a class="mk-sh mk-sh--wa" target="_blank" rel="noopener">' + SVG.wa + "</a>" +
      '<a class="mk-sh mk-sh--x" target="_blank" rel="noopener">' + SVG.x + "</a>" +
      '<a class="mk-sh mk-sh--li" target="_blank" rel="noopener">' + SVG.li + "</a>" +
      '<button type="button" class="mk-sh mk-sh--copy">' + SVG.cp + "</button>";

    var meta = document.querySelector(".mkf-meta");
    var family = document.querySelector(".mkweli-family");
    var foot = document.querySelector("body > footer") || document.querySelector("footer") ||
               document.querySelector(".mkweli-family, .foot, .site-footer");
    if (meta) {
      meta.appendChild(row);
    } else if (family) {
      row.classList.add("mk-share--solo");
      family.appendChild(row);
    } else if (foot) {
      row.classList.add("mk-share--solo");
      foot.appendChild(row);
    } else {
      row.classList.add("mk-share--solo");
      document.body.appendChild(row);
    }

    if (isLightBg(meta || family || foot || document.body)) row.classList.add("mk-share--light");

    var wa = row.querySelector(".mk-sh--wa"), x = row.querySelector(".mk-sh--x"),
        li = row.querySelector(".mk-sh--li"), cp = row.querySelector(".mk-sh--copy"), busy = false;

    function paint() {
      var t = T[lang()], url = pageUrl(), text = document.title || "mkweli.tech";
      row.setAttribute("aria-label", lang() === "fr" ? "Partager" : "Share");
      wa.setAttribute("aria-label", t.wa); wa.title = t.wa;
      x.setAttribute("aria-label", t.x); x.title = t.x;
      li.setAttribute("aria-label", t.li); li.title = t.li;
      if (!busy) { cp.setAttribute("aria-label", t.c); cp.title = t.c; }
      wa.href = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
      x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
      li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
    }
    function done() {
      busy = true;
      var t = T[lang()];
      cp.setAttribute("aria-label", t.d); cp.title = t.d;
      setTimeout(function () { busy = false; paint(); }, 1600);
    }
    cp.addEventListener("click", function () {
      var url = pageUrl();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt(T[lang()].c, url); });
      else window.prompt(T[lang()].c, url);
    });
    paint();
    if (window.MutationObserver) new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "data-lang"] });
    window.addEventListener("hashchange", paint); window.addEventListener("popstate", paint);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
