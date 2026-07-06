import { format, startOfMonth, endOfMonth, isToday } from 'date-fns';

// Format date to DD/MM/YYYY
export function formatDate(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}

// Format date and time
export function formatDateTime(date: Date): string {
  return format(date, 'dd/MM/yyyy HH:mm');
}

// Get month date range
export function getMonthDateRange(date: Date) {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

// Check if date is today
export function isDateToday(date: Date): boolean {
  return isToday(date);
}

// Get current month and year string
export function getCurrentMonthYear(): string {
  return format(new Date(), 'MMMM yyyy');
}

// Calculate days between two dates
export function daysBetween(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
