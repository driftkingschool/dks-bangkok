# Drift King School — Bangkok Landing Page

Bilingual (EN/HE) landing page for the Bangkok branch of Drift King School at SPEEDWAY Bangkok, Thailand.

## Structure

```
dks-bangkok/
├── index.html       Bilingual landing page (data-en / data-he attrs)
├── style.css        BMW-inspired white luxury theme + gold accents
├── script.js        Language toggle, nav, particles, counters, reveal
├── logo.png
├── hero-bg.mp4      Hero background video
└── *.jpg / *.jpeg   Advantage card images
```

## The experience

Single flagship package:
- **Drift King Bangkok** — 3-hour premium drift experience
- **Price:** ฿45,000 (all inclusive)
- **Location:** SPEEDWAY Bangkok, Thailand
- **Instructor:** Lavi Ochayon, Israel's drift champion

## Language switching

- **Default:** English (`lang="en"`, `dir="ltr"`)
- **Alternative:** Hebrew (`lang="he"`, `dir="rtl"`)
- Preference persisted in `localStorage['dks-bangkok-lang']`
- Two always-visible toggles: navbar pill + floating bottom-right button

## Local preview

Open `index.html` directly in a browser. No build step.

## Deployment options

1. **Subfolder of main site:** Push to `driftkingschool.github.io/bangkok/`
2. **Standalone repo:** Create `dks-bangkok-site` repo + GitHub Pages
3. **Subdomain:** `bangkok.driftkingschool.com` via Netlify/Vercel

## Brand notes

- Internal price split (client 25k / business 20k) is **private** — not shown on site
- Keep brand language consistent with main site: no "שליטה בכאוס", no "לשרוף"
- Premium-first positioning — we are "the most expensive and the best"
