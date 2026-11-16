// GET /api/unsubscribe?id=..&t=.. — one-click stop for the follow-up sequence.
export async function onRequestGet(context) {
  const { env, request } = context;
  const u = new URL(request.url);
  const id = u.searchParams.get("id"), t = u.searchParams.get("t");
  let ok = false;
  if (env.LEADS && id && t) {
    const r = await env.LEADS.prepare(
      `UPDATE leads SET status='stopped', updated_at=datetime('now') WHERE id=?1 AND stop_token=?2`
    ).bind(id, t).run();
    ok = r.meta.changes > 0;
  }
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Follow-ups stopped | Gigawatt Energy</title>
<style>body{font-family:system-ui,sans-serif;background:#f6f3ec;color:#1b2227;display:grid;place-items:center;min-height:100vh;margin:0}
.card{background:#fff;border-radius:16px;padding:2.5rem;max-width:420px;text-align:center;box-shadow:0 20px 50px rgba(20,26,31,.12)}
a{color:#1e7a4f}</style></head><body><div class="card">
<h1 style="font-size:1.4rem">${ok ? "Done — no more follow-ups" : "Link already used or invalid"}</h1>
<p>${ok ? "We won't email you again about this enquiry. If you ever need us: 0451 644 220." : "If you're still receiving emails, reply to any of them and we'll stop right away."}</p>
<p><a href="/">Back to gigawattenergy.com.au</a></p></div></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
