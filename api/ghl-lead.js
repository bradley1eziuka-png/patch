// Vercel serverless function: forwards a customer lead to a GoHighLevel inbound webhook.
//
// WHY THIS EXISTS: the GHL webhook URL is a secret-like value. It must never appear in public website code.
// It is read here from the server-side environment variable GHL_WEBHOOK_URL (set in Vercel > Project > Settings >
// Environment Variables). The browser only ever calls this same-origin endpoint.
//
// FLOW: the website sends the lead to Formspree first. Only after Formspree accepts it, the browser forwards the same
// lead here (same lead_id). So Formspree stays the record of every lead, and a GHL outage cannot lose or block one.
//
// DUPLICATES: every lead carries a lead_id. This function drops a repeat of the same lead_id it has seen recently
// (best effort: serverless instances do not share memory), and passes lead_id to GHL so the GHL workflow can
// de-duplicate too. In GHL use "Create/Update Contact" (matches on phone/email) so repeat people update, not duplicate.
//
// Environment variables:
//   GHL_WEBHOOK_URL   (required) the GHL "Inbound Webhook" URL
//   ALLOWED_ORIGINS   (optional) extra comma-separated origins, e.g. a Vercel preview URL

const ALLOWED = [
  'https://originalpatchmaster.com',
  'https://www.originalpatchmaster.com',
  ...(process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
];
const FIELDS = [
  'name', 'phone', 'email', 'city', 'service', 'message', 'contact_method',
  'source_page', 'submitted_at', 'lead_id',
  'sms_consent_service', 'sms_consent_marketing',
  'sms_consent_version', 'sms_service_consent', 'sms_service_consent_text',
  'sms_marketing_consent', 'sms_marketing_consent_text', 'sms_consent_recorded_at',
];
const seen = new Map();             // lead_id -> time seen (best-effort de-duplication)
const SEEN_MS = 10 * 60 * 1000;

function originOk(req) {
  const o = req.headers.origin || '';
  if (ALLOWED.includes(o)) return true;
  return /^http:\/\/localhost(:\d+)?$/.test(o);   // local testing
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }
  if (!originOk(req)) return res.status(403).json({ ok: false, error: 'origin' });

  const hook = process.env.GHL_WEBHOOK_URL;
  if (!hook) return res.status(503).json({ ok: false, error: 'not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body || typeof body !== 'object' || JSON.stringify(body).length > 12000) return res.status(400).json({ ok: false, error: 'bad_body' });

  if (body._gotcha) return res.status(200).json({ ok: true });                       // honeypot: quietly ignore bots
  const lead = {};
  for (const k of FIELDS) if (body[k] != null) lead[k] = String(body[k]).slice(0, 3000);
  if (!lead.phone && !lead.email) return res.status(400).json({ ok: false, error: 'no_contact' });

  const now = Date.now();
  for (const [k, t] of seen) if (now - t > SEEN_MS) seen.delete(k);
  if (lead.lead_id && seen.has(lead.lead_id)) return res.status(200).json({ ok: true, duplicate: true });

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, source: 'website' }), signal: ctrl.signal });
    clearTimeout(timer);
    if (!r.ok) return res.status(502).json({ ok: false, error: 'ghl_rejected' });   // browser retries once; Formspree already has the lead
    if (lead.lead_id) seen.set(lead.lead_id, now);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'ghl_unreachable' });
  }
};
