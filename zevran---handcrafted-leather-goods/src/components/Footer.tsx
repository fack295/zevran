import React, { useState } from 'react';
import { BrandLogo, ZrMonogram } from './BrandLogo';
import { BrandConfig } from '../data/brandConfig';
import { MessageCircle, Mail, ArrowRight, Instagram, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  brandConfig: BrandConfig;
  onNavigate: (sectionId: string) => void;
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandConfig,
  onNavigate,
  onOpenChecklist,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#241A15] text-[#F4EFE7] pt-20 pb-12 border-t border-[#9A6A3A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Tier: Newsletter / Waitlist & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b hairline-ivory items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-6 space-y-4">
            <BrandLogo variant="footer" inverted />
            <p className="text-xs sm:text-sm text-[#F4EFE7]/70 font-light leading-relaxed max-w-md pt-2">
              Considered design and honest materials, made for people who value structure over loud trends. Handcrafted with restraint in Pakistan.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#9A6A3A] pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Synthetic Fillers</span>
              </span>
              <span>·</span>
              <span>Direct WhatsApp Ordering</span>
            </div>
          </div>

          {/* Waitlist Subscription */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] uppercase tracking-tagline text-[#9A6A3A] font-semibold block">
              The Atelier Journal
            </span>
            <h4 className="font-serif-luxury text-2xl text-[#F4EFE7] font-normal">
              Receive New Batch & Leather Drop Notifications
            </h4>
            <p className="text-xs text-[#F4EFE7]/65 font-light leading-relaxed">
              We release pieces in small, numbered workshop batches. Enter your email for first notification before general release.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#A66A3F]/20 border border-[#9A6A3A]/40 text-xs text-[#F4EFE7] rounded-[2px]">
                ✓ You are on the priority dispatch list. Thank you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-[#F4EFE7]/10 text-[#F4EFE7] placeholder-[#F4EFE7]/40 border hairline-ivory focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F4EFE7] text-[#241A15] hover:bg-[#A66A3F] hover:text-[#F4EFE7] transition-colors text-xs uppercase tracking-[0.16em] font-medium rounded-[2px] cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Tier: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: Shop */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A6A3A] block">
              Collection
            </span>
            <ul className="space-y-2 text-[#F4EFE7]/70">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Classic Bifold Wallet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Structured Leather Belt
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Minimalist Card Holder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Loop Key Holder
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Brand & Craft */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A6A3A] block">
              The Brand
            </span>
            <ul className="space-y-2 text-[#F4EFE7]/70">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craftsmanship')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Craftsmanship Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craftsmanship')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Custom Monogramming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('top')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  The ZR Hallmark
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Orders & Terms */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A6A3A] block">
              Patron Services
            </span>
            <ul className="space-y-2 text-[#F4EFE7]/70">
              <li>
                <button
                  onClick={() => onNavigate('delivery')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Nationwide Delivery & COD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Manufacturing Defect Coverage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('delivery')}
                  className="hover:text-[#F4EFE7] transition-colors cursor-pointer text-left"
                >
                  Payment Methods
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Channels */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A6A3A] block">
              Connect
            </span>
            <div className="space-y-2 text-[#F4EFE7]/70">
              <a
                href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#9A6A3A] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#9A6A3A]" />
                <span>WhatsApp: {brandConfig.whatsappDisplay}</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9A6A3A]" />
                <span>{brandConfig.email}</span>
              </div>
              
              {/* Social links */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://instagram.com/${brandConfig.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border hairline-ivory rounded-full hover:border-[#9A6A3A] hover:text-[#9A6A3A] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://facebook.com/${brandConfig.facebookHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border hairline-ivory rounded-full hover:border-[#9A6A3A] hover:text-[#9A6A3A] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://tiktok.com/@${brandConfig.tiktokHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border hairline-ivory rounded-full hover:border-[#9A6A3A] hover:text-[#9A6A3A] transition-colors"
                  aria-label="TikTok"
                >
                  <span className="text-[10px] font-bold">TT</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Copyright, Launch Mode & Store Owner Controls */}
        <div className="pt-8 border-t hairline-ivory flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F4EFE7]/50 gap-4">
          <div className="flex items-center gap-2">
            <ZrMonogram size={16} strokeColor="#9A6A3A" />
            <span>© {new Date().getFullYear()} ZEVRAN Leather House. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#9A6A3A]/80">Phase 1 Direct Launch Edition</span>
            <span>·</span>
            <button
              onClick={onOpenChecklist}
              className="text-[#9A6A3A] hover:text-[#F4EFE7] underline underline-offset-2 transition-colors cursor-pointer font-medium"
            >
              Launch Checklist & Config
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
