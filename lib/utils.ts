import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const PRODUCTS_PER_PAGE = 5;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
