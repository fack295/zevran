import React, { useState } from 'react';
import { MessageCircle, Eye, ArrowUpRight } from 'lucide-react';
import { BrandConfig, buildWhatsAppLink } from '../data/brandConfig';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  material: string;
  materialNote: string;
  priceDisplay: string;
  provisionalPrice: number;
  featured: boolean;
  tagline: string;
  description: string;
  dimensions: string;
  weight: string;
  sizes: string[];
  colors: { id: string; name: string; hex: string }[];
  image: string;
  detailImage?: string;
  allowsMonogram: boolean;
  careInstructions: string;
  specs: { label: string; value: string }[];
}

interface ProductGridProps {
  products: ProductItem[];
  brandConfig: BrandConfig;
  onSelectProduct: (product: ProductItem) => void;
  onQuickOrder: (product: ProductItem) => void;
  searchQuery?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  brandConfig,
  onSelectProduct,
  onQuickOrder,
  searchQuery = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({});

  const categories = ['All', 'Wallets', 'Belts', 'Card Holders', 'Key Holders'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleColorSelect = (productId: string, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColorMap((prev) => ({ ...prev, [productId]: colorName }));
  };

  const handleDirectWhatsApp = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenColor = selectedColorMap[product.id] || product.colors[0]?.name || 'Standard';
    const chosenSize = product.sizes[0] || 'Standard';
    const url = buildWhatsAppLink(brandConfig.whatsappNumber, {
      name: product.name,
      color: chosenColor,
      size: chosenSize,
      quantity: 1,
      priceDisplay: product.priceDisplay,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b hairline-espresso gap-6">
        <div>
          <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium">
            Core Essentials · 01 Launch
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#241A15] mt-1 font-normal">
            The Initial Collection
          </h2>
          <p className="text-xs text-[#241A15]/70 mt-2 max-w-xl">
            Four foundational pieces engineered with restraint. Honest materials with no synthetic coatings, crafted to age alongside you.
          </p>
        </div>

        {/* Category Filters (interactive segmented tabs with clean styling) */}
        <div className="flex items-center flex-wrap gap-1 bg-[#241A15]/5 p-1 rounded-[3px] border hairline-espresso self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.12em] font-medium rounded-[2px] transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#241A15] text-[#F4EFE7] shadow-xs'
                  : 'text-[#241A15]/70 hover:text-[#241A15]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products (4 columns on lg, 2 on sm) */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-[#241A15]/60">
          <p className="text-sm">No items found matching &ldquo;{searchQuery}&rdquo;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const activeColorName = selectedColorMap[product.id] || product.colors[0]?.name;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-[#F4EFE7] border hairline-espresso hover:border-[#9A6A3A] transition-all duration-300 rounded-[2px] overflow-hidden cursor-pointer shadow-xs hover:shadow-md"
              >
                {/* Product Image Box (4:5 consistent aspect ratio) */}
                <div className="relative aspect-[4/5] bg-[#EBE5DB] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top Category Tag (Unboxed, clean metadata) */}
                  <div className="absolute top-3 left-3 text-[10px] tracking-[0.16em] uppercase font-semibold text-[#241A15]/70 bg-[#F4EFE7]/85 backdrop-blur-xs px-2 py-0.5 rounded-[2px]">
                    {product.category}
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="flex-1 py-2 px-2 bg-[#F4EFE7] text-[#241A15] text-[10px] uppercase tracking-[0.16em] font-medium rounded-[2px] flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#241A15] hover:text-[#F4EFE7] transition-colors"
                      title="Inspect Specifications"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={(e) => handleDirectWhatsApp(product, e)}
                      className="p-2 bg-[#241A15] text-[#F4EFE7] rounded-[2px] shadow-sm hover:bg-[#A66A3F] transition-colors"
                      title="Direct WhatsApp Order"
                      aria-label="Order on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#9A6A3A]" />
                    </button>
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {product.colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={(e) => handleColorSelect(product.id, color.name, e)}
                          title={color.name}
                          className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                            activeColorName === color.name
                              ? 'ring-1 ring-[#9A6A3A] scale-110 border-[#F4EFE7]'
                              : 'border-black/20 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                      <span className="text-[10px] text-[#241A15]/60 ml-1.5 capitalize">
                        {activeColorName}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif-luxury text-xl font-normal text-[#241A15] group-hover:text-[#A66A3F] transition-colors flex items-center justify-between">
                      <span>{product.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#9A6A3A]" />
                    </h3>

                    {/* Material Line strictly compliant with brief: No unverified grade claim */}
                    <p className="text-[11px] text-[#9A6A3A] font-medium tracking-wide mt-1">
                      {product.material}
                    </p>

                    {/* Short Tagline */}
                    <p className="text-xs text-[#241A15]/70 font-light mt-1.5 line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Price & Primary WhatsApp Buy */}
                  <div className="pt-3 border-t hairline-espresso flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#241A15] font-mono tabular-nums">
                        {product.priceDisplay}
                      </span>
                      <span className="block text-[9px] text-[#241A15]/50 uppercase tracking-wider">
                        Est. PKR {product.provisionalPrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickOrder(product);
                      }}
                      className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#A66A3F] hover:text-[#241A15] transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Order
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
