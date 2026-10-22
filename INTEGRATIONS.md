# GoHighLevel, booking, reviews and SMS consent: setup guide

Everything below is **off until you provide the value**. Nothing fake is in the code.
Public settings live in `src/data.mjs` under `integrations`. After changing one, run `node build.mjs`, commit and push.

## Values you need to provide

| Value | Where it goes | Secret? | What happens until it is set |
|---|---|---|---|
| **GHL inbound webhook URL** | Vercel > Project > Settings > Environment Variables: `GHL_WEBHOOK_URL` | **Yes. Never put it in the code or `src/data.mjs`.** | `/api/ghl-lead` answers 503 and the site never calls it. Leads go to Formspree only. |
| **GHL SMS opt-in webhook URL** (a separate inbound webhook, ideally its own workflow that sets the contact's SMS consent) | Vercel env var `GHL_OPTIN_WEBHOOK_URL` | **Yes** | `/sms-opt-in/` is shown with its form disabled and a "not active yet" notice. Nothing is sent. |
| Turn the SMS opt-in page on | `integrations.smsOptInEndpoint: '/api/sms-optin'` (only after the env var is set and a test works) | No | Off. The page stays `noindex` and out of the sitemap until on. |
| Turn the GHL hand-off on | `integrations.ghlLeadProxy: '/api/ghl-lead'` in `src/data.mjs` (only after the env var is set and a test works) | No | Off. |
| **GHL calendar embed URL** (the iframe `src`) | `integrations.ghlCalendarEmbedUrl` | No | `/book-estimate/` shows a "coming soon" box with a phone button, stays `noindex`, and is left out of the sitemap. |
| **GHL permanent booking link** | `integrations.ghlBookingLink` | No | Not shown. (Used for an "open in a new tab" link under the calendar.) |
| **Google Business Profile review URL** | `integrations.googleReviewUrl` | No | The homepage review section is hidden and `/feedback/` says the Google link is not ready. |
| Private feedback endpoint | `integrations.feedbackEndpoint` (a second form-service endpoint, or a GHL webhook proxy) | No (Formspree URLs are public) | The feedback form says it is not switched on. |
| Send customers to the calendar after an estimate | `integrations.bookAfterEstimate: true` (only after the calendar works) | No | Off. Existing submissions are never redirected to an unfinished page. |
| Promotional texts | `integrations.smsMarketingEnabled` (now `true`) | No | When false, the marketing checkbox is not shown at all. |

Optional: `ALLOWED_ORIGINS` env var (comma separated) to allow a Vercel preview URL to call the proxy.

## How a lead flows
1. Customer submits the estimate form on `/contact/`.
2. The browser sends it to **Formspree** (unchanged). The customer sees success only when Formspree accepts it.
3. If `ghlLeadProxy` is set, the browser then forwards the **same lead** (same `lead_id`) to `/api/ghl-lead`, a Vercel serverless function in `api/ghl-lead.js`.
4. That function adds nothing secret to the browser. It posts to the webhook in `GHL_WEBHOOK_URL`.

Failure handling: if Formspree fails, nothing goes to GHL and the customer keeps their entries to retry. If GHL fails, the customer still sees success (Formspree has the lead), the browser retries once, and the function never loses the Formspree copy.
Duplicates: each lead has a `lead_id`; the function ignores a repeat it has seen recently, and the id is passed to GHL. In the GHL workflow use **Create/Update Contact** (matches phone/email) and optionally skip when `lead_id` already exists.
Careers applications and private feedback never use this proxy.

Fields sent to GHL: `name, phone, email, city, service, message, contact_method, source_page, submitted_at, lead_id, sms_consent_version, sms_service_consent, sms_service_consent_text, sms_marketing_consent*, sms_consent_recorded_at, source`.

## Deployment note
`api/` sits in the repo root; the site itself is the static `site/` folder. Vercel runs root `api/*.js` as serverless functions in addition to the static output. This has not been tested on Vercel yet. After pushing: set `GHL_WEBHOOK_URL`, redeploy, then `curl -X POST https://originalpatchmaster.com/api/ghl-lead` should answer 403 (origin check) and not 404. If it answers 404, the Vercel project's Root/Output Directory settings need adjusting.

## SMS consent (for A2P 10DLC)
- Wording and version: `smsConsent` and `integrations.smsConsentVersion` in `src/data.mjs`. Change the version string whenever the wording changes.
- Unchecked by default, optional, never required to submit. Separate checkbox per category. Links to Privacy Policy and Terms sit beside the consent text, and the business (The Original Patch Master) is named.
- Recorded with every submission: category result (`Yes`/`No`), the exact wording shown, the version, the timestamp, and the source page.

## Owner / business confirmations needed (A2P and legal)
1. **Use case match:** the registered campaign description, message samples and opt-in description must match the real flow and wording above. Carriers compare them.
2. **Marketing texts:** decide whether promotional texts will be sent. If not, leave `smsMarketingEnabled` false and make sure the campaign registration says service/transactional only.
3. **Opt-in proof:** the opt-in URL to give carriers is `https://originalpatchmaster.com/contact/`.
4. **STOP/HELP:** GHL must be set to honor STOP and HELP keywords. The HELP contact used is the public phone 734-489-2284 and email on the site. No separate messaging number or support email was invented. Replace if the GHL number differs.
5. **Privacy Policy and Terms are plain-language drafts**, not legal advice. Please have the owner (or counsel) read them. Specifically confirm: the provider list (Formspree, GoHighLevel), "we do not sell or share SMS consent or mobile numbers with third parties for marketing", the retention wording (kept as long as needed, no fixed period stated), "no analytics or advertising cookies", and the Michigan governing-law line.
6. The privacy page says GoHighLevel is used. It should be true by the time A2P reviewers read it.
7. Business identity: the pages use The Original Patch Master and 25244 Annapolis St, Dearborn Heights, MI. It must match the legal name/address on the A2P brand registration.

## SMS opt-in page (`/sms-opt-in/`)
- **Flow:** the browser posts the record as JSON to `api/sms-optin.js`, which forwards it to the webhook in `GHL_OPTIN_WEBHOOK_URL`. It never touches Formspree. The customer is told they are signed up **only if GHL accepted the record**; otherwise they are told they are not signed up yet and keep their entries.
- **Required to submit:** full name, a valid 10-digit US mobile number (stored as `+1XXXXXXXXXX`), and at least one SMS consent box checked. Email is optional. The server enforces the same rules.
- **Recorded in the webhook payload:** `name, phone, email, form_type ("SMS opt-in"), lead_id, sms_service_consent (Yes/No), sms_service_consent_text, sms_marketing_consent (only if that box exists on the page), sms_marketing_consent_text, sms_consent_version, sms_consent_recorded_at (browser time), source_url, source_page, source, server_received_at`.
- **Marketing consent** is never inferred. It is sent only as an explicit Yes/No from its own separate checkbox, which exists only when `smsMarketingEnabled` is true. It is now on, so both /contact/ and /sms-opt-in/ show a second, separate, unchecked marketing box ("occasional marketing text messages ... such as seasonal offers and review requests"). Make sure the A2P campaign registration covers marketing messages.
- **In GHL:** build a workflow on this webhook that creates/updates the contact and sets the SMS consent / DND status from `sms_service_consent`, `sms_marketing_consent` and the version/timestamp fields. Do not mark promotional consent unless `sms_marketing_consent` is `Yes`.
- **Version:** change `integrations.smsOptInVersion` whenever `smsConsent.optInService` / `optInMarketing` wording changes.
- **Opt-in URL for the A2P registration:** `https://originalpatchmaster.com/sms-opt-in/` (only once the page is active; the page must show a working form when reviewers visit).
