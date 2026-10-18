import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ProductItem } from './ProductGrid';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [term, setTerm] = useState('');

  const matches = products.filter(
    (p) =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.category.toLowerCase().includes(term.toLowerCase()) ||
      p.tagline.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="w-full max-w-2xl bg-[#F4EFE7] text-[#241A15] rounded-[3px] border hairline-espresso shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b hairline-espresso gap-3">
          <Search className="w-5 h-5 text-[#9A6A3A] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search wallets, belts, card holders, key holders..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#241A15] placeholder-[#241A15]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#241A15]/60 hover:text-[#241A15] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6 divide-y hairline-espresso">
          {matches.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#241A15]/60">
              No leather goods matching &ldquo;{term}&rdquo;.
            </div>
          ) : (
            matches.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 px-2 flex items-center justify-between hover:bg-[#EBE5DB]/50 rounded-[2px] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded-[2px] bg-[#EBE5DB]"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9A6A3A] font-semibold">
                      {product.category}
                    </span>
                    <h4 className="font-serif-luxury text-lg text-[#241A15] group-hover:text-[#A66A3F] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono text-[#241A15]/70">
                      {product.priceDisplay}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#9A6A3A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
