import React from 'react';
import { ZrMonogram } from './BrandLogo';

export const Philosophy: React.FC = () => {
  return (
    <section className="bg-[#F4EFE7] text-[#241A15] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b hairline-espresso">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Decorative monogram crest */}
        <div className="flex flex-col items-center justify-center gap-3">
          <ZrMonogram size={38} strokeColor="#241A15" />
          <div className="w-12 h-px bg-[#9A6A3A]" />
        </div>

        {/* Philosophy Lead */}
        <p className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium">
          The ZEVRAN Principle
        </p>

        {/* Large Editorial Serif Text */}
        <blockquote className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.25] text-[#241A15] text-balance">
          &ldquo;We do not print logos. We stamp character. Every ZEVRAN piece carries our interlocking ZR monogram.&rdquo;
        </blockquote>

        {/* Editorial Subtext */}
        <div className="max-w-2xl mx-auto text-sm sm:text-base text-[#241A15]/75 font-light leading-relaxed space-y-3 pt-2">
          <p>
            In a market crowded with synthetic mass production and overstated branding, we take the quieter path: purposeful proportions, resilient hand-finishing, and a form that patinas handsomely through daily use.
          </p>
          <p className="text-xs text-[#241A15]/60 italic">
            No synthetic coatings. No misleading grade claims. Every piece is selected and developed directly with dedicated leather artisans.
          </p>
        </div>

        {/* Three core pillars indicator */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left border-t hairline-espresso max-w-3xl mx-auto">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A6A3A]">01 · Form</span>
            <p className="text-xs text-[#241A15]/80">Proportions distilled to what your pocket actually needs. Nothing decorative that adds unnecessary bulk.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A6A3A]">02 · Finish</span>
            <p className="text-xs text-[#241A15]/80">Hand-burnished edges sealed with natural gum. Waxed perimeter stitching for lifetime friction resistance.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A6A3A]">03 · Honest Value</span>
            <p className="text-xs text-[#241A15]/80">Direct supplier collaboration. Transparent pricing based on true material and craft unit economics.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
