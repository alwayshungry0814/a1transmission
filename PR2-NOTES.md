# PR #2 — SEO: Canoga Park geo service-area page

## What changed
- Added `transmission-repair-canoga-park.html` — geo service-area page for Canoga Park / west SFV drivers.
- Added sitemap URL `https://a1transmissionautos.com/transmission-repair-canoga-park`.
- Internal links from homepage, Winnetka repair page, and FAQ hub.

## Hard stops (checked)
- **NAP:** 20146 Saticoy Street B1, Winnetka, CA 91306 only.
- **Warranty:** 12,000 miles / 1 year only (no 100k).
- **No fake Canoga address / storefront.** Copy and FAQPage schema state there is no Canoga Park location; Canoga Park is a service area served from the Winnetka shop.

## Why
Local search for “transmission repair Canoga Park” with a nearby-Winnetka angle, without inventing a second shop.

## Test plan
1. Open `transmission-repair-canoga-park.html` locally; header/footer/CSS match service pages.
2. Confirm FAQPage + AutoRepair JSON-LD: Winnetka address only; FAQ “Do you have a Canoga Park location?” answers **No**.
3. Confirm warranty is 12,000 miles / 1 year.
4. Confirm sitemap includes `/transmission-repair-canoga-park`.
5. Confirm links from home, Winnetka repair, and FAQ.
6. After deploy (not this PR): pretty URL `/transmission-repair-canoga-park` returns 200.

## Push / PR note
**Do not merge** until SEO reviews and Eugene says yes.
