/* Mkweli share buttons (same set as audit.mkweli.tech): WhatsApp, X, LinkedIn, Copy link.
   Inserts a "Share this page" block just above the page footer and shares the current page URL.
   Labels follow <html lang> (en / fr) and update when the page switches language. */
(function () {
  "use strict";
  if (document.getElementById("mk-share")) return;
  var CSS = ".mk-share{max-width:1120px;margin:28px auto 0;padding:0 18px;box-sizing:border-box}" +
    ".mk-share h2{font-family:inherit;font-weight:800;font-size:1.2rem;line-height:1.2;margin:0 0 12px;color:inherit}" +
    ".mk-share-row{display:flex;flex-wrap:wrap;gap:8px}" +
    ".mk-sh{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:10px 14px;border-radius:12px;font:700 .86rem/1 system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;text-decoration:none!important;color:#fff!important;border:0;cursor:pointer;box-sizing:border-box}" +
    ".mk-sh:hover{opacity:.88}.mk-sh--wa{background:#128C4B}.mk-sh--x{background:#111}.mk-sh--li{background:#0A66C2}" +
    ".mk-sh--copy{background:#fff;color:#0B2545!important;border:1.5px solid #E4D9C4}";
  var T = { en: { h: "Share this page", c: "Copy link", d: "Link copied" },
            fr: { h: "Partager cette page", c: "Copier le lien", d: "Lien copié" } };
  function lang() {
    var l = (document.documentElement.getAttribute("data-lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return l === "fr" ? "fr" : "en";
  }
  function pageUrl() { return location.origin + location.pathname + location.search; }
  function build() {
    var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    var sec = document.createElement("section");
    sec.id = "mk-share"; sec.className = "mk-share";
    sec.innerHTML = '<h2></h2><div class="mk-share-row">' +
      '<a class="mk-sh mk-sh--wa" target="_blank" rel="noopener">WhatsApp</a>' +
      '<a class="mk-sh mk-sh--x" target="_blank" rel="noopener">X</a>' +
      '<a class="mk-sh mk-sh--li" target="_blank" rel="noopener">LinkedIn</a>' +
      '<button type="button" class="mk-sh mk-sh--copy"></button></div>';
    var foot = document.querySelector("body > footer") || document.querySelector("footer") ||
               document.querySelector(".mkweli-family, .foot, .site-footer");
    if (foot && foot.parentNode) foot.parentNode.insertBefore(sec, foot);
    else document.body.appendChild(sec);
    var h = sec.querySelector("h2"), wa = sec.querySelector(".mk-sh--wa"), x = sec.querySelector(".mk-sh--x"),
        li = sec.querySelector(".mk-sh--li"), cp = sec.querySelector(".mk-sh--copy"), busy = false;
    function paint() {
      var t = T[lang()], url = pageUrl(), text = document.title || "mkweli.tech";
      h.textContent = t.h; sec.setAttribute("aria-label", t.h);
      if (!busy) cp.textContent = t.c;
      wa.href = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
      x.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
      li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
    }
    function done() { busy = true; cp.textContent = T[lang()].d; setTimeout(function () { busy = false; paint(); }, 1600); }
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
