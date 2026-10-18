import React from 'react';
import { ArrowDown, ChevronRight, ShieldCheck } from 'lucide-react';
import { ZrMonogram } from './BrandLogo';

interface HeroProps {
  onExploreClick: () => void;
  onOpenStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenStory }) => {
  return (
    <section className="relative bg-[#241A15] text-[#F4EFE7] overflow-hidden border-b border-[#9A6A3A]/30">
      {/* Background subtle noise / tactile lighting gradient */}
      <div className="absolute inset-0 bg-radial from-[#A66A3F]/10 via-transparent to-transparent pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Main 2-column editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & CTA */}
          <div className="lg:col-span-6 space-y-8 z-10">
            {/* Minimal Brand Monogram Lockup */}
            <div className="flex items-center gap-3">
              <ZrMonogram size={24} strokeColor="#F4EFE7" />
              <span className="text-[11px] uppercase tracking-tagline text-[#9A6A3A] font-semibold">
                ZEVRAN · Made to Become Yours
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F4EFE7] text-balance">
                THE ART OF <br />
                <span className="italic font-light text-[#F4EFE7]/90">RESTRAINT.</span>
              </h1>
              <div className="w-16 h-px bg-[#9A6A3A]/60" />
            </div>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-[#F4EFE7]/80 font-light leading-relaxed max-w-xl">
              Considered design and honest materials, made for people who value structure over loud trends.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-8 py-3.5 bg-[#F4EFE7] text-[#241A15] hover:bg-[#A66A3F] hover:text-[#F4EFE7] transition-colors text-xs uppercase tracking-[0.2em] font-medium rounded-[3px] text-center cursor-pointer shadow-sm"
              >
                Explore The Collection
              </button>

              <button
                onClick={onOpenStory}
                className="px-6 py-3.5 border border-[#F4EFE7]/25 text-[#F4EFE7] hover:border-[#9A6A3A] hover:text-[#9A6A3A] transition-colors text-xs uppercase tracking-[0.2em] font-medium rounded-[3px] text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Our Story</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#9A6A3A]" />
              </button>
            </div>

            {/* Reassurance notes (Truth in materials, no unverified claims) */}
            <div className="pt-6 border-t hairline-ivory grid grid-cols-2 gap-4 text-xs text-[#F4EFE7]/70">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A6A3A] mt-1.5 shrink-0" />
                <span>Hand-stitched durability with reinforced stress points.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A6A3A] mt-1.5 shrink-0" />
                <span>WhatsApp direct ordering with Cash on Delivery in Pakistan.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with extreme close-up + product showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back card: Macro stitching close-up */}
              <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#9A6A3A]/40 shadow-2xl">
                <img
                  src="/src/assets/images/hero_leather_craft_1792356245605.jpg"
                  alt="Close-up of heavy waxed thread saddle stitching on rich espresso leather"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-[#F4EFE7]/85 tracking-[0.16em] uppercase">
                  <span>Macro Texture & Saddle Stitch</span>
                  <span className="text-[#9A6A3A]">Ref. Z-01</span>
                </div>
              </div>

              {/* Overlapping Floating Inset: Bifold Wallet Product Shot */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-2/3 max-w-[280px] aspect-[4/3] rounded-[2px] overflow-hidden border border-[#9A6A3A]/60 shadow-2xl bg-[#241A15] hidden sm:block">
                <img
                  src="/src/assets/images/product_bifold_wallet_1792356245418.jpg"
                  alt="ZEVRAN Classic Bifold Wallet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-2 left-3 right-3 text-[10px] uppercase tracking-[0.18em] text-[#F4EFE7]/90 font-medium">
                  Classic Bifold
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="border-t hairline-ivory py-3 text-center">
        <button
          onClick={onExploreClick}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#F4EFE7]/60 hover:text-[#9A6A3A] transition-colors cursor-pointer"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
