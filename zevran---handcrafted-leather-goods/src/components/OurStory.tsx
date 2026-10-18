import React from 'react';
import { ZrMonogram } from './BrandLogo';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="bg-[#241A15] text-[#F4EFE7] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#9A6A3A]/30">
      
      {/* Subtle background ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A66A3F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center md:text-left">
        
        {/* Top Kicker */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between border-b hairline-ivory pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium block">
              The Genesis
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F4EFE7] mt-1">
              Our Story
            </h2>
          </div>
          <ZrMonogram size={36} strokeColor="#F4EFE7" />
        </div>

        {/* The Exact Core Story Text from Brief */}
        <div className="space-y-6">
          <p className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.3] text-[#F4EFE7] text-balance">
            &ldquo;ZEVRAN started with a simple idea: start small, but build something that lasts. Working closely with skilled manufacturers, we select and develop pieces that deserve to carry our name. Every order is a step forward. Every piece becomes part of someone&apos;s story.&rdquo;
          </p>
        </div>

        {/* Narrative Expansion (Consistent with Part 1 & 2 of brief) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#F4EFE7]/75 font-light leading-relaxed pt-4 border-t hairline-ivory">
          <p>
            We choose not to rush into mass production or inflate claims. Every prototype is carried, stressed, and reviewed for stitch tension, edge stability, and pocket feel before a single piece is offered to our patrons.
          </p>
          <p>
            By working directly with master artisans in Pakistan and utilizing on-demand direct ordering, we eliminate intermediate warehouse markups and respect the honest value of leathercraft.
          </p>
        </div>

        {/* Quote attribution */}
        <div className="pt-2 text-center md:text-left">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6A3A]">
            ZEVRAN Leather House
          </div>
          <div className="text-[11px] text-[#F4EFE7]/50 mt-0.5 tracking-wider">
            Pakistan · Founded on Restraint
          </div>
        </div>

      </div>
    </section>
  );
};
