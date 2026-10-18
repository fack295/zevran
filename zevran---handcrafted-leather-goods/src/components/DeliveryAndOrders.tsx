import React from 'react';
import { MessageCircle, Truck, CreditCard, ShieldAlert, ArrowRight } from 'lucide-react';
import { BrandConfig } from '../data/brandConfig';

interface DeliveryAndOrdersProps {
  brandConfig: BrandConfig;
  onOpenQuickCheckout: () => void;
}

export const DeliveryAndOrders: React.FC<DeliveryAndOrdersProps> = ({
  brandConfig,
  onOpenQuickCheckout,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Select & Personalize',
      desc: 'Browse our four launch essentials. Choose your leather shade and specify up to 3 custom initials for blind deboss monogramming if desired.',
    },
    {
      step: '02',
      title: 'Initiate Order',
      desc: 'Click "Order on WhatsApp" to open a pre-filled chat with your selected item, color, and monogram, or submit directly via our quick Cash on Delivery form.',
    },
    {
      step: '03',
      title: 'Atelier Confirmation',
      desc: 'Our team confirms piece availability, verifies your delivery address, and provides your official order reference code.',
    },
    {
      step: '04',
      title: 'Dispatched to Your Door',
      desc: `Dispatched via ${brandConfig.courierPartners}. Standard delivery takes ${brandConfig.deliveryTimeDays} anywhere across Pakistan.`,
    },
  ];

  return (
    <section id="delivery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] border-b hairline-espresso">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium block">
            Nationwide Logistics
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241A15]">
            Ordering & Delivery
          </h2>
          <p className="text-sm text-[#241A15]/75 font-light leading-relaxed">
            We operate an intimate, direct-to-patron ordering system. No confusing accounts, slow checkout forms, or payment gateway fees.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st) => (
            <div
              key={st.step}
              className="bg-[#EBE5DB]/30 border hairline-espresso p-6 rounded-[2px] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="font-mono text-sm text-[#9A6A3A] font-semibold">{st.step}</span>
                <h3 className="font-serif-luxury text-xl font-normal text-[#241A15]">{st.title}</h3>
                <p className="text-xs text-[#241A15]/75 leading-relaxed font-light">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods & Courier Info Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Cash on Delivery */}
          <div className="bg-[#EBE5DB]/50 border hairline-espresso p-6 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <Truck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.16em] font-semibold">Method 01</span>
            </div>
            <h4 className="font-serif-luxury text-2xl text-[#241A15] font-normal">Cash on Delivery (COD)</h4>
            <p className="text-xs text-[#241A15]/80 font-light leading-relaxed">
              Available across all major cities and towns in Pakistan. Pay the courier representative in cash upon hand delivery of your package.
            </p>
            <div className="pt-2 text-[11px] text-[#241A15]/60 font-mono">
              Flat delivery: PKR {brandConfig.shippingFlatRatePKR} · Free on orders over PKR {brandConfig.freeShippingThresholdPKR.toLocaleString()}
            </div>
          </div>

          {/* Card 2: Digital & Bank Transfer */}
          <div className="bg-[#EBE5DB]/50 border hairline-espresso p-6 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-[#9A6A3A]">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.16em] font-semibold">Method 02</span>
            </div>
            <h4 className="font-serif-luxury text-2xl text-[#241A15] font-normal">Bank Transfer & Mobile Wallets</h4>
            <p className="text-xs text-[#241A15]/80 font-light leading-relaxed">
              Prefer paperless payment? We accept direct transfers via Raast, Meezan Bank, HBL, Bank Alfalah, JazzCash, and Easypaisa. Account details provided upon WhatsApp order confirmation.
            </p>
            <div className="pt-2 text-[11px] text-[#241A15]/60 font-mono">
              Instant receipt verification via WhatsApp screenshot
            </div>
          </div>

          {/* Card 3: Direct WhatsApp Action */}
          <div className="bg-[#241A15] text-[#F4EFE7] p-6 rounded-[2px] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#9A6A3A]">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.16em] font-semibold">Priority Concierge</span>
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#F4EFE7] font-normal">Need Custom Assistance?</h4>
              <p className="text-xs text-[#F4EFE7]/80 font-light leading-relaxed">
                Connect directly with our workshop desk on WhatsApp. We answer sizing questions, monogram placement, and delivery queries within minutes.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#A66A3F] hover:bg-[#F4EFE7] hover:text-[#241A15] text-[#F4EFE7] transition-colors rounded-[2px] text-xs uppercase tracking-[0.18em] font-medium"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
