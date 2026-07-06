// Format currency to INR
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format number with comma separation
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

// Format phone number
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

// Format GST Number
export function formatGST(gst: string): string {
  return gst.toUpperCase();
}

// Format PAN Number
export function formatPAN(pan: string): string {
  return pan.toUpperCase();
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// Truncate text
export function truncateText(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}
