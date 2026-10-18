import React, { useState, useEffect } from 'react';
import { X, CheckSquare, Square, Calculator, Calendar, Phone, AlertCircle, ExternalLink } from 'lucide-react';
import { BrandConfig } from '../data/brandConfig';

interface LaunchChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandConfig: BrandConfig;
  onUpdateBrandConfig: (updated: BrandConfig) => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'supplier-materials',
    label: 'Supplier material confirmation in writing',
    detail: 'Ensure supplier confirms hide origin, temper, and tanning method in writing before claiming full-grain or vegetable-tanned.',
  },
  {
    id: 'unit-economics',
    label: 'Real prices finalized from unit economics',
    detail: 'Calculate production cost + blind monogram stamp + custom cloth pouch + courier delivery + marketing margin.',
  },
  {
    id: 'whatsapp-test',
    label: 'WhatsApp Business number configured & tested',
    detail: 'Verify incoming links generate the prefilled product order message and reply swiftly.',
  },
  {
    id: 'policies-legal',
    label: 'Return & exchange policy checked against Pakistani law',
    detail: 'Confirm 3-day exchange and manufacturing defect clauses comply with provincial consumer protection acts.',
  },
  {
    id: 'placeholders-cleared',
    label: 'All placeholders removed',
    detail: 'Replace [MATERIAL: confirm with supplier] and PKR [price TBD] in src/data/products.json once verified.',
  },
  {
    id: 'mobile-tested',
    label: 'Mobile tests on at least two smartphones',
    detail: 'Verify 44px touch targets, sticky WhatsApp ordering bar, and high-DPI image sharpness on iOS and Android.',
  },
  {
    id: 'domain-ssl',
    label: 'Domain, Cloudflare Pages & Analytics verified',
    detail: 'Connect your zevran.pk or .com domain, enable Cloudflare Web Analytics, and verify SSL padlock.',
  },
  {
    id: 'trademark-check',
    label: 'ZEVRAN trademark & name availability registered',
    detail: 'Verify IPO Pakistan trademark registry for leather goods class 18 before ad spend.',
  },
];

export const LaunchChecklistModal: React.FC<LaunchChecklistModalProps> = ({
  isOpen,
  onClose,
  brandConfig,
  onUpdateBrandConfig,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'checklist' | 'calculator' | 'config' | 'timeline'>('checklist');
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zevran_checklist');
      return saved ? JSON.parse(saved) : ['whatsapp-test'];
    } catch {
      return ['whatsapp-test'];
    }
  });

  const [testNumber, setTestNumber] = useState(brandConfig.whatsappNumber);

  // Unit Economics state
  const [manufacturingCost, setManufacturingCost] = useState(1800);
  const [stampingCost, setStampingCost] = useState(150);
  const [packagingCost, setPackagingCost] = useState(250);
  const [shippingCost, setShippingCost] = useState(250);
  const [marketingTarget, setMarketingTarget] = useState(600);
  const [desiredMarginPercent, setDesiredMarginPercent] = useState(40);

  const baseCost = manufacturingCost + stampingCost + packagingCost + shippingCost + marketingTarget;
  const recommendedPrice = Math.round(baseCost / (1 - desiredMarginPercent / 100) / 100) * 100;
  const estimatedProfitPerOrder = recommendedPrice - baseCost;

  useEffect(() => {
    try {
      localStorage.setItem('zevran_checklist', JSON.stringify(checkedIds));
    } catch {
      // localStorage fallback
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveNumber = () => {
    const updated = {
      ...brandConfig,
      whatsappNumber: testNumber,
      whatsappDisplay: testNumber.startsWith('92')
        ? `+${testNumber.slice(0, 2)} (${testNumber.slice(2, 5)}) ${testNumber.slice(5)}`
        : testNumber,
    };
    onUpdateBrandConfig(updated);
    alert('WhatsApp number updated across all order buttons!');
  };

  const handleTestWhatsAppLink = () => {
    const clean = testNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(
      'Salam ZEVRAN, this is a test inquiry from the launch setup.'
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const progressPercent = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#F4EFE7] text-[#241A15] w-full max-w-3xl rounded-[3px] border hairline-espresso shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b hairline-espresso flex items-center justify-between bg-[#EBE5DB]/50">
          <div>
            <span className="text-[10px] uppercase tracking-tagline text-[#9A6A3A] font-semibold block">
              Founder & Launch Console
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#241A15] font-normal">
              ZEVRAN Low-Budget Launch Control
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#241A15]/60 hover:text-[#241A15] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b hairline-espresso bg-[#F4EFE7] px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 px-3 text-xs uppercase tracking-wider font-medium border-b-2 cursor-pointer transition-colors ${
              activeTab === 'checklist'
                ? 'border-[#241A15] text-[#241A15]'
                : 'border-transparent text-[#241A15]/60 hover:text-[#241A15]'
            }`}
          >
            Launch Checklist ({checkedIds.length}/{CHECKLIST_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-2.5 px-3 text-xs uppercase tracking-wider font-medium border-b-2 cursor-pointer transition-colors ${
              activeTab === 'calculator'
                ? 'border-[#241A15] text-[#241A15]'
                : 'border-transparent text-[#241A15]/60 hover:text-[#241A15]'
            }`}
          >
            Unit Economics
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-2.5 px-3 text-xs uppercase tracking-wider font-medium border-b-2 cursor-pointer transition-colors ${
              activeTab === 'config'
                ? 'border-[#241A15] text-[#241A15]'
                : 'border-transparent text-[#241A15]/60 hover:text-[#241A15]'
            }`}
          >
            WhatsApp Settings
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-2.5 px-3 text-xs uppercase tracking-wider font-medium border-b-2 cursor-pointer transition-colors ${
              activeTab === 'timeline'
                ? 'border-[#241A15] text-[#241A15]'
                : 'border-transparent text-[#241A15]/60 hover:text-[#241A15]'
            }`}
          >
            14-Day Timeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#241A15]">Launch Readiness Progress</span>
                  <span className="font-mono font-semibold text-[#9A6A3A]">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#EBE5DB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A66A3F] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="divide-y hairline-espresso border border-hairline-espresso rounded-[2px] bg-[#F4EFE7]">
                {CHECKLIST_ITEMS.map((item) => {
                  const isDone = checkedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="p-4 flex items-start gap-3 hover:bg-[#EBE5DB]/30 transition-colors cursor-pointer"
                    >
                      <button className="mt-0.5 text-[#9A6A3A] shrink-0">
                        {isDone ? (
                          <CheckSquare className="w-5 h-5 text-[#241A15]" />
                        ) : (
                          <Square className="w-5 h-5 text-[#241A15]/40" />
                        )}
                      </button>
                      <div className="space-y-0.5">
                        <span
                          className={`text-xs font-medium block ${
                            isDone ? 'line-through text-[#241A15]/50' : 'text-[#241A15]'
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-[11px] text-[#241A15]/70 font-light leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Unit Economics */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#EBE5DB]/40 rounded-[2px] border hairline-espresso text-xs space-y-1">
                <span className="font-semibold text-[#241A15]">Why Calculate Unit Economics First?</span>
                <p className="text-[#241A15]/75 font-light leading-relaxed">
                  As instructed in Part 1 & 5 of your project brief: do not finalize prices until supplier costs, packaging, and courier expenses are validated.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cost Inputs */}
                <div className="space-y-3 bg-[#F4EFE7] p-4 rounded-[2px] border hairline-espresso text-xs">
                  <span className="font-semibold text-[#9A6A3A] uppercase tracking-wider block text-[10px]">
                    Cost Breakdown per Piece (PKR)
                  </span>

                  <div>
                    <label className="block text-[#241A15]/70 mb-1">Leather Manufacturing / Artisan</label>
                    <input
                      type="number"
                      value={manufacturingCost}
                      onChange={(e) => setManufacturingCost(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border hairline-espresso rounded-[2px] font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#241A15]/70 mb-1">ZR Logo Deboss & Monogram Tooling</label>
                    <input
                      type="number"
                      value={stampingCost}
                      onChange={(e) => setStampingCost(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border hairline-espresso rounded-[2px] font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#241A15]/70 mb-1">Cloth Pouch & Minimal Packaging</label>
                    <input
                      type="number"
                      value={packagingCost}
                      onChange={(e) => setPackagingCost(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border hairline-espresso rounded-[2px] font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#241A15]/70 mb-1">Courier Delivery & Packaging</label>
                    <input
                      type="number"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border hairline-espresso rounded-[2px] font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#241A15]/70 mb-1">Est. Ad Spend per Order (Buffer)</label>
                    <input
                      type="number"
                      value={marketingTarget}
                      onChange={(e) => setMarketingTarget(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border hairline-espresso rounded-[2px] font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#241A15]/70 mb-1">Desired Profit Margin: {desiredMarginPercent}%</label>
                    <input
                      type="range"
                      min={20}
                      max={60}
                      value={desiredMarginPercent}
                      onChange={(e) => setDesiredMarginPercent(Number(e.target.value))}
                      className="w-full accent-[#A66A3F]"
                    />
                  </div>
                </div>

                {/* Output Card */}
                <div className="bg-[#241A15] text-[#F4EFE7] p-6 rounded-[2px] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-tagline text-[#9A6A3A] font-semibold block">
                      Target Retail Pricing Model
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-[#F4EFE7]/70">
                        <span>Base Cost per Unit:</span>
                        <span className="font-mono">PKR {baseCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#F4EFE7]/70">
                        <span>Target Gross Margin:</span>
                        <span className="font-mono">{desiredMarginPercent}%</span>
                      </div>
                      <div className="pt-3 border-t hairline-ivory flex justify-between items-baseline">
                        <span className="text-sm font-semibold">Recommended Retail:</span>
                        <span className="font-mono text-2xl text-[#9A6A3A] font-bold">
                          PKR {recommendedPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-400 font-mono">
                        <span>Net Profit per Unit:</span>
                        <span>PKR {estimatedProfitPerOrder.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#F4EFE7]/50 font-light">
                    *Tip: Use this figure to update the &ldquo;provisionalPrice&rdquo; and &ldquo;priceDisplay&rdquo; in <code>src/data/products.json</code> before opening public orders.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WhatsApp Settings */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#EBE5DB]/40 rounded-[2px] border hairline-espresso text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#9A6A3A] font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>Configure Live WhatsApp Ordering Desk</span>
                </div>
                <p className="text-[#241A15]/75 font-light leading-relaxed">
                  Enter your official WhatsApp Business phone number with country code (e.g. <code>923001234567</code> for Pakistan). All product order buttons and checkout links instantly update to this number.
                </p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#241A15] mb-1">
                    WhatsApp Number (Digits only, including 92)
                  </label>
                  <input
                    type="text"
                    value={testNumber}
                    onChange={(e) => setTestNumber(e.target.value)}
                    placeholder="923001234567"
                    className="w-full px-3 py-2 text-sm font-mono bg-[#F4EFE7] border hairline-espresso focus:outline-none focus:border-[#9A6A3A] rounded-[2px]"
                  />
                  <span className="text-[11px] text-[#241A15]/60 mt-1 block">
                    Current active: {brandConfig.whatsappDisplay} ({brandConfig.whatsappNumber})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveNumber}
                    className="px-5 py-2.5 bg-[#241A15] text-[#F4EFE7] hover:bg-[#A66A3F] transition-colors text-xs uppercase tracking-[0.16em] font-medium rounded-[2px] cursor-pointer"
                  >
                    Save & Update Site
                  </button>

                  <button
                    onClick={handleTestWhatsAppLink}
                    className="px-4 py-2.5 border border-[#241A15] text-[#241A15] hover:bg-[#241A15] hover:text-[#F4EFE7] transition-colors text-xs uppercase tracking-[0.16em] font-medium rounded-[2px] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Test WhatsApp Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 14-Day Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 text-xs">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9A6A3A] block">
                Part 4 · Lowest-Budget Launch Plan (14 Days)
              </span>

              <div className="space-y-3 divide-y hairline-espresso border border-hairline-espresso rounded-[2px] bg-[#F4EFE7]">
                <div className="p-3.5 flex justify-between gap-4">
                  <div className="font-semibold w-24 shrink-0 text-[#241A15]">Day 1–2</div>
                  <div className="text-[#241A15]/75 font-light">Confirm decisions, buy domain (Namecheap/Cloudflare ~$10), create WhatsApp Business & Instagram accounts. Finalize ZR monogram logo.</div>
                </div>
                <div className="p-3.5 flex justify-between gap-4">
                  <div className="font-semibold w-24 shrink-0 text-[#241A15]">Day 3–4</div>
                  <div className="text-[#241A15]/75 font-light">Review static site skeleton, customize colors and content. Verify Top Bar contract and zero-pill discipline.</div>
                </div>
                <div className="p-3.5 flex justify-between gap-4">
                  <div className="font-semibold w-24 shrink-0 text-[#241A15]">Day 5–7</div>
                  <div className="text-[#241A15]/75 font-light">Receive supplier samples. Photograph in natural light on neutral stone. Update <code>products.json</code> with confirmed materials and verified dimensions.</div>
                </div>
                <div className="p-3.5 flex justify-between gap-4">
                  <div className="font-semibold w-24 shrink-0 text-[#241A15]">Day 8–10</div>
                  <div className="text-[#241A15]/75 font-light">Confirm return & exchange policy with local consumer protection guidelines. Test WhatsApp ordering flow on two physical phones.</div>
                </div>
                <div className="p-3.5 flex justify-between gap-4">
                  <div className="font-semibold w-24 shrink-0 text-[#241A15]">Day 11–13</div>
                  <div className="text-[#241A15]/75 font-light">Deploy to Cloudflare Pages (free SSL, global CDN). Test with 5 friends placing test COD orders. Fix any mobile friction.</div>
                </div>
                <div className="p-3.5 flex justify-between gap-4">
                  <div className="font-semibold w-24 shrink-0 text-[#241A15]">Day 14+</div>
                  <div className="text-[#241A15]/75 font-light">Public Launch. Announce on Instagram & TikTok. Monitor order conversion and unit profit before holding large inventory.</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
