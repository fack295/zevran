/**
 * ZEVRAN Return & Exchange Policy
 * NOTE FOR SHOP OWNER:
 * Verify against Pakistani consumer-protection rules before publishing.
 * (Punjab Consumer Protection Act 2005 / Sindh Consumer Protection Act 2014)
 */

import React from 'react';
import { ShieldCheck, AlertCircle, RefreshCw, Video, FileText } from 'lucide-react';
import { ZrMonogram } from './BrandLogo';

export const PoliciesSection: React.FC = () => {
  return (
    <section id="policies" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#EBE5DB]/30 border-b hairline-espresso">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b hairline-espresso pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium block">
              Terms of Patronage
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241A15] mt-1">
              Return & Exchange Policy
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#241A15]/60 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#9A6A3A]" />
            <span>Policy Version 1.0</span>
          </div>
        </div>

        {/* Regulatory Advisory Note */}
        <div className="p-4 bg-[#F4EFE7] border border-[#9A6A3A]/40 rounded-[2px] text-xs text-[#241A15]/80 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#9A6A3A] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#241A15]">Notice on Consumer Protection:</span>
            <p className="text-[11px] leading-relaxed">
              These terms are structured for ZEVRAN&apos;s direct leather goods launch in Pakistan. In accordance with honest trade standards, genuine craft defects are rectified without fee. Please inspect your goods upon courier delivery.
            </p>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#241A15]/80 leading-relaxed font-light">
          
          {/* Section 1: Exchange Window */}
          <div className="space-y-3 bg-[#F4EFE7] p-6 rounded-[2px] border hairline-espresso">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <RefreshCw className="w-4 h-4" />
              <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">
                1. 3-Day Exchange Window
              </h3>
            </div>
            <p>
              Exchange requests must be communicated to our WhatsApp desk within <strong>3 calendar days</strong> of receiving your parcel from the courier.
            </p>
            <p>
              To qualify for an exchange, items must remain in brand new, unused condition, free from scratch marks, pocket stretching, or leather oil stains, and enclosed in original cloth packaging.
            </p>
          </div>

          {/* Section 2: Defect & Shipping Coverage */}
          <div className="space-y-3 bg-[#F4EFE7] p-6 rounded-[2px] border hairline-espresso">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">
                2. Defect & Wrong Item Guarantee
              </h3>
            </div>
            <p>
              If your item arrives with a confirmed manufacturing defect (broken hardware, loose stitching out-of-box) or an incorrect item was dispatched:
            </p>
            <p className="text-[#241A15] font-normal">
              <strong>ZEVRAN bears 100% of all return courier and replacement shipping expenses.</strong>
            </p>
          </div>

          {/* Section 3: Change of Mind */}
          <div className="space-y-3 bg-[#F4EFE7] p-6 rounded-[2px] border hairline-espresso">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <AlertCircle className="w-4 h-4" />
              <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">
                3. Change-of-Mind Disclaimer
              </h3>
            </div>
            <p>
              Because each leather piece is finished and checked by hand for individual orders, we do not entertain &ldquo;change of mind&rdquo; returns once an item has been accepted and opened.
            </p>
            <p>
              Please examine dimensions, card slot capacity, and leather descriptions carefully before placing your order.
            </p>
          </div>

          {/* Section 4: Personalized & Monogrammed Items */}
          <div className="space-y-3 bg-[#F4EFE7] p-6 rounded-[2px] border hairline-espresso">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <FileText className="w-4 h-4" />
              <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">
                4. Customized & Monogrammed Goods
              </h3>
            </div>
            <p>
              Any piece stamped with custom personal initials is permanently personalized and cannot be resold.
            </p>
            <p className="text-[#241A15] font-normal">
              Consequently, personalized items are strictly non-returnable and non-exchangeable, except in cases of confirmed structural flaws as required by consumer regulations.
            </p>
          </div>

          {/* Section 5: Unboxing Verification */}
          <div className="space-y-3 bg-[#F4EFE7] p-6 rounded-[2px] border hairline-espresso">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <Video className="w-4 h-4" />
              <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">
                5. Transit Damage & Unboxing Video
              </h3>
            </div>
            <p>
              To protect both parties against transit mishandling or courier pilferage, customers are warmly encouraged to record a brief video while unboxing the courier package.
            </p>
            <p>
              An unboxing video may be requested by our team to expedite damage claims with our courier partner.
            </p>
          </div>

          {/* Section 6: Refunds */}
          <div className="space-y-3 bg-[#F4EFE7] p-6 rounded-[2px] border hairline-espresso">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <RefreshCw className="w-4 h-4" />
              <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">
                6. Refund Processing
              </h3>
            </div>
            <p>
              Where an approved refund is determined, reimbursement will be executed via the original payment method or mutually agreed direct bank/JazzCash/Easypaisa transfer within 3–5 banking days of warehouse receipt.
            </p>
          </div>

        </div>

        {/* Contact Desk for Claims */}
        <div className="text-center pt-4">
          <p className="text-xs text-[#241A15]/70">
            For returns or exchange queries, send your order reference and unboxing media to{' '}
            <span className="font-semibold text-[#241A15]">orders@zevran.pk</span> or via WhatsApp.
          </p>
        </div>

      </div>
    </section>
  );
};
