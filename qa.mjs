// node qa.mjs  (needs puppeteer-core via PUPPETEER_DIR, server on :3417)
import { createRequire } from 'node:module';
const require = createRequire(process.env.PUPPETEER_DIR + '/');
const puppeteer = require('puppeteer-core');
const base = 'http://localhost:3417';
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^\/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const issues = []; const titles = new Map(); const descs = new Map(); const links = new Set();
for (const w of [390, 430, 768, 1024, 1440]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900 });
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) issues.push(`[${w}] console ${m.type()}: ${m.text()}`); });
  page.on('requestfailed', (r) => issues.push(`[${w}] request failed ${r.url()}`));
  page.on('response', (r) => { if (r.status() >= 400) issues.push(`[${w}] ${r.status()} ${r.url()}`); });
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'networkidle0' });
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')].filter((e) => { const b = e.getBoundingClientRect(); return b.right > de.clientWidth + 1 && b.width > 0 && getComputedStyle(e).position !== 'fixed' && !e.closest('.sub') && !e.closest('.primary-nav:not(.is-open)') && !e.closest('.hp'); }).slice(0, 3).map((e) => e.tagName + '.' + e.className);
      return { sw: de.scrollWidth, cw: de.clientWidth, h1: document.querySelectorAll('h1').length, title: document.title, desc: document.querySelector('meta[name=description]')?.content, wide,
        hrefs: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')), small: [...document.querySelectorAll('body *')].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 12.5 && !e.closest('script,style')).length };
    });
    if (r.sw > r.cw) issues.push(`[${w}] OVERFLOW ${p} sw=${r.sw} cw=${r.cw} ${r.wide}`);
    if (r.wide.length) issues.push(`[${w}] wide elements ${p}: ${r.wide}`);
    if (r.h1 !== 1) issues.push(`[${w}] H1 count ${r.h1} on ${p}`);
    if (r.small) issues.push(`[${w}] ${r.small} tiny-text elements on ${p}`);
    if (w === 1440) { (titles.get(r.title) || titles.set(r.title, []).get(r.title)).push(p); (descs.get(r.desc) || descs.set(r.desc, []).get(r.desc)).push(p); r.hrefs.forEach((h) => links.add(h.split('#')[0])); }
  }
  await page.close();
}
for (const [t, ps] of titles) if (ps.length > 1) issues.push(`DUP title ${t}: ${ps}`);
for (const [t, ps] of descs) if (ps.length > 1) issues.push(`DUP desc ${t}: ${ps}`);
for (const l of links) { const s = (await fetch(base + l)).status; if (s !== 200) issues.push(`BROKEN link ${l} ${s}`); }
console.log(`${paths.length} pages x 5 widths; ${links.size} unique internal links`);
console.log(issues.length ? [...new Set(issues)].join('\n') : 'No issues');
const lens = [...titles.keys()].filter((t) => t.length > 62); console.log('Long titles:', lens);
await browser.close();
