// Static site generator for Patch Master.
//   node build.mjs        writes every page into ./site
//   cd site && python3 -m http.server 3001
import fs from 'node:fs';
import path from 'node:path';
import { site, services, locations, integrations } from './src/data.mjs';
import { OUT, write, mediaReport } from './src/lib.mjs';
import * as P from './src/pages.mjs';

const urls = [];
const add = (p, html, inSitemap = true) => {
  write(p === '/' ? '' : p, html);
  if (inSitemap) urls.push(p);
};

add('/', P.home());
add('/services/', P.servicesIndex());
add('/about/', P.about());
add('/our-work/', P.ourWork());
add('/service-areas/', P.areasIndex());
add('/careers/', P.careers());
add('/contact/', P.contact());
add('/privacy-policy/', P.privacyPolicy());
add('/terms-and-conditions/', P.terms());
// SMS opt-in: noindex and out of the sitemap until its GHL endpoint is configured.
add('/sms-opt-in/', P.smsOptIn(), !!integrations.smsOptInEndpoint);
// Utility pages: noindex and kept out of the sitemap until configured (book-estimate joins once the calendar embed exists).
add('/book-estimate/', P.bookEstimate(), !!integrations.ghlCalendarEmbedUrl);
add('/feedback/', P.feedback(), false);   // utility page: noindex, not in the sitemap
services.forEach((s) => add(`/services/${s.slug}/`, P.servicePage(s)));
locations.forEach((l) => add(`/service-areas/${l.slug}/`, P.locationPage(l)));
fs.writeFileSync(path.join(OUT, '404.html'), P.notFound());

const base = site.siteUrl || 'https://SET-siteUrl-IN-src-data.mjs';
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

console.log(`Built ${urls.length} pages + 404, sitemap.xml, robots.txt`);
console.log(`Media slots: ${mediaReport.placeholders.length} placeholders, ${mediaReport.real.length} real images`);
if (!site.siteUrl) console.log('WARNING: site.siteUrl is empty. Set it in src/data.mjs before launch (canonicals, sitemap, robots).');
if (!site.formEndpoint) console.log('WARNING: site.formEndpoint is empty. The contact form will not submit until it is set.');
if (!site.careersEndpoint) console.log('WARNING: site.careersEndpoint is empty. The careers application form will not submit until it is set.');

if (!integrations.ghlCalendarEmbedUrl) console.log('NOTE: integrations.ghlCalendarEmbedUrl is empty. /book-estimate/ shows a phone fallback and stays noindex.');
if (!integrations.googleReviewUrl) console.log('NOTE: integrations.googleReviewUrl is empty. The homepage review section is hidden and /feedback/ has no Google button yet.');
if (!integrations.ghlLeadProxy) console.log('NOTE: integrations.ghlLeadProxy is empty. Leads go to Formspree only.');
if (!integrations.smsOptInEndpoint) console.log('NOTE: integrations.smsOptInEndpoint is empty. /sms-opt-in/ is shown with its form disabled and stays noindex.');
