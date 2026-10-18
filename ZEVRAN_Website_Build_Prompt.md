# ZEVRAN Website: Master Build Prompt, Timeline & Low-Budget Launch Plan

## PART 1: Decisions made (read first)

Your two documents conflict in places. This prompt resolves them as follows. Change any item you disagree with before using the prompt.

| Topic | Website notes say | Project brief says | Used in this prompt |
|---|---|---|---|
| Brand name | "ZR LEATHER HOUSE" | ZEVRAN | **ZEVRAN** in the header, with the ZR monogram. "Leather House" can be a small descriptor. |
| Products | Briefcase, Folio, Card Wallet | Wallets, belts, card holders, key holders | **Brief's range**: wallets, belts, card holders, key holders |
| Material claims | "Top-grain", "full-grain", "vegetable-tanned" | Do not claim a grade without supplier confirmation | **No grade claims** until the supplier confirms in writing. Use placeholders like `[MATERIAL: confirm with supplier]`. |
| Colors | Black and off-white | Espresso #241A15, Cognac #A66A3F, Ivory #F4EFE7, Bronze #9A6A3A | **Brief's palette**. Pure black is replaced by Espresso. |
| "No filters, no shortcuts" | Hero copy | Honest claims only | Dropped or reworded, because it is an unsupported claim. |
| Pricing | Not stated | Do not finalize until supplier costs are known | Price fields are placeholders in a data file. |

---

## PART 2: Technology choice (cheapest that still looks premium)

**Phase 1 (launch, almost free): static site + WhatsApp ordering**
- **Framework:** Astro (fast, ships almost no JavaScript, strong Lighthouse scores) with Tailwind CSS.
- **Hosting:** Cloudflare Pages (free tier, global CDN, free SSL, unlimited bandwidth on static assets).
- **Product data:** One `products.json` file, or Decap CMS (free) if you want to edit products from a browser.
- **Images:** Compress to WebP/AVIF (Squoosh or the `astro:assets` image optimizer). Serve responsive sizes.
- **Ordering:** "Order on WhatsApp" button with a prefilled message (product, color, size), plus a simple order form (Formspree or a Cloudflare Worker that writes to Google Sheets). Cash on delivery first. Add JazzCash/Easypaisa/bank-transfer instructions as text.
- **Analytics:** Cloudflare Web Analytics (free, no cookies) plus Meta Pixel and TikTok Pixel when ads begin.
- **Domain:** a `.com` costs roughly USD 10-15 per year (check current price at Namecheap or Cloudflare Registrar). Do not buy a premium domain.
- **Estimated Phase 1 cost:** about the domain only. Everything else is free tier. Verify current prices before paying.

**Phase 2 (only when you have steady orders): real cart and checkout**
- Option A: Shopify Basic (monthly fee; easiest, many Pakistan payment/courier apps).
- Option B: Self-hosted WooCommerce or Medusa (cheaper long term, more maintenance).
- Move only after you have verified demand, as your brief says (test demand before stock or big spend).

**Why not start with Shopify or WordPress?** They add a monthly cost and slower pages before you have a single sale. A static site is faster, cheaper, and easy to migrate later because your content stays in simple files.

---

## PART 3: The master prompt (copy everything inside the box into Claude Code, Cursor, or another AI builder)

```text
ROLE
You are a senior front-end engineer and brand-focused UI designer. Build a complete, production-ready, mobile-first website for ZEVRAN, a premium leather goods brand in Pakistan. Deliver working code, not a description.

BRAND
- Name: ZEVRAN. Tagline: "Made to Become Yours."
- Personality: bold, masculine, premium, modern; understated luxury with a craftsmanship focus.
- Logo: interlocking ZR monogram (create a clean SVG placeholder; I will replace it).
- Colors (use as CSS variables):
  --espresso: #241A15 (primary / dark sections / text on light)
  --cognac: #A66A3F (accent, buttons hover, links)
  --ivory: #F4EFE7 (page background / light sections)
  --bronze: #9A6A3A (rare premium detail only, e.g. thin lines or small icons)
- Typography: "Cormorant Garamond" SemiBold for the ZEVRAN wordmark and headlines; "Montserrat" Medium for the tagline with wide letter spacing (about 0.2em) and for body/UI text. Self-host fonts or use font-display: swap.
- Mood: dark deep tones, raw product photography, generous whitespace, editorial layout, matte (no glossy gradients, no heavy shadows).

TECH STACK (strict)
- Astro + Tailwind CSS, static output, deployable to Cloudflare Pages.
- No heavy UI libraries. Vanilla JS only where needed (mobile menu, WhatsApp link builder, simple cart-less order form).
- Product data in src/data/products.json so I can add products without touching code.
- Semantic HTML, accessible (WCAG AA contrast, alt text, keyboard focus states, prefers-reduced-motion respected).
- Performance targets: Lighthouse 95+ on mobile for Performance, Accessibility, Best Practices, SEO. LCP under 2.5s on 4G. Lazy-load below-the-fold images, use WebP/AVIF with width/height set.

PAGES AND SECTIONS
1. Header: left minimal menu (Shop, Our Story, Craftsmanship); center ZEVRAN wordmark with tiny ZR monogram; right search icon and "Order" (WhatsApp) icon. Sticky, collapses to a hamburger on mobile.
2. Hero: full-width section. Left/top: extreme close-up of stitching or leather texture. Right/bottom: a single product shot. Headline: "THE ART OF RESTRAINT." Sub-headline: "Considered design and honest materials, made for people who value structure over loud trends." CTA button: "EXPLORE THE COLLECTION" (solid Espresso, ivory text, cognac hover). Use image placeholders; support an optional muted looping video.
3. Philosophy (Ivory background): centered, large editorial serif text, e.g. "We do not print logos. We stamp character. Every ZEVRAN piece carries our interlocking ZR monogram." Do NOT claim a leather grade (no "full-grain" or "top-grain") anywhere.
4. Featured products: 3 or 4 column minimal grid showing product name, short material line, and price from JSON. Starter products: Wallet, Belt, Card Holder, Key Holder. Use placeholder text "[MATERIAL: confirm with supplier]" and "PKR [price TBD]".
5. Product detail template (one reusable page): image gallery with zoom, name, price, color and size selectors, honest description, care instructions, dimensions, "Order on WhatsApp" button that opens wa.me/<NUMBER> with a prefilled message including product, color, size, and quantity. Add "Request monogram" note that customized items are non-returnable.
6. Our Story: use this text: "ZEVRAN started with a simple idea: start small, but build something that lasts. Working closely with skilled manufacturers, we select and develop pieces that deserve to carry our name. Every order is a step forward. Every piece becomes part of someone's story."
7. Craftsmanship: stitching, edge finishing, hardware, logo stamping; use image placeholders and neutral text without unverified claims.
8. Order and delivery info page: how to order (WhatsApp or form), payment methods (COD and bank/JazzCash/Easypaisa as placeholders), delivery time [TBD], courier [TBD].
9. Policies page (Return and Exchange, as proposed): exchange request within 3 days of receiving the product; unused, undamaged, original packaging; ZEVRAN covers delivery/exchange cost for confirmed manufacturing defect or wrong item; no change-of-mind returns; unboxing video may be requested for damage claims; customized/monogrammed items non-returnable except where law requires; refunds via original or agreed method. Add a visible note in code comments: "Verify against Pakistani consumer-protection rules before publishing."
10. Footer: short brand line, links (Shop, Story, Craftsmanship, Policies, Contact), Instagram/Facebook/TikTok icons, WhatsApp number, copyright.
11. Optional: newsletter/waitlist email field (Formspree or Cloudflare Worker).

SEO AND TRACKING
- Unique title/meta description per page, Open Graph and Twitter cards, JSON-LD Product and Organization schema, sitemap.xml, robots.txt, clean URLs.
- Placeholders for Meta Pixel, TikTok Pixel, and Cloudflare Web Analytics, loaded only after the page is interactive.

DESIGN DETAILS
- Subtle fade-in on scroll (CSS only), no autoplay sound, no popups.
- Buttons: rectangular, small radius (2-4px), uppercase Montserrat with letter spacing.
- Thin 1px bronze divider lines. Large product images with a 4:5 ratio, consistent crop.
- Dark sections use --espresso, light sections use --ivory. Never pure black or pure white.

DELIVERABLES
- Full project folder with README: install, run, build, deploy to Cloudflare Pages (connect GitHub repo, build command "npm run build", output directory "dist").
- Instructions for replacing logo, images, WhatsApp number, prices, and materials.
- A checklist of every placeholder I must fill before launch.
- Do not invent facts, reviews, certifications, or leather-grade claims.
```

---

## PART 4: Timeline (about 14 days, part-time, lowest budget)

| Day | Task | Output |
|---|---|---|
| 1 | Confirm decisions in Part 1; buy domain; create GitHub, Cloudflare, Instagram, and WhatsApp Business accounts | Accounts ready |
| 2 | Finalize logo SVG, check ZEVRAN name/trademark availability (per brief) | Logo files |
| 3-4 | Run the master prompt; get the first working build locally | Site skeleton with placeholders |
| 5-6 | Get supplier samples photographed (natural light, plain background, texture/stitching close-ups) | 5-8 photos per product |
| 7 | Compress images; fill products.json with confirmed materials and sizes only | Real product data |
| 8 | Write policies and delivery info; check against Pakistani consumer rules | Policy text |
| 9 | Connect WhatsApp ordering and order form; test on two phones | Working order flow |
| 10 | Add SEO, analytics, pixels; test Lighthouse | Score 90+ |
| 11 | Deploy to Cloudflare Pages; connect domain; enable SSL | Live staging URL |
| 12 | Test with 5 friends: place fake orders, check mobile layout | Bug list |
| 13 | Fix bugs; final proofreading | Release candidate |
| 14 | Launch; announce on Instagram, Facebook, TikTok, WhatsApp | Public site |

After launch (per your brief): run a small test campaign, track inquiries, conversion rate, order profit, and complaints, and only then upgrade to Phase 2.

---

## PART 5: Launch checklist

- [ ] Supplier confirmed materials in writing; text matches exactly
- [ ] Real prices set from unit-economics sheet (cost, logo, packaging, delivery, fees, margin)
- [ ] WhatsApp number correct and tested
- [ ] Return and exchange policy reviewed for Pakistani law
- [ ] All placeholders removed (`[TBD]`, `[MATERIAL...]`)
- [ ] Mobile test on at least two phones
- [ ] Domain, SSL, and analytics working
- [ ] Trademark/name availability checked

---

## Notes
- Prices for domain and hosting plans change; confirm current figures on the providers' sites before paying.
- This plan keeps cost near zero until you have proven demand, in line with your brief's low-inventory approach.
