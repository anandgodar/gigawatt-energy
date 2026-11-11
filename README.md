# Gigawatt Energy — Website Rebuild

Rebuild of [gigawattenergy.com.au](https://gigawattenergy.com.au) as a fast, SEO-first static site with a daily-work blog.

**Stack:** Eleventy 3 · Nunjucks · single hand-written CSS file · zero client-side frameworks.

## Run locally

```bash
npm install
npx @11ty/eleventy --serve   # http://localhost:8080
```

Build output goes to `_site/`.

## Posting a daily work entry

Create a markdown file in `src/blog/posts/` named `YYYY-MM-DD-slug.md`:

```markdown
---
title: "What you did today — suburb"
date: 2026-11-12
tags: ["Solar + Battery"]
metaDescription: "One-sentence summary under 160 characters."
---

Your write-up here.

{% youtube "VIDEO_ID", "Video title" %}
```

The `{% youtube %}` shortcode embeds a privacy-enhanced (youtube-nocookie), lazy-loaded player. The post automatically gets BlogPosting schema, a canonical URL, appears on `/blog/` and the homepage "From the field" section, and is added to the sitemap.

## SEO built in

- Unique title + meta description (≤160 chars) per page, canonical tags, Open Graph
- JSON-LD: LocalBusiness (site-wide), Service + FAQPage + BreadcrumbList (service pages), BlogPosting (posts)
- `sitemap.xml` and `robots.txt` generated automatically
- Clean keyword slugs (fixes the old site's `/ev-charger-installation-3/` duplication)
- Semantic HTML, one H1 per page, mobile-first, no render-blocking JS

## Before launch

1. Set `production: true` in `src/_data/site.js` — removes the site-wide `noindex`.
2. Wire the contact form in `src/contact.njk` to a real endpoint (Formspree / Cloudflare Worker / CRM webhook) and test a submission.
3. Replace the two sample blog posts with real ones (the Craigieburn post has a placeholder video ID).
4. Add real installation photos (hero + service pages) — none were copied from the old site.
5. Deploy to Cloudflare Pages (free builds), point DNS, verify in Search Console, submit the sitemap.
6. Set up 301 redirects from old WordPress URLs (e.g. `/services/ev-charger-installation-3/` → `/services/ev-charger-installation/`).
