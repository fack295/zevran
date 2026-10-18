# ZEVRAN Premium Leather Goods Website

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies

## Development

Run `npm run dev` to start the Astro development server.

## Build

Run `npm run build` to build the static site.

## Deploy

Deploy the contents of the `dist` directory to Cloudflare Pages.

Connect your GitHub repository to Cloudflare Pages with:
- Build command: `npm run build`
- Output directory: `dist`

## Placeholders to Replace Before Launch

- Logo SVG in `src/components/Header.astro` (ZR monogram)
- WhatsApp number in header, footer, and product order links
- Product images in `public/images/products/`
- Leather texture and product shot images in hero
- Product prices and materials in `src/data/products.json`
- Delivery time and courier info in `src/pages/order-info.astro`

## Notes

- Verify policies against Pakistani consumer-protection rules before publishing.
- Ensure all images use WebP/AVIF formats and have width/height attributes.
- Check accessibility and performance with Lighthouse.
