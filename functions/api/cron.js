// POST /api/cron — processes the follow-up drip. Called daily by the
// GitHub Actions workflow (.github/workflows/followup-cron.yml) with
// Authorization: Bearer <CRON_SECRET>.
//
// Sequence (polite, finite, with one-click stop in every email):
//   Day 1  — "what happens next" + booking link
//   Day 3  — Amrit / proof / answer-objections
//   Day 7  — final check-in; sequence ends (no email ever after step 3)
import { FROM, TEAM_EMAIL, json, sendEmail, footer } from "../_lib.js";

const STEPS = [
  { step: 1, afterDays: 1, subject: "Your Gigawatt Energy quote — what happens next",
    body: (n, booking) =>
`Hi ${n},

Thanks again for your enquiry yesterday. Here's how it works from here:
a licensed electrician (not a salesperson) reviews your details, then calls
to talk through options and book a quick look at your roof and switchboard.
You'll get a fixed written quote — no obligation, no door-knockers.

${booking ? `Want to pick the time yourself? Book a 10-minute call here: ${booking}` : "Want us sooner? Call 0451 644 220 — Mon–Fri, 8am–5pm."}` },
  { step: 2, afterDays: 3, subject: "The electrician behind your quote",
    body: (n, booking) =>
`Hi ${n},

Quick note while you're comparing options: every Gigawatt system is designed
and signed off by Amrit Singh Thapa — 'A' Grade Electrician, SAA accredited,
Tesla Powerwall and Sigenergy certified, and a four-time Electrician of the
Year finalist. Our 5.0-star Google reviews mention him by name.

If you've had other quotes, send them over — we're happy to give you an honest
comparison, even where we're not the cheapest.${booking ? `\n\nBook a 10-minute call: ${booking}` : ""}` },
  { step: 3, afterDays: 7, subject: "Last check-in from Gigawatt Energy",
    body: (n, booking) =>
`Hi ${n},

This is our last follow-up — no more emails after this one, promise.

If the timing isn't right, no problem at all. Two things worth knowing before
you file this away: current federal battery incentives are the most generous
they've been, and our install calendar books out a few weeks ahead in summer.

Whenever you're ready: 0451 644 220, or just reply to this email.${booking ? `\nOr book a time that suits you: ${booking}` : ""}

All the best,
The Gigawatt Energy team` },
];

export async function onRequestPost(context) {
  const { env, request } = context;
  const auth = request.headers.get("Authorization") || "";
  if (!env.CRON_SECRET || auth !== `Bearer ${env.CRON_SECRET}`) return json({ ok: false }, 401);
  if (!env.LEADS) return json({ ok: false, error: "LEADS binding not configured" }, 500);
  if (!env.RESEND_API_KEY) return json({ ok: true, sent: 0, note: "RESEND_API_KEY not set" });

  const base = new URL(request.url).origin;
  const booking = env.BOOKING_URL || "";
  const { results } = await env.LEADS.prepare(
    `SELECT id, name, email, created_at, last_step, stop_token FROM leads
     WHERE status='active' AND last_step < 3 ORDER BY created_at LIMIT 100`
  ).all();

  let sent = 0, errors = 0;
  for (const lead of results) {
    const ageDays = (Date.now() - new Date(lead.created_at + "Z").getTime()) / 86400000;
    const next = STEPS.find((s) => s.step === lead.last_step + 1);
    if (!next || ageDays < next.afterDays) continue;
    const firstName = (lead.name || "there").trim().split(/\s+/)[0];
    const r = await sendEmail(env.RESEND_API_KEY, {
      from: FROM, to: [lead.email], reply_to: TEAM_EMAIL,
      subject: next.subject,
      text: next.body(firstName, booking) + footer(base, lead.id, lead.stop_token, booking),
    });
    if (r.ok) {
      await env.LEADS.prepare(`UPDATE leads SET last_step=?1, updated_at=datetime('now') WHERE id=?2`)
        .bind(next.step, lead.id).run();
      sent++;
    } else errors++;
  }
  return json({ ok: true, sent, errors, scanned: results.length });
}
