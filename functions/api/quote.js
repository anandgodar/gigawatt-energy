// Cloudflare Pages Function: POST /api/quote
// Receives the quote wizard submission, emails the team, and sends the
// customer a thank-you confirmation.
//
// Setup (one-time, in Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY  — API key from resend.com (free tier: 100 emails/day)
//   and verify the sending domain gigawattenergy.com.au in Resend.
// Until the key is set, the function still accepts the lead and returns
// { ok:true, emailed:false } — the widget then falls back to its mailto flow.

import { TEAM_EMAIL, FROM, json, sendViaEnv, emailConfigured, saveLead, footer } from "../_lib.js";

export async function onRequestPost(context) {
  let data;
  try {
    data = await context.request.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }

  const required = ["service", "suburb", "name", "phone", "email"];
  for (const k of required) {
    if (!data[k] || String(data[k]).trim().length < 2) {
      return json({ ok: false, error: `missing ${k}` }, 400);
    }
  }
  if (!/.+@.+\..+/.test(data.email)) return json({ ok: false, error: "bad email" }, 400);

  const lead = await saveLead(context.env, data, "quote-wizard");

  if (!emailConfigured(context.env)) return json({ ok: true, emailed: false, stored: !!lead });

  const firstName = String(data.name).trim().split(/\s+/)[0];
  const summary = [
    `Service: ${data.service}`,
    `Suburb: ${data.suburb}`,
    `Property: ${data.property || "-"}`,
    `Power supply: ${data.phase || "-"}`,
    `Avg quarterly bill: ~$${data.bill || "-"}`,
    `Existing solar: ${data.existing || "-"}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Best time to call: ${data.callback || "Anytime"}`,
  ].join("\n");

  const send = (payload) => sendViaEnv(context.env, payload);
  const base = new URL(context.request.url).origin;
  const extra = lead ? footer(base, lead.id, lead.token, context.env.BOOKING_URL || "") : "";

  const results = await Promise.allSettled([
    // 1) Notification to the team
    send({
      from: FROM,
      to: [TEAM_EMAIL],
      reply_to: data.email,
      subject: `New quote request — ${data.service} (${data.suburb})`,
      text: `New quote request from the website:\n\n${summary}`,
    }),
    // 2) Thank-you to the customer
    send({
      from: FROM,
      to: [data.email],
      subject: "Thanks — we've received your quote request | Gigawatt Energy",
      text:
        `Hi ${firstName},\n\n` +
        `Thanks for requesting a quote with Gigawatt Energy. We've received your details:\n\n${summary}\n\n` +
        `A licensed electrician from our team will call you back (${data.callback || "anytime"}, Mon–Fri 8am–5pm) ` +
        `to talk through your options and arrange a fixed written quote.\n\n` +
        `Need us sooner? Call 0451 644 220.\n\n` +
        `Gigawatt Energy — family-run, SAA-accredited solar, battery & EV charger installer\n` +
        `Merrifield, Mickleham VIC 3064 · gigawattenergy.com.au`,
    }),
  ]);

  const emailed = results.every((r) => r.status === "fulfilled" && r.value.ok);
  return json({ ok: true, emailed });
}

