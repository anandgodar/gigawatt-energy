# AUDIT — Gigawatt Energy rebuild (2026-11-11)

## Release blockers (must clear before going live)

- [ ] **Thank-you emails need one env var** — the wizard now POSTs to `/api/quote` (Cloudflare Pages Function). Add `RESEND_API_KEY` in Cloudflare Pages → Settings → Environment variables and verify gigawattenergy.com.au in resend.com (free tier). Until then the function accepts the lead and the widget falls back to a pre-filled email; after the key is set, the team gets a notification and the customer gets an automatic thank-you email. Test one real submission end-to-end.
- [ ] **Site-wide noindex active** — `production: false` in `src/_data/site.js`. Flip only at launch.
- [ ] **Sample blog posts** — both posts are format demos; the Craigieburn post embeds a placeholder YouTube ID. Replace before launch.
- [x] **Real imagery added** — logo, Amrit profile photo, install/EV/switchboard stills and the 2-minute brand film, all extracted from the owner's uploaded brand video.
- [ ] **301 redirect map** from old WordPress URLs not yet deployed (list in README).
- [ ] **Facts to confirm with owner**: 1,600+ installs figure, award list incl. 2026 finalist, all credentials current (REC-32099, SAA, NETCC, Tesla, Sigenergy, Solar Victoria), rebate wording still accurate at launch date.

## Follow-up engine (new) — activation steps
- [x] D1 database `gigawatt-leads` created (Sydney) with schema applied
- [ ] Cloudflare Pages → gigawatt-energy → Settings → Bindings: add **D1 binding** named `LEADS` → database `gigawatt-leads`
- [ ] Cloudflare Pages env var `CRON_SECRET` (any long random string) — same value as the GitHub Actions secret `CRON_SECRET`
- [ ] Optional: `BOOKING_URL` env var (free Cal.com link for Amrit) — adds "book a call" to all emails + thank-you
- [ ] At launch (domain on Cloudflare): add Email Routing + an Email Worker on quotes@ to auto-stop sequences when a customer replies
- How it works: every wizard/calculator lead is stored; GitHub Actions hits `/api/cron` daily (~9:37am Melbourne); drip = Day 1 "what happens next", Day 3 Amrit/proof, Day 7 final check-in, then stops forever; every email has a one-click stop link (`/api/unsubscribe`)

## What was verified in this build

- All 15 pages build cleanly (Eleventy 3.1.8)
- Every JSON-LD block parses as valid JSON (LocalBusiness, Service, FAQPage, BreadcrumbList, BlogPosting)
- Every page: exactly one H1, canonical tag, unique meta description ≤165 chars
- Zero broken internal links or missing assets (automated crawl of `_site/`)
- Sitemap excludes 404; robots.txt references sitemap

## Not verified (needs human/browser check)

- Visual rendering at 320/375/768/1280 px (no browser in build environment) — open locally and scroll every page
- Real-device tap targets and mobile nav behaviour
- Rich results eligibility (run pages through Google's Rich Results Test after deploy)

## Fixes vs the old site

- Added missing meta descriptions (old homepage had none)
- Fixed FAQ answers that didn't match their questions
- Fixed broken stat counters ("0 k+") with static real values
- Fixed typos ("renewal energy", "A five years")
- Fixed duplicated/broken service slugs (`ev-charger-installatio`, `ev-charger-installation-3`)
- Service descriptions now match their headings (battery retrofit card described solar PV before)
