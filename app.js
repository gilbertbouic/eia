let data = {};
let lang = 'en';

const t = {
  en: {
    open: 'Open for public inspection',
    dec: 'Recent decisions',
    about: 'How it works',
    aboutText: 'Under the Environment Act 2024, EIA reports and decisions must be opened for public inspection. Notices appear on publicnotice.govmu.org and business.edbmauritius.org. This register collects those notices into one searchable place and links each item back to the original PDF or page.',
    src: 'Sources',
    notPub: 'Not published'
  },
  fr: {
    open: 'Ouvertes à l’inspection publique',
    dec: 'Décisions récentes',
    about: 'Comment ça marche',
    aboutText: 'Sous l’Environment Act 2024, les rapports EIA et les décisions doivent être ouverts à l’inspection publique. Les avis paraissent sur publicnotice.govmu.org et business.edbmauritius.org. Ce registre rassemble ces avis et renvoie chaque élément à la source d’origine.',
    src: 'Sources',
    notPub: 'Non publié'
  }
};

async function load() {
  const res = await fetch('data.json');
  data = await res.json();
  render();
  document.getElementById('updated').textContent = 'Data updated ' + data.updated;
}

function statusClass(s) {
  if (!s) return '';
  const l = s.toLowerCase();
  if (l.includes('approv')) return 'approved';
  if (l.includes('reject')) return 'rejected';
  if (l.includes('open')) return 'open';
  return '';
}

function render() {
  const L = t[lang];
  document.getElementById('t-open').textContent = L.open;
  document.getElementById('t-dec').textContent = L.dec;
  document.getElementById('t-about').textContent = L.about;
  document.getElementById('t-about-text').textContent = L.aboutText;
  document.getElementById('t-src').textContent = L.src;

  document.getElementById('open-list').innerHTML = data.open_inspections.map(i => `
    <div class="item">
      <strong>${i.type}</strong> <span class="status open">Open</span>
      <p>${i.description}</p>
      <p>Proponent: ${i.proponent}<br>Site: ${i.site}</p>
      <p>Submitted: ${i.submitted} · Comments by: ${i.comments_deadline || L.notPub}</p>
      <p class="src"><a href="${i.source_url}" target="_blank">Source notice</a> · Also at <a href="${i.also_at}" target="_blank">EDB portal</a></p>
    </div>
  `).join('') || '<p>None currently listed.</p>';

  document.getElementById('dec-list').innerHTML = data.decisions.map(d => `
    <div class="item">
      <strong>${d.type}</strong> <span class="status ${statusClass(d.decision)}">${d.decision}</span>
      <p>${d.description}</p>
      <p>Proponent: ${d.proponent}<br>Site: ${d.site}</p>
      <p>Date: ${d.date}</p>
      <p class="src"><a href="${d.source_url}" target="_blank">Source notice</a></p>
    </div>
  `).join('');

  document.getElementById('src-list').innerHTML = data.sources.map(s => `<li><a href="${s.url}" target="_blank">${s.title}</a></li>`).join('');
}

document.getElementById('lang-en').onclick = () => { lang = 'en'; document.getElementById('lang-en').classList.add('active'); document.getElementById('lang-fr').classList.remove('active'); render(); };
document.getElementById('lang-fr').onclick = () => { lang = 'fr'; document.getElementById('lang-fr').classList.add('active'); document.getElementById('lang-en').classList.remove('active'); render(); };

load();