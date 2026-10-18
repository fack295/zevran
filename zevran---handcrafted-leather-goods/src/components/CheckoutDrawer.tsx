import React, { useState } from 'react';
import { X, MessageCircle, Trash2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrandConfig } from '../data/brandConfig';
import { ZrMonogram } from './BrandLogo';

export interface BagItem {
  id: string; // unique item id
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  provisionalPrice: number;
  priceDisplay: string;
  monogram: string;
  image: string;
}

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  brandConfig: BrandConfig;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  items,
  brandConfig,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'COD' | 'Bank'>('COD');
  const [orderConfirmed, setOrderConfirmed] = useState<{ id: string } | null>(null);

  const subtotal = items.reduce((acc, it) => acc + it.provisionalPrice * it.quantity, 0);
  const isFreeShipping = subtotal >= brandConfig.freeShippingThresholdPKR;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : brandConfig.shippingFlatRatePKR);
  const total = subtotal + shippingFee;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const cleanNumber = brandConfig.whatsappNumber.replace(/[^0-9]/g, '');
    let msg = `Salam ZEVRAN,\n\nI would like to place an order for the following items:\n\n`;

    items.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.name}\n`;
      msg += `   • Color: ${it.color}\n`;
      if (it.size && it.size !== 'Standard') msg += `   • Size: ${it.size}\n`;
      msg += `   • Quantity: ${it.quantity}\n`;
      if (it.monogram) msg += `   • Monogram: "${it.monogram}"\n`;
      msg += `   • Est. Price: PKR ${(it.provisionalPrice * it.quantity).toLocaleString()}\n\n`;
    });

    msg += `--------------------------\n`;
    msg += `Subtotal: PKR ${subtotal.toLocaleString()}\n`;
    msg += `Shipping (${customerCity || 'Pakistan'}): ${shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}\n`;
    msg += `Estimated Total: PKR ${total.toLocaleString()}\n\n`;

    if (customerName || customerPhone || customerAddress) {
      msg += `Customer Details:\n`;
      if (customerName) msg += `• Name: ${customerName}\n`;
      if (customerPhone) msg += `• Phone: ${customerPhone}\n`;
      if (customerCity) msg += `• City: ${customerCity}\n`;
      if (customerAddress) msg += `• Address: ${customerAddress}\n`;
      msg += `• Payment Preference: ${paymentChoice === 'COD' ? 'Cash on Delivery' : 'Bank / JazzCash Transfer'}\n`;
    }

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePlaceCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerCity) {
      alert('Please fill in your name, phone number, city, and delivery address.');
      return;
    }

    const orderId = `ZR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId,
      items,
      customer: {
        name: customerName,
        phone: customerPhone,
        city: customerCity,
        address: customerAddress,
        paymentChoice,
      },
      subtotal,
      shippingFee,
      total,
      date: new Date().toISOString(),
    };

    // Save to local storage orders ledger
    try {
      const existing = JSON.parse(localStorage.getItem('zevran_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('zevran_orders', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setOrderConfirmed({ id: orderId });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#F4EFE7] text-[#241A15] h-full shadow-2xl flex flex-col justify-between border-l hairline-espresso animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b hairline-espresso flex items-center justify-between bg-[#F4EFE7]">
          <div className="flex items-center gap-2.5">
            <ZrMonogram size={22} strokeColor="#241A15" />
            <h3 className="font-serif-luxury text-2xl text-[#241A15] font-normal">
              Inquiry & Order Bag
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#241A15]/60 hover:text-[#241A15] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderConfirmed ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-14 h-14 bg-[#241A15] text-[#F4EFE7] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-[#9A6A3A]" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-tagline text-[#9A6A3A] font-medium">
                  Order Registered
                </span>
                <h4 className="font-serif-luxury text-3xl text-[#241A15]">
                  Reference #{orderConfirmed.id}
                </h4>
              </div>
              <p className="text-xs text-[#241A15]/75 leading-relaxed max-w-sm mx-auto font-light">
                Thank you, <strong>{customerName}</strong>. Your order is logged. We will contact you at <strong>{customerPhone}</strong> to confirm dispatch via {brandConfig.courierPartners}.
              </p>

              <div className="p-4 bg-[#EBE5DB]/60 rounded-[2px] border hairline-espresso text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#241A15]/60">Payment:</span>
                  <span className="font-semibold">{paymentChoice === 'COD' ? 'Cash on Delivery' : 'Bank Transfer'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#241A15]/60">Estimated Total:</span>
                  <span className="font-mono font-semibold">PKR {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#241A15]/60">Destination:</span>
                  <span>{customerCity}</span>
                </div>
              </div>

              {/* Instant WhatsApp Sync Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 bg-[#241A15] text-[#F4EFE7] hover:bg-[#A66A3F] transition-colors rounded-[2px] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#9A6A3A]" />
                <span>Sync Order to WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setOrderConfirmed(null);
                  onClearBag();
                  onClose();
                }}
                className="text-xs text-[#241A15]/60 hover:text-[#241A15] underline cursor-pointer"
              >
                Close & Return to Collection
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-4 text-[#241A15]/60">
              <ZrMonogram size={40} className="mx-auto opacity-30" strokeColor="#241A15" />
              <p className="text-sm font-light">Your order bag is currently empty.</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#241A15] text-[#F4EFE7] text-xs uppercase tracking-[0.16em] font-medium rounded-[2px] cursor-pointer hover:bg-[#A66A3F] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#241A15]/60 border-b hairline-espresso pb-2">
                  <span>Selected Essentials ({items.length})</span>
                  <button
                    onClick={onClearBag}
                    className="hover:text-red-700 transition-colors cursor-pointer text-[11px]"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-[#EBE5DB]/40 rounded-[2px] border hairline-espresso"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded-[2px] bg-[#EBE5DB]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif-luxury text-lg text-[#241A15] leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#241A15]/40 hover:text-red-700 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#241A15]/70 space-x-2 mt-1">
                          <span>Color: {item.color}</span>
                          {item.size !== 'Standard' && <span>· Size: {item.size}</span>}
                        </div>
                        {item.monogram && (
                          <div className="text-[10px] text-[#9A6A3A] font-mono mt-0.5">
                            Monogram: &ldquo;{item.monogram}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border hairline-espresso rounded-[2px] bg-[#F4EFE7]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs font-mono hover:bg-[#241A15]/10 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs font-mono hover:bg-[#241A15]/10 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#241A15]">
                          PKR {(item.provisionalPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handlePlaceCodOrder} className="space-y-4 pt-4 border-t hairline-espresso">
                <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#9A6A3A] block">
                  Delivery Destination (Pakistan)
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#241A15]/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Khan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#241A15]/70 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#241A15]/70 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lahore / Karachi"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#241A15]/70 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentChoice}
                      onChange={(e) => setPaymentChoice(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                    >
                      <option value="COD">Cash on Delivery (COD)</option>
                      <option value="Bank">Bank / JazzCash Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#241A15]/70 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Plot #, Street, Phase / Block, Sector"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout CTAs */}
        {!orderConfirmed && items.length > 0 && (
          <div className="p-6 border-t hairline-espresso bg-[#EBE5DB]/50 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#241A15]/70">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#241A15]/70">
                <span>Nationwide Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#241A15] pt-2 border-t hairline-espresso">
                <span>Estimated Total</span>
                <span className="font-mono text-base tabular-nums">PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* WhatsApp Checkout CTA */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 bg-[#241A15] text-[#F4EFE7] hover:bg-[#A66A3F] transition-colors rounded-[3px] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#9A6A3A]" />
                <span>Complete Order on WhatsApp</span>
              </button>

              {/* Direct COD Submit Button */}
              <button
                onClick={handlePlaceCodOrder}
                className="w-full py-3 px-4 border border-[#241A15] text-[#241A15] hover:bg-[#241A15] hover:text-[#F4EFE7] transition-colors rounded-[3px] text-xs uppercase tracking-[0.16em] font-medium cursor-pointer text-center"
              >
                Place Cash on Delivery Order
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#241A15]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9A6A3A]" />
              <span>Inspection on Delivery · 3-Day Defect Exchange Guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
