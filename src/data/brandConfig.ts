export interface BrandConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  instagramHandle: string;
  facebookHandle: string;
  tiktokHandle: string;
  courierPartners: string;
  deliveryTimeDays: string;
  shippingFlatRatePKR: number;
  freeShippingThresholdPKR: number;
}

export const defaultBrandConfig: BrandConfig = {
  brandName: "ZEVRAN",
  tagline: "Made to Become Yours.",
  whatsappNumber: "923227176923",
  whatsappDisplay: "+92 3227176923",
  email: "orders@zevran.pk",
  instagramHandle: "zevran.pk",
  facebookHandle: "zevran.pk",
  tiktokHandle: "zevran.pk",
  courierPartners: "TCS / Leopard / Call Courier (TBD)",
  deliveryTimeDays: "3 to 5 business days",
  shippingFlatRatePKR: 250,
  freeShippingThresholdPKR: 5000,
};

/**
 * Builds prefilled WhatsApp order link as required by the brief
 */
export function buildWhatsAppLink(
  whatsappNumber: string,
  item: {
    name: string;
    color: string;
    size: string;
    quantity: number;
    priceDisplay?: string;
    monogram?: string;
  },
  customerDetails?: {
    name?: string;
    city?: string;
    address?: string;
    paymentMethod?: string;
  }
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  
  let msg = `Salam ZEVRAN,\n\nI would like to place an order for the following item:\n`;
  msg += `• Product: ${item.name}\n`;
  msg += `• Color: ${item.color}\n`;
  if (item.size && item.size !== 'Standard') {
    msg += `• Size: ${item.size}\n`;
  }
  msg += `• Quantity: ${item.quantity}\n`;
  if (item.priceDisplay) {
    msg += `• Price: ${item.priceDisplay}\n`;
  }
  if (item.monogram && item.monogram.trim()) {
    msg += `• Monogram Request: "${item.monogram.toUpperCase().trim()}" (I acknowledge personalized items are non-returnable)\n`;
  } else {
    msg += `• Monogram: None (Standard blind debossed ZR monogram)\n`;
  }

  if (customerDetails?.name) {
    msg += `\nCustomer Details:\n`;
    msg += `• Name: ${customerDetails.name}\n`;
    if (customerDetails.city) msg += `• City: ${customerDetails.city}\n`;
    if (customerDetails.address) msg += `• Address: ${customerDetails.address}\n`;
    if (customerDetails.paymentMethod) msg += `• Payment Choice: ${customerDetails.paymentMethod}\n`;
  } else {
    msg += `\nPlease confirm availability, total with delivery to my city, and payment details (COD / Bank Transfer).`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
}
