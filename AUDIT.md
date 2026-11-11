# AUDIT — Gigawatt Energy rebuild (2026-11-11)

## Release blockers (must clear before going live)

- [ ] **Contact form is inert** — `action="#"`. Wire to live endpoint and test a real enquiry end-to-end.
- [ ] **Site-wide noindex active** — `production: false` in `src/_data/site.js`. Flip only at launch.
- [ ] **Sample blog posts** — both posts are format demos; the Craigieburn post embeds a placeholder YouTube ID. Replace before launch.
- [ ] **No real imagery** — old site's photos were NOT copied (rights + quality). Add own installation photos.
- [ ] **301 redirect map** from old WordPress URLs not yet deployed (list in README).
- [ ] **Facts to confirm with owner**: 1,600+ installs figure, award list incl. 2026 finalist, all credentials current (REC-32099, SAA, NETCC, Tesla, Sigenergy, Solar Victoria), rebate wording still accurate at launch date.

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
