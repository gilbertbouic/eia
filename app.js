const data = await fetch("./data.json").then((r) => r.json());

const records = data.records;
const ISLAND = { z: 10, x0: 674, x1: 676, y0: 569, y1: 571 };
const pairings = [
  {
    id: "foundries",
    en: "Two scrap-metal foundries",
    fr: "Deux fonderies de ferraille",
    bodyEn: "Rolex Recyclers at Laventure was approved on 3 February 2026. Sam Brothers at Bois Chéri was refused on 17 October 2025. Both notices say scrap metal foundry.",
    bodyFr: "Rolex Recyclers à Laventure a été approuvée le 3 février 2026. Sam Brothers à Bois Chéri a été refusée le 17 octobre 2025. Les deux avis disent fonderie de ferraille.",
    ids: ["rolex", "sam-brothers"],
  },
  {
    id: "quarantine",
    en: "Two livestock quarantines",
    fr: "Deux quarantaines de bétail",
    bodyEn: "Ubora at La Chaumière was approved on 30 January 2026. La Ferme de Mare Longue was refused on 24 June 2025.",
    bodyFr: "Ubora à La Chaumière a été approuvée le 30 janvier 2026. La Ferme de Mare Longue a été refusée le 24 juin 2025.",
    ids: ["ubora", "mare-longue-farm"],
  },
  {
    id: "solar",
    en: "Three solar files, three endings",
    fr: "Trois dossiers solaires, trois issues",
    bodyEn: "These are not the same project. A 25 MW farm at Amaury was licensed. A 7 MWac farm at Gros Cailloux has no decision in this file. A manufacturing plant at Riche Terre was refused.",
    bodyFr: "Ce ne sont pas le même projet. Une ferme de 25 MW à Amaury a été autorisée. Une ferme de 7 MWac à Gros Cailloux n’a pas de décision dans ce dossier. Une usine à Riche Terre a été refusée.",
    ids: ["fmd", "gamma", "insola"],
  },
];

const copy = {
  en: {
    kicker: "Mauritius · Environment Act 2024",
    title: "The inspection desk",
    lead: "An EIA is public twice: when the report is opened for comment, and when the Minister’s decision is posted. Those moments used to live in separate PDFs. This desk puts them on one table, each one linked back to the notice.",
    search: "Search a project, a company, a village",
    all: "All", eia: "EIA", per: "PER", approved: "Approved", rejected: "Rejected", closed: "Window closed",
    districts: "Districts", any: "Any district",
    notices: "Notices on this desk", licensed: "Licences & exemptions", refused: "Refusals", waiting: "Decision not yet in the file",
    source: "Read the notice", proponent: "Proponent", site: "Site", trail: "Before the decision",
    empty: "Nothing in the file matches that.",
    mapTitle: "Where the notices name a place",
    mapNote: "Pins sit on the locality, not on a surveyed boundary. A notice stays off the map when this desk has no published point for it.",
    unpinned: "This notice is not pinned. The list does not give a point.",
    how: "How a comment actually gets in",
    howBody: "While a report is open, comments go in writing to the EIA Desk, Department of Environment, Ken Lee Tower, corner of Barracks and St Georges Streets, Port Louis — or through the EDB business portal. The envelope is marked “EIA comments” or “PER comments”. The deadline is the one printed on that notice, not a standing date.",
    limit: "What this is not",
    limitBody: "Not the Ministry. Not a title search. Licence conditions are often only at the Resource Centre or on the EDB portal. Anything never published stays labelled as not published.",
    sisters: "Also on Mkweli", updated: "Compiled", window: "Comment window closed", exempt: "Exempt undertaking",
    register: "The register", showing: "Showing", newer: "Newer", older: "Older", island: "Whole island",
    across: "Read across",
    acrossLead: "Notices that describe a similar project, and do not end the same way. The reason is in the PDF.",
    span: "In the file", waitingLead: "Still waiting on a published decision", report: "Annual report",
  },
  fr: {
    kicker: "Maurice · Environment Act 2024",
    title: "Le bureau d’inspection",
    lead: "Une EIA est publique deux fois : à l’ouverture du rapport pour commentaires, puis à la publication de la décision du ministre. Ces moments vivaient dans des PDF séparés. Ce bureau les met sur une seule table, chacun renvoyé à son avis.",
    search: "Chercher un projet, une société, un village",
    all: "Tout", eia: "EIA", per: "PER", approved: "Approuvé", rejected: "Rejeté", closed: "Délai clos",
    districts: "Districts", any: "Tous les districts",
    notices: "Avis sur ce bureau", licensed: "Licences et exemptions", refused: "Refus", waiting: "Décision absente du dossier",
    source: "Lire l’avis", proponent: "Pétitionnaire", site: "Site", trail: "Avant la décision",
    empty: "Rien dans le dossier ne correspond.",
    mapTitle: "Là où l’avis nomme un lieu",
    mapNote: "Les épingles marquent la localité, pas une limite arpentée. Un avis reste hors carte quand ce bureau n’a pas de point publié.",
    unpinned: "Cet avis n’est pas épinglé. La liste ne donne pas de point.",
    how: "Comment un commentaire entre vraiment",
    howBody: "Tant que le rapport est ouvert, les commentaires s’adressent par écrit à l’EIA Desk, Department of Environment, Ken Lee Tower, angle Barracks et St Georges, Port-Louis — ou via le portail EDB. L’enveloppe porte « EIA comments » ou « PER comments ». Le délai est celui imprimé sur l’avis.",
    limit: "Ce que ce n’est pas",
    limitBody: "Ni le ministère, ni une recherche de titre. Les conditions de licence sont souvent seulement au Resource Centre ou sur le portail EDB. Ce qui n’a pas été publié reste marqué non publié.",
    sisters: "Ailleurs sur Mkweli", updated: "Compilé", window: "Délai de commentaires clos", exempt: "Entreprise exemptée",
    register: "Le registre", showing: "Affichés", newer: "Plus récent", older: "Plus ancien", island: "Île entière",
    across: "Lire en regard",
    acrossLead: "Des avis qui décrivent un projet semblable, et qui ne finissent pas de la même façon. La raison est dans le PDF.",
    span: "Dans le dossier", waitingLead: "Toujours sans décision publiée", report: "Rapport annuel",
  },
};

const state = {
  lang: "en",
  q: "",
  filter: "all",
  district: "all",
  selected: location.hash.replace("#", "") || records[0].id,
  frame: "island",
};

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
const lonToX = (lon, z) => ((lon + 180) / 360) * 2 ** z;
const latToY = (lat, z) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z;
};
const viewForPoint = (lon, lat, z = 12) => {
  const x = Math.floor(lonToX(lon, z));
  const y = Math.floor(latToY(lat, z));
  return { z, x0: x - 1, x1: x + 1, y0: y - 1, y1: y + 1 };
};
function viewForPoints(pts) {
  if (!pts.length) return ISLAND;
  if (pts.length === 1) return viewForPoint(pts[0].lon, pts[0].lat);
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  pts.forEach((p) => {
    minLon = Math.min(minLon, p.lon); maxLon = Math.max(maxLon, p.lon);
    minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat);
  });
  const padLon = Math.max(0.04, (maxLon - minLon) * 0.4);
  const padLat = Math.max(0.04, (maxLat - minLat) * 0.4);
  for (let z = 12; z >= 9; z--) {
    const x0 = Math.floor(lonToX(minLon - padLon, z));
    const x1 = Math.floor(lonToX(maxLon + padLon, z));
    const y0 = Math.floor(latToY(maxLat + padLat, z));
    const y1 = Math.floor(latToY(minLat - padLat, z));
    if (x1 - x0 <= 2 && y1 - y0 <= 2) return { z, x0, x1, y0, y1 };
  }
  return ISLAND;
}
const pinPercent = (lon, lat, view) => {
  const cols = view.x1 - view.x0 + 1;
  const rows = view.y1 - view.y0 + 1;
  return {
    left: ((lonToX(lon, view.z) - view.x0) / cols) * 100,
    top: ((latToY(lat, view.z) - view.y0) / rows) * 100,
  };
};
const fmt = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(state.lang === "fr" ? "fr-MU" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
const fmtSpan = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(state.lang === "fr" ? "fr-MU" : "en-GB", { month: "long", year: "numeric" });
const label = (item, t) => item.status === "approved" && item.kind === "Exempt" ? t.exempt : item.status === "approved" ? t.approved : item.status === "rejected" ? t.rejected : t.window;
const tone = (item) => item.status === "rejected" ? "ox" : item.status === "window-closed" ? "gold" : "moss";
const dot = (item) => item.status === "rejected" ? "rejected" : item.status === "window-closed" ? "waiting" : "approved";
const keyOf = (item) => item.lat == null ? "" : `${item.lat.toFixed(3)}|${item.lon.toFixed(3)}`;

function shown() {
  const q = state.q.trim().toLowerCase();
  return records.filter((item) => {
    if ((state.filter === "EIA" || state.filter === "PER") && item.kind !== state.filter) return false;
    if (state.filter !== "all" && state.filter !== "EIA" && state.filter !== "PER" && item.status !== state.filter) return false;
    if (state.district !== "all" && item.district !== state.district) return false;
    if (!q) return true;
    return [item.title, item.proponent, item.site, item.district, item.kind].join(" ").toLowerCase().includes(q);
  }).sort((a, b) => b.date.localeCompare(a.date));
}

function choose(id, scroll) {
  state.selected = id;
  state.frame = "notice";
  history.replaceState(null, "", "#" + id);
  draw();
  if (!scroll) return;
  if (window.innerWidth < 960) document.querySelector(".dossier")?.scrollIntoView({ block: "start" });
}

function draw() {
  const t = copy[state.lang];
  document.documentElement.lang = state.lang === "fr" ? "fr" : "en";
  const list = shown();
  if (list.length && !list.some((r) => r.id === state.selected)) {
    state.selected = list[0].id;
    state.frame = "fit";
  }
  const active = records.find((r) => r.id === state.selected) || null;
  const place = list.findIndex((r) => r.id === state.selected);
  const dates = records.map((r) => r.date).sort();
  const districts = [...new Set(records.map((r) => r.district).filter((d) => d !== "Not published"))].sort();
  const waiting = records.filter((r) => r.status === "window-closed");
  const counts = {
    all: records.length,
    approved: records.filter((r) => r.status === "approved").length,
    rejected: records.filter((r) => r.status === "rejected").length,
    "window-closed": waiting.length,
  };
  let view = ISLAND;
  if (state.frame === "notice" && active?.lat != null) view = viewForPoint(active.lon, active.lat);
  else if (state.frame === "fit") {
    view = viewForPoints(list.filter((r) => r.lat != null).map((r) => ({ lon: r.lon, lat: r.lat })));
  }
  const cols = view.x1 - view.x0 + 1;
  const tiles = [];
  for (let y = view.y0; y <= view.y1; y++) {
    for (let x = view.x0; x <= view.x1; x++) tiles.push(`<img alt="" draggable="false" src="https://basemaps.cartocdn.com/light_all/${view.z}/${x}/${y}@2x.png">`);
  }
  const groups = new Map();
  list.forEach((item) => {
    const k = keyOf(item);
    if (!k) return;
    groups.set(k, [...(groups.get(k) || []), item]);
  });
  const pins = [...groups.values()].map((group) => {
    const item = group.find((g) => g.id === state.selected) || group[0];
    const pos = pinPercent(item.lon, item.lat, view);
    if (pos.left < -8 || pos.left > 108 || pos.top < -8 || pos.top > 108) return "";
    const on = item.id === state.selected;
    return `<button class="pinbtn" data-choose="${esc(on && group.length > 1 ? group[(group.findIndex((g) => g.id === state.selected) + 1) % group.length].id : item.id)}" style="left:${pos.left.toFixed(2)}%;top:${pos.top.toFixed(2)}%" aria-label="${esc(group.map((g) => g.site).join(", "))}"><span class="dot ${dot(item)} ${on ? "on" : ""}"></span>${group.length > 1 ? `<span class="n">${group.length}</span>` : ""}${on ? `<span class="tag">${esc(item.site)}</span>` : ""}</button>`;
  }).join("");

  const stat = (key, text) => `<button data-stat="${key}" class="${state.filter === key && state.district === "all" ? "on" : ""}"><strong>${counts[key]}</strong><span>${text}</span></button>`;
  const filters = ["all", "EIA", "PER", "approved", "rejected", "window-closed"].map((key) => {
    const name = key === "all" ? t.all : key === "approved" ? t.approved : key === "rejected" ? t.rejected : key === "window-closed" ? t.closed : key;
    return `<button data-filter="${key}" class="${state.filter === key ? "on" : ""}">${name}</button>`;
  }).join("");

  const app = document.getElementById("app");
  const focus = document.activeElement?.id === "q";
  app.innerHTML = `<div class="wrap">
    <header class="mast">
      <div><p class="kicker">Mkweli</p><p class="brand">EIA Watch</p></div>
      <div style="display:flex;align-items:center;gap:.8rem">
        <p class="muted" style="display:none" id="kicker-wide">${esc(t.kicker)}</p>
        <div class="langs"><button data-lang="en" class="${state.lang === "en" ? "on" : ""}">EN</button><button data-lang="fr" class="${state.lang === "fr" ? "on" : ""}">FR</button></div>
      </div>
    </header>
    <section class="hero">
      <div>
        <h1>${esc(t.title)}</h1>
        <p class="lead">${esc(t.lead)}</p>
        <p class="muted">${esc(t.span)}: ${esc(fmtSpan(dates[0]))} – ${esc(fmtSpan(dates.at(-1)))}</p>
      </div>
      <div class="stats">
        ${stat("all", t.notices)}${stat("approved", t.licensed)}${stat("rejected", t.refused)}${stat("window-closed", t.waiting)}
      </div>
    </section>
    <p class="note muted">${esc(data.context[state.lang])} <a class="rust" href="${esc(data.context.source)}">${esc(t.report)}</a></p>
    ${waiting.length ? `<p>${esc(t.waitingLead)}. ${waiting.map((w) => `<button data-choose="${esc(w.id)}" style="min-height:2.75rem;text-decoration:underline">${esc(w.proponent)}, ${esc(w.site)}</button>`).join(" · ")}</p>` : ""}
    <div style="margin-top:1.5rem">
      <input id="q" type="search" value="${esc(state.q)}" placeholder="${esc(t.search)}" aria-label="${esc(t.search)}">
      <div class="filters">${filters}</div>
      <div class="chips"><span class="muted" style="font-size:.75rem;letter-spacing:.06em;text-transform:uppercase">${esc(t.districts)}</span>
        <button data-district="all" class="${state.district === "all" ? "on" : ""}">${esc(t.any)}</button>
        ${districts.map((name) => `<button data-district="${esc(name)}" class="${state.district === name ? "on" : ""}">${esc(name)} <span class="muted">${records.filter((r) => r.district === name).length}</span></button>`).join("")}
      </div>
    </div>
    <div class="film">${list.map((item) => `<button data-choose="${esc(item.id)}" class="${item.id === state.selected ? "on" : ""}"><small>${esc(fmt(item.date))}</small><span>${esc(item.site)}</span></button>`).join("")}</div>
    <div class="layout">
      <div class="reg">
        <div style="display:flex;justify-content:space-between"><h2 style="font-family:var(--display);font-weight:500;margin:0">${esc(t.register)}</h2><p class="muted">${esc(t.showing)} ${list.length}/${records.length}</p></div>
        <div class="register">${list.length ? list.map((item) => `<button class="row ${item.id === state.selected ? "on" : ""}" id="notice-${esc(item.id)}" data-choose="${esc(item.id)}"><small class="muted">${esc(fmt(item.date))} · ${esc(item.kind)}</small><span class="${tone(item)}" style="float:right;font-size:.75rem;letter-spacing:.04em;text-transform:uppercase">${esc(label(item, t))}</span><strong>${esc(item.site)}</strong><span>${esc(item.proponent)} <span class="muted">· ${esc(item.title)}</span></span></button>`).join("") : `<p class="muted" style="padding:1.5rem 0">${esc(t.empty)}</p>`}</div>
      </div>
      <aside class="side">
        <article class="dossier">${active && list.some((s) => s.id === active.id) ? `
          <p class="stamp ${tone(active)}">${esc(label(active, t))}</p>
          <p class="muted" style="font-size:.75rem;letter-spacing:.08em;text-transform:uppercase">${esc(fmt(active.date))} · ${esc(active.kind)}${place >= 0 ? ` · ${place + 1}/${list.length}` : ""}</p>
          <h2>${esc(active.title)}</h2>
          <dl class="meta"><div><dt>${esc(t.proponent)}</dt><dd>${esc(active.proponent)}</dd></div><div><dt>${esc(t.site)}</dt><dd>${esc(active.site)}${active.district !== "Not published" ? ", " + esc(active.district) : ""}</dd></div></dl>
          ${active.note ? `<p class="muted">${esc(active.note)}</p>` : ""}
          ${active.history?.length ? `<div class="trail"><p class="muted" style="font-size:.75rem;text-transform:uppercase">${esc(t.trail)}</p>${active.history.map((step) => `<p><a class="rust" href="${esc(step.url)}">${esc(step.label)}</a> <span class="muted">· ${esc(fmt(step.date))}</span></p>`).join("")}</div>` : ""}
          <div><a class="src" href="${esc(active.sourceUrl)}">${esc(t.source)}</a> <span class="muted" style="font-size:.75rem">${esc(active.sourceLabel)}</span></div>
          <div class="pager"><button data-older="1" ${place <= 0 ? "disabled" : ""}>${esc(t.newer)}</button><button data-newer="1" ${place < 0 || place >= list.length - 1 ? "disabled" : ""}>${esc(t.older)}</button></div>
        ` : `<p class="muted">${esc(t.empty)}</p>`}</article>
        <div class="mapbox" style="margin-top:.75rem">
          <div class="maphead"><h2>${esc(t.mapTitle)}</h2><button data-island="1" class="rust" style="min-height:2.75rem;text-decoration:underline">${esc(t.island)}</button></div>
          <div class="stage"><div class="grid" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${tiles.join("")}</div>${pins}</div>
          <div class="legend"><span><i class="swatch" style="background:var(--rust)"></i>${esc(t.approved)}</span><span><i class="swatch" style="background:var(--oxblood)"></i>${esc(t.rejected)}</span><span><i class="swatch" style="background:var(--gold)"></i>${esc(t.closed)}</span></div>
          <p class="fine">${active && active.lat == null ? esc(t.unpinned) + " " : ""}${esc(t.mapNote)} © OpenStreetMap © CARTO</p>
        </div>
      </aside>
    </div>
    <section class="across">
      <h2>${esc(t.across)}</h2>
      <p class="muted">${esc(t.acrossLead)}</p>
      ${pairings.map((pair) => `<div class="pair"><h3>${esc(state.lang === "fr" ? pair.fr : pair.en)}</h3><p>${esc(state.lang === "fr" ? pair.bodyFr : pair.bodyEn)}</p><div>${pair.ids.map((id) => {
        const item = records.find((r) => r.id === id);
        return item ? `<button data-open="${esc(id)}"><span class="${tone(item)}">${esc(label(item, t))}</span> · ${esc(item.site)}</button>` : "";
      }).join("")}</div></div>`).join("")}
    </section>
    <section class="split">
      <div><h2>${esc(t.how)}</h2><p>${esc(t.howBody)}</p></div>
      <div><h2>${esc(t.limit)}</h2><p>${esc(t.limitBody)}</p></div>
    </section>
    <footer class="footer"><p>${esc(t.sisters)}: <a href="https://land.mkweli.tech">Land</a> · <a href="https://tenders.mkweli.tech">Tenders</a> · <a href="https://pfw.mkweli.tech">Funds</a> · <a href="https://mkweli.tech">mkweli.tech</a></p><p>${esc(t.updated)} 28 Oct 2026 · support@mkweli.tech</p></footer>
  </div>`;
  const q = document.getElementById("q");
  if (focus && q) { q.focus(); q.setSelectionRange(state.q.length, state.q.length); }
}

document.getElementById("app").addEventListener("click", (e) => {
  const el = e.target.closest("button");
  if (!el) return;
  if (el.dataset.lang) { state.lang = el.dataset.lang; draw(); return; }
  if (el.dataset.stat) { state.q = ""; state.district = "all"; state.filter = el.dataset.stat; state.frame = "fit"; draw(); return; }
  if (el.dataset.filter) { state.filter = el.dataset.filter; state.frame = "fit"; draw(); return; }
  if (el.dataset.district) { state.district = el.dataset.district; state.frame = el.dataset.district === "all" ? "island" : "fit"; draw(); return; }
  if (el.dataset.choose) { choose(el.dataset.choose, true); return; }
  if (el.dataset.island) { state.frame = "island"; draw(); return; }
  if (el.dataset.open) { state.q = ""; state.filter = "all"; state.district = "all"; choose(el.dataset.open, true); return; }
  const list = shown();
  const place = list.findIndex((r) => r.id === state.selected);
  if (el.dataset.older && place > 0) choose(list[place - 1].id, true);
  if (el.dataset.newer && place >= 0 && place < list.length - 1) choose(list[place + 1].id, true);
});
document.getElementById("app").addEventListener("input", (e) => {
  if (e.target.id !== "q") return;
  state.q = e.target.value;
  draw();
});
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
  const list = shown();
  const i = list.findIndex((r) => r.id === state.selected);
  const next = e.key === "ArrowDown" ? list[i + 1] : list[i - 1];
  if (!next) return;
  e.preventDefault();
  choose(next.id, true);
});
if (!records.some((r) => r.id === state.selected)) state.selected = records[0].id;
else if (location.hash.replace("#", "") === state.selected) state.frame = "notice";
draw();
