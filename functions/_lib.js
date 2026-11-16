// Shared helpers for Pages Functions
export const TEAM_EMAIL = "info@gigawattenergy.com.au";
export const FROM = "Gigawatt Energy <quotes@gigawattenergy.com.au>";
export const SITE = "https://gigawattenergy.com.au";

export const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

// Provider-agnostic sender. Uses, in order:
// 1. Cloudflare Email Service binding `EMAIL` (send_email) — requires Workers
//    Paid plan + domain onboarded on Cloudflare DNS (post-launch option)
// 2. Resend HTTP API via RESEND_API_KEY (current provider)
// Payload shape is Resend-style: { from, to:[..], reply_to?, subject, text }.
export async function sendViaEnv(env, payload) {
  if (env.EMAIL) {
    try {
      const m = /^(.*)<(.+)>$/.exec(payload.from || "");
      await env.EMAIL.send({
        from: m ? { email: m[2].trim(), name: m[1].trim() } : { email: payload.from },
        to: (payload.to || []).map((e) => ({ email: e })),
        ...(payload.reply_to ? { replyTo: { email: payload.reply_to } } : {}),
        subject: payload.subject,
        text: payload.text,
      });
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  }
  if (env.RESEND_API_KEY) {
    return fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
  return { ok: false, unconfigured: true };
}
export const emailConfigured = (env) => !!(env.EMAIL || env.RESEND_API_KEY);

// Back-compat wrapper (Resend by key)
export const sendEmail = (key, payload) =>
  fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

// Store a lead in D1 (no-op if the LEADS binding isn't configured yet)
export async function saveLead(env, data, source) {
  if (!env.LEADS) return null;
  try {
    const id = crypto.randomUUID();
    const token = crypto.randomUUID().replaceAll("-", "");
    await env.LEADS.prepare(
      `INSERT INTO leads (id, created_at, name, email, phone, suburb, service, bill, source, status, last_step, stop_token)
       VALUES (?1, datetime('now'), ?2, ?3, ?4, ?5, ?6, ?7, ?8, 'active', 0, ?9)`
    ).bind(id, data.name || null, data.email, data.phone || null, data.suburb || null,
           data.service || null, String(data.bill || ""), source, token).run();
    return { id, token };
  } catch (e) {
    return null; // lead storage must never break the enquiry flow
  }
}

export const stopLink = (base, id, token) => `${base}/api/unsubscribe?id=${id}&t=${token}`;

export const footer = (base, id, token, booking) =>
  `\n\n—\nGigawatt Energy — family-run, SAA-accredited solar, battery & EV charger installer\n` +
  `Merrifield, Mickleham VIC 3064 · 0451 644 220 · gigawattenergy.com.au\n` +
  (booking ? `Book a 10-minute call: ${booking}\n` : "") +
  `Prefer we stop following up? One click: ${stopLink(base, id, token)}`;
