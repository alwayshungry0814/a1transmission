# PR #1 — SEO Foundation: sitemap, robots, FAQ hub

## What changed
- Added `robots.txt` pointing crawlers to the sitemap.
- Added `sitemap.xml` with absolute `https://a1transmissionautos.com/` URLs for home, all existing service pages, and the new FAQ hub (pretty paths without `.html`).
- Added `faq-transmission-problems.html` — AEO FAQ hub for transmission problem signs in Winnetka / SFV, with FAQPage JSON-LD, NAP, phone CTA, and links to transmission repair.
- Minimal `index.html` edit: visible link to the FAQ from the services section.
- Skipped `_redirects` / `netlify.toml` — Netlify already serves pretty URLs for `.html` pages (confirmed live).

## Why
Live site was missing `/sitemap.xml` and `/robots.txt` (404). FAQ hub fills an AEO/content gap and strengthens internal linking. Warranty stated as **12,000 miles / 1 year** only.

## Test plan
1. Open locally: `faq-transmission-problems.html`, confirm header/footer/CSS match service pages.
2. Confirm FAQPage JSON-LD validates (Rich Results / Schema Markup Validator).
3. Confirm warranty text is 12,000 miles / 1 year (no 100k).
4. After deploy: `https://a1transmissionautos.com/robots.txt` and `/sitemap.xml` return 200.
5. After deploy: `/faq-transmission-problems` loads (pretty URL); home services section links to FAQ.
6. Submit sitemap in Google Search Console.

## Push / PR note
Cloud Agents unavailable on current plan — **do not push from this environment**. Owner should push branch `seo/foundation-sitemap-faq` and open the PR (or use a GH token locally):

```bash
git push -u origin seo/foundation-sitemap-faq
gh pr create --title "SEO foundation: robots, sitemap, FAQ hub" --body "$(cat PR1-NOTES.md)"
```
