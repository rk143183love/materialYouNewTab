// Calculate Net Salary
export function calculateNetSalary(
  grossSalary: number,
  advance: number,
  mess: number,
  roomRent: number,
  recovery: number
): number {
  return grossSalary - advance - mess - roomRent - recovery;
}

// Calculate Gross Salary
export function calculateGrossSalary(
  presentDays: number,
  dailyRate: number
): number {
  return presentDays * dailyRate;
}

// Calculate Attendance Percentage
export function calculateAttendancePercentage(
  presentDays: number,
  totalDays: number
): number {
  if (totalDays === 0) return 0;
  return (presentDays / totalDays) * 100;
}

// Calculate Working Hours
export function calculateWorkingHours(checkIn: Date, checkOut: Date): number {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  return diffMs / (1000 * 60 * 60); // Convert to hours
}

// Calculate GST Amount
export function calculateGST(amount: number, gstRate: number = 18): number {
  return (amount * gstRate) / 100;
}

// Calculate Service Charge
export function calculateServiceCharge(
  amount: number,
  serviceChargePercentage: number
): number {
  return (amount * serviceChargePercentage) / 100;
}

// Calculate Revenue minus expenses
export function calculateNetProfit(
  revenue: number,
  salaryExpense: number,
  businessExpense: number,
  otherExpense: number = 0
): number {
  return revenue - salaryExpense - businessExpense - otherExpense;
}

// Calculate outstanding amount
export function calculateOutstandingAmount(
  invoiceTotal: number,
  paidAmount: number
): number {
  return Math.max(0, invoiceTotal - paidAmount);
}
