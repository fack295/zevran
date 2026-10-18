import React from 'react';
import { ZrMonogram } from './BrandLogo';

export const Craftsmanship: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Perimeter Stitching',
      lead: 'Waxed Thread Tension',
      body: 'Every edge is bound with heavy-gauge polyester thread, pre-waxed to seal needle penetrations against humidity. Tension is calibrated to ensure stitches sink flush into the leather channel, eliminating premature pocket wear.',
    },
    {
      num: '02',
      title: 'Edge Finishing',
      lead: 'Hand-Burnished & Sealed',
      body: 'Raw cuts are sequentially bevelled, sanded, and hand-burnished using natural gums and carnauba wax. This forms a smooth, dense edge that resists delamination without resorting to thick rubberised paints that crack.',
    },
    {
      num: '03',
      title: 'Solid Hardware',
      lead: 'Brass & Bronze Metallurgy',
      body: 'Our key clips and belt buckles are cast in dense brass and bronze alloys. No hollow pot metals or electroplated plastics. The finish is lightly brushed to develop a natural organic patina in tandem with the hide.',
    },
    {
      num: '04',
      title: 'Character Stamping',
      lead: 'Blind Debossed ZR Monogram',
      body: 'We reject plastic-coated foil prints that peel within months. Our interlocking ZR monogram is applied using heat and calibrated hydraulic pressure, creating an indelible tactile indentation that belongs to the leather.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-b hairline-espresso">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium block">
            The Atelier Standards
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241A15]">
            Craftsmanship in Detail
          </h2>
          <p className="text-sm text-[#241A15]/75 font-light leading-relaxed">
            True luxury is not defined by excess, but by what endures. We prioritize structural longevity over fast cosmetic shortcuts.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-[#EBE5DB]/40 border hairline-espresso p-6 sm:p-7 rounded-[2px] flex flex-col justify-between space-y-6 hover:border-[#9A6A3A] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b hairline-espresso pb-3">
                  <span className="font-mono text-xs text-[#9A6A3A] font-semibold tracking-wider">
                    {pillar.num}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9A6A3A]" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#241A15] font-normal">
                    {pillar.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#A66A3F] block mt-0.5">
                    {pillar.lead}
                  </span>
                </div>
                <p className="text-xs text-[#241A15]/80 leading-relaxed font-light">
                  {pillar.body}
                </p>
              </div>

              <div className="pt-4 border-t hairline-espresso flex items-center justify-between text-[10px] text-[#241A15]/50 uppercase tracking-widest">
                <span>Atelier Standard</span>
                <span>Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Callout Banner */}
        <div className="relative rounded-[2px] overflow-hidden border hairline-espresso bg-[#241A15] text-[#F4EFE7] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[#9A6A3A]">
                <ZrMonogram size={20} strokeColor="#9A6A3A" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                  Personal Monogramming Available
                </span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#F4EFE7]">
                Make Every Piece Unmistakably Yours
              </h3>
              <p className="text-xs sm:text-sm text-[#F4EFE7]/80 font-light leading-relaxed max-w-2xl">
                Have your initials heat-stamped directly beside the ZR hallmark on any wallet, card holder, or key fob. Custom monograms are debossed individually by hand.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="border border-[#9A6A3A]/50 px-6 py-4 rounded-[2px] text-center bg-[#241A15]/60 backdrop-blur-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A6A3A] block">Sample Deboss</span>
                <span className="font-serif-luxury text-3xl font-normal tracking-[0.25em] text-[#F4EFE7] block mt-1">
                  [ H · A · H ]
                </span>
                <span className="text-[9px] text-[#F4EFE7]/50 block mt-1">Available at checkout</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
