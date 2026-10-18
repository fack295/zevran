import React, { useState } from 'react';
import { X, MessageCircle, Shield, Check, ZoomIn, Info, Truck } from 'lucide-react';
import { ProductItem } from './ProductGrid';
import { BrandConfig, buildWhatsAppLink } from '../data/brandConfig';
import { ZrMonogram } from './BrandLogo';

interface ProductDetailModalProps {
  product: ProductItem | null;
  brandConfig: BrandConfig;
  onClose: () => void;
  onAddToBag: (item: {
    product: ProductItem;
    color: string;
    size: string;
    quantity: number;
    monogram: string;
  }) => void;
  onOpenQuickCheckout: (item: {
    product: ProductItem;
    color: string;
    size: string;
    quantity: number;
    monogram: string;
  }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  brandConfig,
  onClose,
  onAddToBag,
  onOpenQuickCheckout,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [monogram, setMonogram] = useState('');
  const [activeImage, setActiveImage] = useState<'main' | 'detail'>('main');
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentImg = activeImage === 'main' ? product.image : (product.detailImage || product.image);

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppLink(brandConfig.whatsappNumber, {
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      priceDisplay: product.priceDisplay,
      monogram: monogram.trim(),
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddInquiryBag = () => {
    onAddToBag({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
      monogram: monogram.trim(),
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleQuickCheckoutClick = () => {
    onOpenQuickCheckout({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
      monogram: monogram.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Modal Card */}
      <div className="relative bg-[#F4EFE7] text-[#241A15] w-full max-w-4xl rounded-[3px] border hairline-espresso shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b hairline-espresso bg-[#F4EFE7]">
          <div className="flex items-center gap-2">
            <ZrMonogram size={20} strokeColor="#241A15" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#241A15]/70">
              ZEVRAN · Specification & Order
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#241A15]/60 hover:text-[#241A15] transition-colors cursor-pointer rounded-sm"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Gallery Column (Sticky left on desktop) */}
            <div className="md:col-span-6 space-y-4">
              {/* Primary Image with zoom toggle */}
              <div
                className="relative aspect-[4/5] bg-[#EBE5DB] rounded-[2px] overflow-hidden border hairline-espresso cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={currentImg}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                />
                
                <div className="absolute bottom-3 right-3 bg-[#241A15]/80 text-[#F4EFE7] text-[10px] uppercase tracking-wider px-2 py-1 rounded-[2px] flex items-center gap-1 backdrop-blur-xs">
                  <ZoomIn className="w-3 h-3" />
                  <span>{isZoomed ? 'Click to reset' : 'Click to inspect'}</span>
                </div>

                <div className="absolute top-3 left-3 bg-[#F4EFE7]/90 text-[#241A15] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-[2px] font-medium">
                  {product.category}
                </div>
              </div>

              {/* Thumbnail selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActiveImage('main');
                    setIsZoomed(false);
                  }}
                  className={`aspect-[4/3] rounded-[2px] overflow-hidden border text-left p-1 transition-all ${
                    activeImage === 'main'
                      ? 'border-[#9A6A3A] ring-1 ring-[#9A6A3A]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.image}
                    alt="Overview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="text-[9px] uppercase tracking-wider text-[#241A15]/70 block mt-1">Overview</span>
                </button>

                {product.detailImage && (
                  <button
                    onClick={() => {
                      setActiveImage('detail');
                      setIsZoomed(false);
                    }}
                    className={`aspect-[4/3] rounded-[2px] overflow-hidden border text-left p-1 transition-all ${
                      activeImage === 'detail'
                        ? 'border-[#9A6A3A] ring-1 ring-[#9A6A3A]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={product.detailImage}
                      alt="Texture & Stitching"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="text-[9px] uppercase tracking-wider text-[#241A15]/70 block mt-1">Stitching Detail</span>
                  </button>
                )}
              </div>

              {/* Transparent Supplier Note */}
              <div className="bg-[#EBE5DB]/60 p-3.5 rounded-[2px] border hairline-espresso text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#9A6A3A] font-semibold uppercase text-[10px] tracking-wider">
                  <Info className="w-3.5 h-3.5" />
                  <span>Material Integrity Protocol</span>
                </div>
                <p className="text-[11px] text-[#241A15]/80 leading-relaxed">
                  {product.materialNote}
                </p>
              </div>
            </div>

            {/* Product Details & Purchase Form Column */}
            <div className="md:col-span-6 space-y-6">
              
              {/* Title & Pricing */}
              <div>
                <span className="text-[11px] uppercase tracking-tagline text-[#9A6A3A] font-medium">
                  Ref. ZR-{product.id.slice(0, 4).toUpperCase()}
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#241A15] font-normal mt-1">
                  {product.name}
                </h2>
                
                {/* Price block */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-semibold text-[#241A15] tabular-nums">
                    {product.priceDisplay}
                  </span>
                  <span className="text-xs text-[#241A15]/60">
                    (Provisional launch unit cost: PKR {product.provisionalPrice.toLocaleString()})
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#241A15]/80 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#241A15]">
                  Select Color: <span className="font-semibold text-[#A66A3F]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] border text-xs cursor-pointer transition-all ${
                        selectedColor === color.name
                          ? 'border-[#241A15] bg-[#241A15] text-[#F4EFE7]'
                          : 'border-[#241A15]/20 bg-transparent text-[#241A15]/80 hover:border-[#241A15]/50'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (if product has multiple sizes) */}
              {product.sizes.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#241A15]">
                      Select Waist Size
                    </label>
                    <span className="text-[10px] text-[#241A15]/50">Measured to center hole</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-mono rounded-[2px] border text-center transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-[#241A15] bg-[#241A15] text-[#F4EFE7]'
                            : 'border-[#241A15]/20 bg-[#F4EFE7] text-[#241A15] hover:border-[#9A6A3A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Monogram Customization */}
              {product.allowsMonogram && (
                <div className="space-y-2 p-3.5 bg-[#EBE5DB]/50 rounded-[2px] border hairline-espresso">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#241A15] flex items-center gap-1.5">
                      <span>Request Monogram</span>
                      <span className="text-[10px] text-[#9A6A3A] font-normal">(Optional · Max 3 letters)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. HAH or ZR"
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 text-sm bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] font-mono tracking-widest uppercase rounded-[2px]"
                  />
                  <p className="text-[10px] text-[#241A15]/65 leading-normal">
                    *Note: Customized and monogrammed items are non-returnable except where applicable consumer law mandates for manufacturing defects.
                  </p>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#241A15]">
                  Quantity
                </span>
                <div className="flex items-center border hairline-espresso rounded-[2px] bg-[#F4EFE7]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-mono hover:bg-[#241A15]/10 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-medium tabular-nums min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-mono hover:bg-[#241A15]/10 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* Primary WhatsApp Order CTA */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 bg-[#241A15] text-[#F4EFE7] hover:bg-[#A66A3F] transition-colors rounded-[3px] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#9A6A3A]" />
                  <span>Order on WhatsApp (Direct)</span>
                </button>

                {/* Secondary: Quick COD Order / Inquiry Bag */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleQuickCheckoutClick}
                    className="py-2.5 px-3 border border-[#241A15] text-[#241A15] hover:bg-[#241A15] hover:text-[#F4EFE7] transition-colors rounded-[3px] text-[11px] uppercase tracking-[0.16em] font-medium cursor-pointer text-center"
                  >
                    Quick COD Order
                  </button>

                  <button
                    onClick={handleAddInquiryBag}
                    className="py-2.5 px-3 border hairline-espresso bg-[#EBE5DB]/60 text-[#241A15] hover:bg-[#EBE5DB] transition-colors rounded-[3px] text-[11px] uppercase tracking-[0.16em] font-medium cursor-pointer text-center"
                  >
                    {addedNotice ? '✓ Saved to Bag' : '+ Add to Bag'}
                  </button>
                </div>
              </div>

              {/* Trust & Delivery badge */}
              <div className="pt-4 border-t hairline-espresso grid grid-cols-2 gap-4 text-xs text-[#241A15]/75">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#9A6A3A] shrink-0" />
                  <span className="text-[11px]">Nationwide Delivery (3-5 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#9A6A3A] shrink-0" />
                  <span className="text-[11px]">3-Day Defect Exchange Window</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A6A3A]">
                  Specifications & Dimensions
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs border-t hairline-espresso pt-2">
                  <div className="text-[#241A15]/60">Dimensions:</div>
                  <div className="font-mono text-[11px] text-[#241A15]">{product.dimensions}</div>

                  <div className="text-[#241A15]/60">Weight:</div>
                  <div className="font-mono text-[11px] text-[#241A15]">{product.weight}</div>

                  {product.specs?.map((spec) => (
                    <React.Fragment key={spec.label}>
                      <div className="text-[#241A15]/60">{spec.label}:</div>
                      <div className="text-[11px] text-[#241A15]">{spec.value}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Care Instructions */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A6A3A]">
                  Leather Care
                </h4>
                <p className="text-xs text-[#241A15]/75 leading-relaxed font-light">
                  {product.careInstructions}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
