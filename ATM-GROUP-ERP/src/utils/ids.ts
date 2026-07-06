// Auto-generate Employee ID
export function generateEmployeeId(): string {
  return `EMP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Auto-generate Company Code
export function generateCompanyCode(): string {
  return `CMP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

// Auto-generate Client Code
export function generateClientCode(): string {
  return `CLT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

// Auto-generate Invoice Number
export function generateInvoiceNumber(prefix: string = 'INV'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Auto-generate Division Code
export function generateDivisionCode(name: string): string {
  const acronym = name.split(' ').map(w => w.charAt(0)).join('').toUpperCase();
  return `${acronym}-${Date.now().toString().slice(-4)}`;
}
