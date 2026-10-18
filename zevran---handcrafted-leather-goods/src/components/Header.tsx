import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, MessageCircle, Menu, X, Search } from 'lucide-react';
import { BrandConfig } from '../data/brandConfig';

interface HeaderProps {
  brandConfig: BrandConfig;
  onOpenBag: () => void;
  onOpenSearch: () => void;
  bagCount: number;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandConfig,
  onOpenBag,
  onOpenSearch,
  bagCount,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop', target: 'collection' },
    { label: 'Our Story', target: 'story' },
    { label: 'Craftsmanship', target: 'craftsmanship' },
    { label: 'Delivery & COD', target: 'delivery' },
    { label: 'Policies', target: 'policies' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  const handleDirectWhatsApp = () => {
    const cleanNumber = brandConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
      'Salam ZEVRAN, I am browsing your collection and would like to inquire about ordering.'
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4EFE7]/95 backdrop-blur-md border-b hairline-espresso transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav Links) — Zone 3 (Primary Action & Utilities) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark with interlocking ZR Monogram */}
          <button
            onClick={() => handleNavClick('top')}
            className="text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A66A3F] shrink-0"
            aria-label="ZEVRAN Home"
          >
            <BrandLogo variant="header" />
          </button>

          {/* Zone 2: Navigation Links (Desktop, single line, no pills) */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.16em] font-medium text-[#241A15]/80">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className="whitespace-nowrap shrink-0 hover:text-[#A66A3F] transition-colors py-1 cursor-pointer focus:outline-none focus-visible:text-[#A66A3F]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#241A15] hover:text-[#A66A3F] transition-colors focus:outline-none"
              title="Search Collection"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Inquiry / Shopping Bag */}
            <button
              onClick={onOpenBag}
              className="relative p-2 text-[#241A15] hover:text-[#A66A3F] transition-colors focus:outline-none"
              title="Inquiry Bag"
              aria-label="View Inquiry Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {bagCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#A66A3F] text-[#F4EFE7] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {bagCount}
                </span>
              )}
            </button>

            {/* Primary Order CTA (WhatsApp) */}
            <button
              onClick={handleDirectWhatsApp}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#241A15] text-[#F4EFE7] hover:bg-[#A66A3F] transition-colors text-[11px] uppercase tracking-[0.18em] font-medium rounded-[3px] shadow-sm whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#9A6A3A]" />
              <span>Order on WhatsApp</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#241A15] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t hairline-espresso bg-[#F4EFE7] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className="text-left text-xs uppercase tracking-[0.18em] font-medium text-[#241A15] py-2 border-b hairline-espresso hover:text-[#A66A3F] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={handleDirectWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#241A15] text-[#F4EFE7] hover:bg-[#A66A3F] transition-colors text-xs uppercase tracking-[0.18em] font-medium rounded-[3px]"
            >
              <MessageCircle className="w-4 h-4 text-[#9A6A3A]" />
              <span>Order on WhatsApp</span>
            </button>
            <p className="text-[11px] text-[#241A15]/60 text-center mt-2">
              WhatsApp Support: {brandConfig.whatsappDisplay}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
