// Vercel serverless function: records an SMS opt-in in GoHighLevel via a SEPARATE inbound webhook.
//
// Separate from api/ghl-lead.js on purpose: opt-ins are a consent record, not a customer inquiry, and they never go to
// Formspree. So here the customer is told "signed up" ONLY if GHL actually accepted the record (HTTP 2xx). If GHL is
// unreachable or rejects it, this returns an error and the page tells the customer they are not signed up yet.
//
// The webhook URL is secret-like and lives only in the server-side env var GHL_OPTIN_WEBHOOK_URL (Vercel > Settings >
// Environment Variables). It is never in public website code.
//
// Marketing consent is never inferred: sms_marketing_consent is forwarded only when the browser sent an explicit
// "Yes" or "No" for it, and is otherwise omitted. Service consent must be an explicit "Yes" or the request is refused
// (this page exists to collect consent). Env: GHL_OPTIN_WEBHOOK_URL (required), ALLOWED_ORIGINS (optional).

const ALLOWED = [
  'https://originalpatchmaster.com',
  'https://www.originalpatchmaster.com',
  ...(process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
];
const FIELDS = [
  'name', 'phone', 'email', 'form_type', 'lead_id',
  'sms_service_consent', 'sms_service_consent_text', 'sms_marketing_consent', 'sms_marketing_consent_text',
  'sms_consent_version', 'sms_consent_recorded_at', 'source_url', 'source_page',
];
const seen = new Map();
const SEEN_MS = 10 * 60 * 1000;

const originOk = (req) => ALLOWED.includes(req.headers.origin || '') || /^http:\/\/localhost(:\d+)?$/.test(req.headers.origin || '');
const yn = (v) => (v === 'Yes' || v === 'No' ? v : undefined);

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }
  if (!originOk(req)) return res.status(403).json({ ok: false, error: 'origin' });
  const hook = process.env.GHL_OPTIN_WEBHOOK_URL;
  if (!hook) return res.status(503).json({ ok: false, error: 'not_configured' });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== 'object' || JSON.stringify(b).length > 12000) return res.status(400).json({ ok: false, error: 'bad_body' });

  const rec = {};
  for (const k of FIELDS) if (b[k] != null) rec[k] = String(b[k]).slice(0, 3000);
  const digits = String(rec.phone || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  if (!/^[2-9]\d{9}$/.test(digits)) return res.status(400).json({ ok: false, error: 'bad_phone' });
  rec.phone = '+1' + digits;
  if (!rec.name || !rec.name.trim()) return res.status(400).json({ ok: false, error: 'no_name' });
  if (rec.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rec.email)) return res.status(400).json({ ok: false, error: 'bad_email' });

  rec.sms_service_consent = yn(rec.sms_service_consent);
  rec.sms_marketing_consent = yn(rec.sms_marketing_consent);
  if (rec.sms_service_consent === undefined) delete rec.sms_service_consent;
  if (rec.sms_marketing_consent === undefined) { delete rec.sms_marketing_consent; delete rec.sms_marketing_consent_text; }
  if (rec.sms_service_consent !== 'Yes' && rec.sms_marketing_consent !== 'Yes') return res.status(400).json({ ok: false, error: 'no_consent' });
  if (!rec.sms_consent_recorded_at) rec.sms_consent_recorded_at = new Date().toISOString();

  const now = Date.now();
  for (const [k, t] of seen) if (now - t > SEEN_MS) seen.delete(k);
  if (rec.lead_id && seen.has(rec.lead_id)) return res.status(200).json({ ok: true, duplicate: true });

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...rec, source: 'website-sms-opt-in', server_received_at: new Date().toISOString() }), signal: ctrl.signal });
    clearTimeout(timer);
    if (!r.ok) return res.status(502).json({ ok: false, error: 'ghl_rejected' });
    if (rec.lead_id) seen.set(rec.lead_id, now);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'ghl_unreachable' });
  }
};
