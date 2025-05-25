import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const PAGINATION_PER_PAGE = 5;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  dateValue: string | { seconds: number; nanoseconds: number } | null
) => {
  if (typeof dateValue === 'string') {
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      });
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return 'N/A';
    }
  }
  if (dateValue && typeof dateValue.seconds === 'number') {
    const date = new Date(dateValue.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
  }
  return 'N/A';
};

export const formatCurrency = (value: any) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
