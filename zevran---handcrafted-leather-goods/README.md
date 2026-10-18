# ZEVRAN – Handcrafted Leather Goods

> **"Made to Become Yours."**  
> Understated luxury leather goods in Pakistan.

---

## 1. Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production (Cloudflare Pages / Vercel / Netlify)
npm run build
```

---

## 2. Brand Architecture & Design Tokens

- **Brand Name:** ZEVRAN
- **Tagline:** "Made to Become Yours."
- **Logo Hallmark:** Interlocking ZR Monogram (SVG component in `src/components/BrandLogo.tsx`).
- **Color Palette:**
  - `--espresso: #241A15` (Primary canvas, dark sections, typography on light)
  - `--cognac: #A66A3F` (Warm leather accent, hover highlights, links)
  - `--ivory: #F4EFE7` (Light background, editorial canvas)
  - `--bronze: #9A6A3A` (Subtle 1px dividers, debossed pin accents)
- **Typography:**
  - Headlines & Wordmark: **Cormorant Garamond** (SemiBold & Light Italic)
  - Taglines, UI, & Body: **Montserrat** (with `tracking-[0.2em]` on badges)

---

## 3. Product Catalog & Modifying Items

All product data is centralized in **`src/data/products.json`**. You can add, edit, or adjust pricing without touching the code.

```json
{
  "id": "classic-bifold-wallet",
  "name": "Classic Bifold Wallet",
  "category": "Wallets",
  "material": "[MATERIAL: confirm with supplier]",
  "materialNote": "Pending supplier specification sheet. Hand-stitched with waxed polyester thread.",
  "priceDisplay": "PKR [price TBD]",
  "provisionalPrice": 4800,
  "dimensions": "11.2 cm × 9.0 cm × 1.2 cm (Closed)",
  "colors": [
    { "id": "espresso", "name": "Espresso", "hex": "#241A15" },
    { "id": "cognac", "name": "Cognac", "hex": "#A66A3F" }
  ],
  "allowsMonogram": true
}
```

> **Strict Rule**: Do not claim "Full-Grain", "Top-Grain", or "Vegetable-Tanned" until supplier confirms in writing with documentation.

---

## 4. WhatsApp Ordering Flow

When a user clicks **"Order on WhatsApp"**, it automatically generates a pre-formatted message:

```text
Salam ZEVRAN,

I would like to place an order for the following item:
• Product: Classic Bifold Wallet
• Color: Espresso
• Quantity: 1
• Monogram Request: "HAH" (I acknowledge personalized items are non-returnable)

Customer Details:
• Name: ...
• City: Lahore
• Payment Choice: Cash on Delivery (COD)
```

To update the default WhatsApp phone number:
1. Open `src/data/brandConfig.ts`
2. Update `whatsappNumber: "923000000000"` (country code + number without plus or spaces).
3. Or open the on-site **Launch Checklist & Config** console in the website footer.

---

## 5. Return & Exchange Policy Compliance

As specified in the project brief:
- **3-day exchange window** from parcel delivery.
- Unused, undamaged, in original cloth packaging.
- **ZEVRAN covers all shipping costs** for verified manufacturing flaws or incorrect dispatch.
- Monogrammed items are non-returnable.
- *Verify against provincial consumer protection acts (Punjab Consumer Protection Act 2005 / Sindh 2014) prior to advertising.*

---

## 6. Deploying to Cloudflare Pages (Free Tier)

1. Push your repository to **GitHub**.
2. Log into the **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository.
4. Set Build settings:
   - **Framework preset:** `Vite` (or `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.
6. Cloudflare provides free SSL, global CDN, and unlimited static bandwidth.
