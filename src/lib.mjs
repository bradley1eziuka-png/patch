import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, services, locations, nav, mediaOverrides, stills, slotStill, locationHeroes } from './data.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const OUT = path.join(ROOT, 'site');

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const svc = (slug) => services.find((s) => s.slug === slug);
export const loc = (slug) => locations.find((l) => l.slug === slug);
export const svcUrl = (slug) => `/services/${slug}/`;
export const locUrl = (slug) => `/service-areas/${slug}/`;

// ---------------------------------------------------------------------------
// ICONS: simple 24px line icons, drawn for this site
// ---------------------------------------------------------------------------
const ICONS = {
  patch: '<rect x="3" y="3" width="18" height="18" rx="1"/><rect x="8.5" y="8.5" width="7" height="7"/><path d="M3 9h2.5M18.5 15H21"/>',
  layers: '<path d="m12 3-9 5 9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  trowel: '<path d="M3.5 20.5 10 14"/><path d="m9 9 6-6 6 6-6 6Z"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21Z"/><path d="m7 13 2 2m1-5 2 2m1-5 2 2"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  house: '<path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
  insulation: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 8c2 2 3-2 5 0s3-2 5 0M7 13c2 2 3-2 5 0s3-2 5 0M7 18c2 2 3-2 5 0s3-2 5 0"/>',
  window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 2 4.5 5"/>',
  badge: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="1.5"/><path d="M9 4h6v3H9zM8.5 12h7M8.5 16h5"/>',
  chat: '<path d="M4 5h16v11H9l-5 4Z"/><path d="M8 9h8M8 12h5"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  play: '<path d="M7 4.5v15l12-7.5Z"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
};

export function icon(name, cls = '') {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

// ---------------------------------------------------------------------------
// MEDIA: one function for every photo slot on the site.
//   - If a file named after the slot exists in site/assets/img/media/, it is used.
//   - Otherwise a quiet placeholder is rendered. The spec lives in an HTML comment.
// ---------------------------------------------------------------------------
const MEDIA_DIR = path.join(OUT, 'assets', 'img', 'media');
const EXTS = ['webp', 'jpg', 'jpeg', 'png'];
const WIDTHS = [480, 800, 1200, 1600];
const LOCIMG = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'loc-images.json'), 'utf8'));
const SIZES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'media-sizes.json'), 'utf8'));
export const mediaReport = { placeholders: [], real: [] };

function findFile(slot) {
  for (const e of EXTS) if (fs.existsSync(path.join(MEDIA_DIR, `${slot}.${e}`))) return `/assets/img/media/${slot}.${e}`;
  return null;
}
function findVariants(slot) {
  const out = [];
  for (const w of WIDTHS) for (const e of EXTS) if (fs.existsSync(path.join(MEDIA_DIR, `${slot}-${w}.${e}`))) { out.push(`/assets/img/media/${slot}-${w}.${e} ${w}w`); break; }
  return out;
}

/**
 * @param {string} slot   unique slot name, also the filename to drop in media/
 * @param {object} o      ratio ('4/3'), alt, note (dev spec), label (visible placeholder caption),
 *                        sizes, eager, cls, bg (true for full-bleed backgrounds, e.g. hero)
 */
export function media(slot, o = {}) {
  const ratio = o.ratio || '4/3';
  const ov = mediaOverrides[slot] || {};
  const m = slotStill[slot];
  const e = typeof m === 'string' ? { still: m } : m || {};
  const info = (e.still && stills[e.still]) || {};
  const base = e.still || slot;
  const src = ov.src || findFile(base);
  const alt = ov.alt || e.alt || info.alt || o.alt || '';
  const focus = e.focus || info.focus;
  const caption = e.caption || o.caption;
  const cls = ['media', o.bg ? 'media--bg' : '', o.cls || ''].filter(Boolean).join(' ');
  const style = o.bg ? '' : ` style="--ratio:${ratio}"`;
  if (src) {
    mediaReport.real.push(slot);
    const variants = findVariants(base);
    const srcset = variants.length ? ` srcset="${[...variants, `${src} ${SIZES[base] || 1080}w`].join(', ')}" sizes="${o.sizes || '(min-width: 1140px) 560px, 100vw'}"` : '';
    const pos = focus ? ` style="object-position:${focus}"` : '';
    const cap = caption ? `<figcaption class="media__cap">${esc(caption)}</figcaption>` : '';
    return `<figure class="${cls}"${style}><img src="${src}"${srcset} alt="${esc(alt)}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}${pos}>${cap}</figure>`;
  }
  if (o.optional) return '';
  mediaReport.placeholders.push(slot);
  const label = o.label === undefined ? 'Project photo' : o.label;
  return `<!-- MEDIA SLOT: ${slot}
       Intended content: ${o.note || 'Real Patch Master project photo'}
       Aspect ratio: ${ratio.replace('/', ':')}
       To fill: add a still to src/data.mjs (stills + slotStill) or save site/assets/img/media/${slot}.webp, then run \`node build.mjs\`. -->
  <figure class="${cls} media--ph"${style}>${o.bg ? '' : `<span class="media__ph" aria-hidden="true">${icon('camera')}${label ? `<span>${esc(label)}</span>` : ''}</span>`}</figure>`;
}

// ---------------------------------------------------------------------------
// HEAD / HEADER / FOOTER
// ---------------------------------------------------------------------------
export const abs = (p) => (site.siteUrl ? site.siteUrl + p : p);

export function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

export function businessSchema() {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': abs('/#business'),
    name: site.name,
    description: site.tagline + ' serving Dearborn Heights and Metro Detroit.',
    telephone: '+1-734-489-2284',
    email: site.email,
    image: abs('/assets/img/patch-master-logo.png'),
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: 'US' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00' }],
    areaServed: ['Dearborn Heights', 'Dearborn', 'Monroe', 'Carleton', 'Downriver', 'Metro Detroit'].map((n) => ({ '@type': 'Place', name: n + ', MI' })),
    sameAs: [site.social.facebook, site.social.instagram],
  };
  if (site.siteUrl) o.url = site.siteUrl + '/';
  return jsonLd(o);
}

export function breadcrumbSchema(crumbs) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, ...(site.siteUrl || c.href ? { item: abs(c.href) } : {}) })),
  });
}

export function faqSchema(faq) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  });
}

export function head({ title, desc, path: p, schema = [], noindex = false, extraHead = '' }) {
  const url = abs(p);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs('/assets/img/patch-master-logo.png')}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#1B2336">
<link rel="icon" type="image/png" href="/assets/img/favicon.png">
<link rel="preload" href="/assets/fonts/poppins-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css">
${extraHead}
${schema.join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
`;
}

export function header(current) {
  const isCur = (href) => (href === '/' ? current === '/' : current.startsWith(href));
  const items = nav
    .map((n) => {
      const cur = isCur(n.href) ? ' aria-current="page"' : '';
      if (!n.sub) return `<li><a href="${n.href}"${cur}>${n.label}</a></li>`;
      const list = n.sub === 'services' ? services.map((s) => [svcUrl(s.slug), s.name]) : locations.map((l) => [locUrl(l.slug), l.name]);
      return `<li class="has-sub">
        <a href="${n.href}"${cur}>${n.label}</a>
        <button type="button" class="sub-toggle" aria-expanded="false" aria-label="${n.label} menu">${icon('chevron')}</button>
        <ul class="sub">${list.map(([h, t]) => `<li><a href="${h}"${current === h ? ' aria-current="page"' : ''}>${esc(t)}</a></li>`).join('')}</ul>
      </li>`;
    })
    .join('\n');
  return `<header class="site-header">
  <div class="hdr">
    <a class="brand" href="/" aria-label="The Original Patch Master home"><img src="/assets/img/patch-master-logo.png" alt="The Original Patch Master" width="661" height="362"></a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav"><span class="nav-toggle__open">${icon('menu')}</span><span class="nav-toggle__close">${icon('close')}</span><span class="sr">Menu</span></button>
    <nav id="primary-nav" class="primary-nav" aria-label="Primary">
      <ul>${items}</ul>
      <div class="hdr-actions">
        <a class="hdr-phone" href="${site.phoneHref}">${icon('phone')}<span>${site.phone}</span></a>
        <a class="btn" href="/contact/">Free Estimate</a>
      </div>
    </nav>
  </div>
</header>`;
}

export function footer() {
  const a = site.address;
  return `<div class="infostrip">
  <div class="wrap infostrip__grid">
    <p>${icon('pin')}<span><strong>Business Address</strong>${a.street}, ${a.city}, ${a.region}</span></p>
    <p>${icon('phone')}<span><strong>Call</strong><a href="${site.phoneHref}">${site.phone}</a></span></p>
    <p>${icon('mail')}<span><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></span></p>
    <p>${icon('clock')}<span><strong>Hours</strong>${site.hours.days}, 7 AM to 5 PM</span></p>
  </div>
</div>
<footer class="site-footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <a class="footer__logo" href="/" aria-label="The Original Patch Master home"><img src="/assets/img/patch-master-logo.png" alt="The Original Patch Master" width="661" height="362" loading="lazy"></a>
      <p>Family-owned drywall, plaster and finishing contractor in Dearborn Heights. Fully insured. Free estimates.</p>
      <ul class="social">
        <li><a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="The Original Patch Master on Facebook">${icon('facebook')}</a></li>
        <li><a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="The Original Patch Master on Instagram">${icon('instagram')}</a></li>
      </ul>
    </div>
    <nav aria-label="Footer">
      <h2>Navigate</h2>
      <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
    </nav>
    <nav aria-label="Services">
      <h2>Services</h2>
      <ul>${services.map((s) => `<li><a href="${svcUrl(s.slug)}">${esc(s.name)}</a></li>`).join('')}</ul>
    </nav>
    <nav aria-label="Service areas">
      <h2>Service Areas</h2>
      <ul>${locations.map((l) => `<li><a href="${locUrl(l.slug)}">${esc(l.name)}</a></li>`).join('')}</ul>
    </nav>
  </div>
  <div class="footer__legal"><div class="wrap"><p>&copy; ${new Date().getFullYear()} The Original Patch Master. Fully insured. Serving Dearborn Heights and Metro Detroit.</p></div></div>
</footer>
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// SHARED FRAGMENTS
// ---------------------------------------------------------------------------
export function breadcrumb(crumbs) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
    .map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.href}">${esc(c.name)}</a></li>`))
    .join('')}</ol></nav>`;
}

// Full-bleed photo for a service-area page hero (decorative: the page's H1 and copy name the place).
export function locationPhoto(slug) {
  const m = LOCIMG[slug], f = locationHeroes[slug];
  if (!m || !f) return null;
  const set = m.widths.map((w) => `/assets/img/loc/loc-${slug}-${w}.webp ${w}w`).join(', ');
  const src = `/assets/img/loc/loc-${slug}-${m.w}.webp`;
  return {
    preload: `<link rel="preload" as="image" href="${src}" imagesrcset="${set}" imagesizes="100vw" fetchpriority="high">`,
    html: `<img class="page-hero__img" src="${src}" srcset="${set}" sizes="100vw" width="${m.w}" height="${m.h}" alt="" fetchpriority="high" decoding="async" style="--pos:${f.pos};--pos-m:${f.posM}">`,
  };
}

export function pageHero({ crumbs, h1, lead, ctas = true, photo = null }) {
  return `<section class="page-hero${photo ? ' page-hero--photo' : ''}">
  <div class="page-hero__bg" aria-hidden="true">${photo ? photo.html : ''}</div>
  <div class="wrap page-hero__inner">
    ${breadcrumb(crumbs)}
    <h1>${esc(h1)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
    ${ctas ? `<div class="btn-row"><a class="btn" href="/contact/">Get a Free Estimate</a><a class="btn btn--ghost" href="${site.phoneHref}">Call ${site.phone}</a></div>` : ''}
  </div>
</section>`;
}

export function ctaBand({ h = 'Need Drywall Work Done?', p = "Tell us what you're working on and we'll take a look." } = {}) {
  return `<section class="cta-band">
  <div class="wrap cta-band__inner">
    <div>
      <h2>${esc(h)}</h2>
      <p>${esc(p)}</p>
    </div>
    <div class="btn-row">
      <a class="btn" href="/contact/">Get a Free Estimate</a>
      <a class="btn btn--ghost" href="${site.phoneHref}">Call ${site.phone}</a>
    </div>
  </div>
</section>`;
}

export function serviceCard(s, tile = s.tile) {
  return `<article class="card-link">
    <span class="card-link__icon">${icon(s.icon)}</span>
    <h3><a href="${svcUrl(s.slug)}">${esc(s.name)}</a></h3>
    <p>${esc(tile)}</p>
    <a class="more" href="${svcUrl(s.slug)}" aria-label="${esc(s.name)} details">Details ${icon('arrow')}</a>
  </article>`;
}

export function faqBlock(faq, title = 'Common Questions') {
  if (!faq || !faq.length) return '';
  return `<section class="section section--alt" aria-labelledby="faq-h">
  <div class="wrap wrap--narrow">
    <h2 id="faq-h" class="center">${esc(title)}</h2>
    <div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
  </div>
</section>`;
}

export function write(relPath, html) {
  const file = path.join(OUT, relPath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
