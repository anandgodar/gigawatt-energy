// POST /api/estimate — emails the visitor their calculator estimate and
// notifies the team of a warm lead. Same Resend setup as /api/quote.
import { TEAM_EMAIL, FROM, json, sendEmail, saveLead } from "../_lib.js";

export async function onRequestPost(context) {
  let d;
  try { d = await context.request.json(); } catch { return json({ ok:false }, 400); }
  if (!d.email || !/.+@.+\..+/.test(d.email)) return json({ ok:false, error:"bad email" }, 400);

  await saveLead(context.env, { email: d.email, name: d.email.split("@")[0], bill: d.bill, service: d.system }, "calculator");

  const key = context.env.RESEND_API_KEY;
  if (!key) return json({ ok:true, emailed:false });

  const body =
    `Here's your solar savings estimate from Gigawatt Energy:\n\n` +
    `System: ${d.system}\nEstimated annual savings: ${d.savings}\n` +
    `Indicative cost after rebates: ${d.cost}\nEstimated payback: ${d.payback}\n` +
    `(Based on a quarterly bill of ~$${d.bill})\n\n` +
    `These are estimates — your fixed written quote is based on your actual roof, switchboard and bills.\n` +
    `Ready for exact numbers? Reply to this email or call 0451 644 220.\n\n` +
    `Gigawatt Energy — family-run, SAA-accredited installer, Mickleham VIC\n` +
    `gigawattenergy.com.au`;

  const send = (p) => sendEmail(key, p);

  const results = await Promise.allSettled([
    send({ from: FROM, to: [d.email], subject: "Your solar savings estimate | Gigawatt Energy", text: body }),
    send({ from: FROM, to: [TEAM_EMAIL], reply_to: d.email,
      subject: `Calculator lead — ${d.email} (${d.system})`,
      text: `Calculator estimate requested:\n\nEmail: ${d.email}\n${body}` }),
  ]);
  return json({ ok:true, emailed: results.every(r => r.status==="fulfilled" && r.value.ok) });
}

