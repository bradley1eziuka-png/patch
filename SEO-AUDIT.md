# SEO audit: The Original Patch Master

Audit date: October 23, 2026. Live site: https://www.originalpatchmaster.com/
Method: crawled the live site, compared it with the local build (live HTML is byte-identical to git `HEAD`, so before/after comparisons are valid), ran Lighthouse (lab data), checked every page's metadata, links and JSON-LD with scripts, and looked at live search results. Findings marked **Verified** were observed directly. Anything else is labeled an assumption or a recommendation.

## 1. Prioritized findings

### Critical
None. Nothing blocked indexing: no accidental noindex on real pages, no robots blocks, no redirect loops, no broken internal links, no soft 404s (a missing URL returns a true 404).

### High
| # | Finding | Status |
|---|---|---|
| H1 | **Host mismatch (Verified).** The apex domain 308-redirects to `www`, but canonicals, Open Graph URLs, schema, sitemap and robots.txt all used the apex. Every canonical pointed at a URL that redirects. | **Fixed in code**: everything now uses `https://www.originalpatchmaster.com`. Takes effect when deployed. |
| H2 | **Location pages are thin (Verified).** About 240 words each, built from the same structure. Doorway-page risk if left unchanged. | **Improved, not solved.** Each page now has a distinct commercial/residential section and a local FAQ. Real depth needs real project content (see section 7). |
| H3 | **No Search Console, no Google Business Profile verification (assumption: not set up).** Nothing is measured and the strongest local ranking signal is absent. | Needs owner action (section 6). |
| H4 | Competitive set: page-one results for these searches are mostly directories (Thumbtack, HomeAdvisor, Angi, Porch, Downtobid). Few independent contractor sites appear. | Opportunity, see section 4. |

### Medium
| # | Finding | Status |
|---|---|---|
| M1 | Sitemap `lastmod` was today's date on every page (misleading). | **Fixed**: date now changes only when a page's content changes (`src/lastmod.json`). First build stamps everything with the build date. |
| M2 | Social image on every page was the old small logo. No large-image card tags. | **Fixed**: 1200x630 card, `summary_large_image`, Twitter tags, `logo` and `image` in schema. |
| M3 | Several titles were weak or generic ("Insulation | ... Dearborn Heights", "Dearborn Heights Drywall") and some descriptions said "family-owned" or were over 160 characters. | **Fixed** (see section 2). |
| M4 | Homepage service-area copy addressed homeowners only. | **Fixed.** |
| M5 | `/about` and `/about/` both return 200 (also `/index.html`). Canonicals point to the slash version so Google consolidates them. | Left as is. A redirect rule risked breaking the `/api/` functions the GHL setup needs. Not harmful. |
| M6 | `http://` apex takes two hops to reach `https://www` (http to https apex, then to www). | Vercel-level behavior. Acceptable. Optional: no change needed. |
| M7 | Structured data validity vs eligibility. FAQPage and Service markup is valid, but Google restricts FAQ rich results to government/health sites, and Service has no rich result. Only BreadcrumbList is eligible for a rich result. | Documented. No fake properties added. |
| M8 | `/sms-opt-in/` is indexable (you asked for the noindex to be removed for A2P review). Utility page, low search value. | Kept indexable, **removed from the sitemap**. Owner decision: it can be `noindex` without blocking carrier reviewers, who just load the URL. |
| M9 | The business address (25244 Annapolis St) is shown publicly on every page and in schema. | **Not changed. Owner decision** (section 6). |

### Low
Logo (39 KB for a 101 px image) and favicon (26 KB) were oversized; heading font weight 700 was not preloaded; static assets had no long-lived cache headers. **All fixed.**

## 2. Changes implemented (files)
- `src/data.mjs`: `siteUrl` set to the www host; titles and descriptions rewritten for all 8 service and 6 area pages; new distinct "commercial and residential" section and a "Do you do commercial drywall work in X?" FAQ on each area page; commercial FAQ on drywall repair, plaster repair, Level 5 finishing and dustless sanding.
- `src/lib.mjs`: social tags (large card, size, alt, locale, Twitter), schema (`logo`, `image`, city-level `areaServed`), responsive 200/400 px logo with `fetchpriority`, extra font preload.
- `src/pages.mjs`: homepage area copy; service schema `url` and `serviceType`; Our Work intro paragraph with links to service pages and the contact page; shorter descriptions on Services and Careers.
- `build.mjs`: honest `lastmod`; SMS opt-in out of the sitemap.
- New: `vercel.json` (cache headers for fonts, css/js and media; `nosniff` and referrer policy), `site/assets/img/og-default.jpg`, `logo.png`, `brand-logo-200.webp`, 800 px hero variants for the six area pages, `src/lastmod.json`.
- Regenerated `site/` (every page picks up the new host and tags).
- Not touched: Formspree, GHL/A2P pages and consent behavior, Careers, videos, branding.

## 3. Measurements (Lighthouse lab data; no field data was available for this small site)
**Live site, before (mobile, simulated slow 4G + throttled CPU):**

| Page | Perf | LCP | Blocking time | CLS | A11y / Best practices / SEO |
|---|---|---|---|---|---|
| Home | 100 | 1.84 s | 30 ms | 0.030 | 100 / 100 / 100 |
| Service (drywall installation) | 87 | 2.18 s | 448 ms | 0 | 100 / 100 / 100 |
| Location (Dearborn Heights) | 82 | 2.57 s | 519 ms | 0 | 100 / 100 / 100 |
| Contact | 97 | 1.66 s | 99 ms | 0 | 100 / 100 / 100 |

Desktop, live, before: 99 to 100 on all four pages, LCP 0.3 to 0.5 s.

**Local, same server, before vs after my changes (mobile):** local numbers are not comparable to live (the local test server has no compression or HTTP/2), so only the pair below is meaningful.

| Page | Perf before to after | LCP before to after | Page weight before to after |
|---|---|---|---|
| Location | 94 to 98 | 3.00 s to 2.41 s | 291 KB to 214 KB |
| Service | 97 to 99 | 2.56 s to 2.11 s | 227 KB to 185 KB |
| Contact | 98 to 99 | 2.25 s to 1.96 s | 296 KB to 254 KB |
| Home (3 runs each) | 96, 96, 96 to 97, 97, 97 | about 2.72 s to 2.63 s | 1569 KB to 1527 KB |

Accessibility, best practices and SEO stayed at 100 after the changes. The **live "after" has not been measured**, because nothing is deployed yet. Re-run PageSpeed Insights after you deploy.
Note: the live blocking time on service/location (450 to 520 ms) did not reproduce locally, so I cannot say whether the changes cut it on live. The remaining live cost is main-thread style/layout work before first paint, not network. I tried `content-visibility` to reduce it, saw it raise false accessibility flags in Lighthouse, and removed it.

## 4. Keyword-to-URL map
No search volume or difficulty data was available, and none is invented. Intent is judged from search results and the service. "Metro Detroit" appears in many titles by design, but each page has one primary intent.

| URL | Primary intent | Secondary |
|---|---|---|
| `/` | commercial drywall contractor, Metro Detroit | drywall and plaster contractor Dearborn Heights |
| `/services/drywall-installation/` | commercial drywall installation | drywall hanging and finishing, new construction drywall |
| `/services/drywall-repair/` | drywall repair Metro Detroit | hole/crack repair, water-damaged drywall repair |
| `/services/plaster-repair/` | plaster repair Metro Detroit | plaster ceiling/wall crack repair |
| `/services/level-5-finishing/` | Level 5 drywall finishing | smooth wall finish, skim coat |
| `/services/dustless-sanding/` | dustless drywall sanding | low-dust drywall finishing |
| `/services/basement-garage-house-finishing/` | basement drywall finishing | garage drywall, whole-house drywall |
| `/services/insulation/` | insulation before drywall (Metro Detroit) | basement/garage insulation |
| `/services/window-glazing-caulking/` | window glazing and caulking | window sealing repair |
| `/service-areas/dearborn-heights/` | drywall contractor Dearborn Heights | plaster repair Dearborn Heights |
| `/service-areas/dearborn/` `/monroe/` `/carleton/` `/downriver/` | drywall (and plaster) contractor in each place | commercial drywall in each place |
| `/service-areas/metro-detroit/` | commercial drywall contractor Metro Detroit | regional umbrella page |
| `/about/` | brand: "The Original Patch Master" | commercial drywall company Dearborn Heights |
| `/our-work/` | brand plus visual proof | none (supports service pages) |
| `/contact/` | free drywall estimate | brand and contact queries |
| `/careers/` | drywall jobs Metro Detroit | drywall finisher jobs (a live job listing showed hiring demand) |

Competitor observations (from live searches, not rank data): directories dominate; I found no independent contractor site specifically for Downriver drywall, which suggests the Downriver and city pages are worth developing with real content. Commercial searches skew toward bid-platform directories.

## 5. Local SEO and Google Business Profile alignment checklist
Nothing here is verified. The profile may not exist yet.
- Business name: use the exact name the owner approves, and keep it identical on the site, GBP and every citation. The site says "The Original Patch Master". The owner also mentioned possibly using that name on Google; confirm it matches the legal/registered name.
- Phone 734-489-2284, hours Mon to Fri 7:00 AM to 5:00 PM, same everywhere.
- Primary category: a drywall category (verify the exact name inside GBP). Add secondary categories only for services actually offered (plastering, insulation, window glazing/caulking are candidates; check each exists).
- Services list in GBP: copy the site's service names.
- Website link: `https://www.originalpatchmaster.com/`. Optional UTM tags on the link so GBP visits are separable in analytics.
- Service areas: only Dearborn Heights, Dearborn, Monroe, Carleton, Downriver and Metro Detroit as the owner confirms. Do not add more.
- Address: **decide whether to display it** (service-area business). If hidden on GBP, consider whether to keep it on the site; keep them consistent.
- Photos: use the real job photos and videos already provided. Add finished-work photos when available.
- Description: use the site's plain wording, 25 years in the trade, commercial and residential. No unverified claims.
- Reviews: send every customer the same review link (the `/feedback/` page has no rating gating). Reply to all reviews.
- Citations: only consistent NAP listings the owner controls. No bulk directory submissions.

## 6. Needs client confirmation
1. Canonical host: the code now assumes `www` is the permanent main host. Confirm they do not plan to switch.
2. Address display (above).
3. Business name on Google ("The Original" or not).
4. "25 years in the trade" is used everywhere; the separate "30 years" claim is still unexplained and unused.
5. Which service areas are truly covered, and any new towns worth a page.
6. Whether commercial work should be named by property type (offices, retail, etc.) once they confirm real examples. None is claimed now.
7. Whether `/sms-opt-in/` should be `noindex`.
8. GBP: who owns it, and whether it is verified.

## 7. 30/60/90-day plan (no ranking promises)
**Days 1 to 30:** deploy the changes; verify the site in Search Console and submit `https://www.originalpatchmaster.com/sitemap.xml`; request indexing for the homepage and the 5 most important pages; claim/verify the Google Business Profile; re-run PageSpeed Insights; set up the Search Console and GBP review routine; collect from Patch Master: 15 to 30 finished-work photos with job type and town, and 3 to 5 sentences each on a recent job (what it was, what was done).
**Days 31 to 60:** publish the first 2 to 3 real project write-ups (town, service, the challenge, work performed, photos, confirmed outcome); add them to Our Work and link from the matching service and area pages; ask finished customers for Google reviews; fix whatever Search Console flags; check which queries already show impressions.
**Days 61 to 90:** review Search Console queries and pages; expand the service or area pages that show impressions but few clicks with real, specific content; add 2 to 3 FAQ items from real customer questions; decide on new location pages only where there are real projects and demand; compare leads by source (Formspree/GHL `source_page`, calls, GBP).
**Cadence:** one real project write-up or one answered customer question per month is sustainable. Quality and accuracy over volume.

Task split. **Arclo:** deploy, build/QA, schema and metadata maintenance, write up projects from provided facts and photos, internal linking, monthly reports. **Needs Patch Master:** photos, job details and outcomes, review link, GBP access, address and name decisions, sign-off on claims.

## 8. Search Console actions (manual)
1. Add the **Domain** property for `originalpatchmaster.com` (DNS TXT verification) so www and non-www are covered, and optionally a URL-prefix property for `https://www.originalpatchmaster.com/`.
2. Submit `https://www.originalpatchmaster.com/sitemap.xml` under Sitemaps.
3. Use URL Inspection on `/`, `/services/`, one service page and one area page: confirm "URL is on Google" or request indexing.
4. Check Pages (indexing): the expected indexable set is the 23 pages in the sitemap plus `/sms-opt-in/`. `/book-estimate/` and `/feedback/` are intentionally `noindex`.
5. Check Core Web Vitals and Mobile Usability reports after about 28 days of data.
6. Check Enhancements for Breadcrumbs. FAQ/Service items will show as valid markup but not rich-result eligible.
7. Weekly or monthly: Performance report by query and page; track impressions, clicks, average position, and which queries bring qualified estimate requests.
8. Link Search Console to Google Analytics only if analytics is added later (none is installed now).
9. Measurement without extra personal data: Search Console, GBP Insights (calls, direction requests, website clicks), Formspree/GHL submission counts with the existing `source_page` field, and a UTM tag on the GBP website link.

## 9. What could not be verified
- **Rankings, search volume, keyword difficulty:** no ranking or volume data tool was available.
- **Google Rich Results Test and the Schema.org validator:** these are web tools that cannot be run from here. I validated the JSON-LD with scripts (parses, supported types, all URLs on the canonical host, FAQ text matches visible text, no unsupported properties). Please run both once after deploy.
- **Live "after" performance and Core Web Vitals field data:** nothing is deployed, and a site this small has no field data yet.
- **Whether the Vercel `headers` config and the `/api` functions behave on Vercel:** not testable until deployed.
- **GBP status, the Google index state, and any existing citations.**
- **Real search intent depth:** competitor review was limited to what live searches returned. Treat the keyword map as a reasoned starting point to refine with Search Console data.
