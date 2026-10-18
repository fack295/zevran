import React, { useState, useEffect } from 'react';
import productsData from './data/products.json';
import { defaultBrandConfig, BrandConfig } from './data/brandConfig';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ProductGrid, ProductItem } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OurStory } from './components/OurStory';
import { Craftsmanship } from './components/Craftsmanship';
import { DeliveryAndOrders } from './components/DeliveryAndOrders';
import { PoliciesSection } from './components/PoliciesSection';
import { Footer } from './components/Footer';
import { CheckoutDrawer, BagItem } from './components/CheckoutDrawer';
import { SearchModal } from './components/SearchModal';
import { LaunchChecklistModal } from './components/LaunchChecklistModal';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const products: ProductItem[] = productsData as unknown as ProductItem[];

  // Brand Configuration with localStorage persistence
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem('zevran_brand_config');
      return saved ? JSON.parse(saved) : defaultBrandConfig;
    } catch {
      return defaultBrandConfig;
    }
  });

  // Inquiry / Shopping Bag items
  const [bagItems, setBagItems] = useState<BagItem[]>(() => {
    try {
      const saved = localStorage.getItem('zevran_bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Modals & Views
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('zevran_bag', JSON.stringify(bagItems));
    } catch {
      // LocalStorage fallback
    }
  }, [bagItems]);

  const handleUpdateBrandConfig = (updated: BrandConfig) => {
    setBrandConfig(updated);
    try {
      localStorage.setItem('zevran_brand_config', JSON.stringify(updated));
    } catch {
      // LocalStorage fallback
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToBag = (item: {
    product: ProductItem;
    color: string;
    size: string;
    quantity: number;
    monogram: string;
  }) => {
    const existingIndex = bagItems.findIndex(
      (b) =>
        b.productId === item.product.id &&
        b.color === item.color &&
        b.size === item.size &&
        b.monogram === item.monogram
    );

    if (existingIndex > -1) {
      setBagItems((prev) =>
        prev.map((b, idx) =>
          idx === existingIndex ? { ...b, quantity: b.quantity + item.quantity } : b
        )
      );
    } else {
      const newItem: BagItem = {
        id: `${item.product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: item.product.id,
        name: item.product.name,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        provisionalPrice: item.product.provisionalPrice,
        priceDisplay: item.product.priceDisplay,
        monogram: item.monogram,
        image: item.product.image,
      };
      setBagItems((prev) => [...prev, newItem]);
    }

    showToast(`Added ${item.product.name} to inquiry bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setBagItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const handleQuickCheckout = (item: {
    product: ProductItem;
    color: string;
    size: string;
    quantity: number;
    monogram: string;
  }) => {
    handleAddToBag(item);
    setSelectedProduct(null);
    setIsBagOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalBagCount = bagItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div id="top" className="min-h-screen bg-[#F4EFE7] text-[#241A15] flex flex-col font-sans-luxury">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#241A15] text-[#F4EFE7] px-5 py-2.5 rounded-[2px] border border-[#9A6A3A] text-xs uppercase tracking-wider shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <Header
        brandConfig={brandConfig}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        bagCount={totalBagCount}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onExploreClick={() => handleNavigate('collection')}
          onOpenStory={() => handleNavigate('story')}
        />

        {/* Philosophy Section */}
        <Philosophy />

        {/* Featured Products Grid */}
        <ProductGrid
          products={products}
          brandConfig={brandConfig}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickOrder={(p) => {
            setSelectedProduct(p);
          }}
          searchQuery={searchFilter}
        />

        {/* Our Story Section */}
        <OurStory />

        {/* Craftsmanship Pillars */}
        <Craftsmanship />

        {/* Delivery & Payment Section */}
        <DeliveryAndOrders
          brandConfig={brandConfig}
          onOpenQuickCheckout={() => setIsBagOpen(true)}
        />

        {/* Return & Exchange Policies */}
        <PoliciesSection />
      </main>

      {/* Footer */}
      <Footer
        brandConfig={brandConfig}
        onNavigate={handleNavigate}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Floating WhatsApp Quick Action on Mobile / Small screens */}
      <aside aria-label="WhatsApp Direct Ordering" className="fixed bottom-5 right-5 z-40">
        <a
          href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            'Salam ZEVRAN, I am inquiring about your leather goods collection.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-3 bg-[#241A15] text-[#F4EFE7] border border-[#9A6A3A] hover:bg-[#A66A3F] transition-all rounded-full shadow-2xl group cursor-pointer"
          title="Direct WhatsApp Support"
          aria-label="Direct WhatsApp Support"
        >
          <MessageCircle className="w-5 h-5 text-[#9A6A3A] group-hover:text-[#F4EFE7] transition-colors" />
          <span className="text-xs uppercase tracking-[0.14em] font-medium pr-1 hidden sm:inline">
            WhatsApp Desk
          </span>
        </a>
      </aside>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        brandConfig={brandConfig}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
        onOpenQuickCheckout={handleQuickCheckout}
      />

      {/* Checkout & Inquiry Bag Drawer */}
      <CheckoutDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        brandConfig={brandConfig}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Founder Launch Checklist & Unit Economics Modal */}
      <LaunchChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        brandConfig={brandConfig}
        onUpdateBrandConfig={handleUpdateBrandConfig}
      />

    </div>
  );
}
