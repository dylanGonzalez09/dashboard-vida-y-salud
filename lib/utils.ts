import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getExpirationColor(daysLeft: number): string {
  if (daysLeft <= 10) return "text-red-500";
  if (daysLeft <= 20) return "text-orange-500";
  return "text-green-500";
}