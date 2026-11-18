/* Tiny visit counter for the footer.
   Service: Abacus (https://abacus.jasoncameron.dev), free, no account, no cookies.
   The counter key comes from data-counter on #visit-counter (for example "mkweli-tech/aml").
   Counts one visit per browser tab session. Waits up to 10 seconds and, if that request
   gets no response, retries once with a read-only get. A successful count is saved in
   localStorage; if the service still does not answer, the last cached number is shown.
   Stays hidden only if there is no cached count.
   Privacy notice: https://mkweli.tech/privacy.html */
(function () {
  "use strict";
  var el = document.getElementById("visit-counter");
  /* Never count inside an app that loads the page from a local file. */
  if (!el || !window.fetch || location.protocol === "file:") return;
  var key = el.getAttribute("data-counter");
  if (!key || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(key)) return;
  var BASE = "https://abacus.jasoncameron.dev";
  var SEEN = "mkweliVisitCounted:" + key;
  var CACHE = "mkweliVisitCount:" + key;
  var TIMEOUT = 10000;

  function readCache() {
    try {
      var n = Number(localStorage.getItem(CACHE));
      if (n && isFinite(n) && n >= 1) return n;
    } catch (e) {}
    return 0;
  }

  function writeCache(n) {
    try { localStorage.setItem(CACHE, String(n)); } catch (e) {}
  }

  function rememberSeen() {
    try { sessionStorage.setItem(SEEN, "1"); } catch (e) {}
  }

  function parseCount(data) {
    var n = data && Number(data.value);
    if (!n || !isFinite(n) || n < 1) return 0;
    return n;
  }

  function showCachedOrHide() {
    var n = readCache();
    if (n) show(n);
  }

  /* done(count, gotResponse). gotResponse is true if the server answered (even with an error). */
  function fetchCount(path, done) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); else finish(0); }, TIMEOUT);
    var gotResponse = false;
    var finished = false;
    function finish(n) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      done(n, gotResponse);
    }
    fetch(BASE + path + key, {
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (r) {
        gotResponse = true;
        return r.ok ? r.json() : null;
      })
      .then(function (data) { finish(parseCount(data)); })
      .catch(function () { finish(0); });
  }

  function applyCount(n) {
    rememberSeen();
    writeCache(n);
    show(n);
  }

  function run() {
    var seen = false;
    try { seen = sessionStorage.getItem(SEEN) === "1"; } catch (e) {}
    fetchCount(seen ? "/get/" : "/hit/", function (n, gotResponse) {
      if (n) {
        applyCount(n);
        return;
      }
      /* Retry only when the first request failed before a response, and only with GET. */
      if (!gotResponse) {
        fetchCount("/get/", function (retryN) {
          if (retryN) applyCount(retryN);
          else showCachedOrHide();
        });
        return;
      }
      showCachedOrHide();
    });
  }
  /* Pages that switch language without reloading can give labels as data-label-en, data-label-fr, ... */
  function show(n) {
    function paint() {
      var l = (document.documentElement.lang || "en").slice(0, 2);
      var label = el.getAttribute("data-label-" + l) || el.getAttribute("data-label-en");
      var lab = el.querySelector(".visit-label");
      if (label && lab) lab.textContent = label;
      var num = el.querySelector(".visit-count");
      var loc = l === "fr" ? "fr-FR" : l === "pt" ? "pt-PT" : "en-GB";
      if (num) num.textContent = n.toLocaleString(loc);
    }
    paint();
    el.hidden = false;
    if (window.MutationObserver && el.hasAttribute("data-label-en")) {
      new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    }
  }
  function schedule() {
    if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 3000 });
    else setTimeout(run, 1);
  }
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule);
})();

/* Mkweli family footer labels: pages that switch language without reloading mark labels with data-fr. */
(function () {
  "use strict";
  var nodes = document.querySelectorAll(".mkf [data-fr]");
  if (!nodes.length) return;
  function paint() {
    var fr = (document.documentElement.lang || "en").slice(0, 2) === "fr";
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!n.hasAttribute("data-en")) n.setAttribute("data-en", n.textContent);
      n.textContent = fr ? n.getAttribute("data-fr") : n.getAttribute("data-en");
      if (n.hasAttribute("data-fr-href")) {
        if (!n.hasAttribute("data-en-href")) n.setAttribute("data-en-href", n.getAttribute("href"));
        n.setAttribute("href", fr ? n.getAttribute("data-fr-href") : n.getAttribute("data-en-href"));
      }
    }
    var nav = document.querySelector(".mkf .mkweli-family-nav");
    if (nav) nav.setAttribute("aria-label", fr ? "Outils Mkweli" : "Mkweli tools");
  }
  paint();
  if (window.MutationObserver) new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
