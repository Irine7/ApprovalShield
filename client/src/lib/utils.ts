import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getRiskLevelClassName(riskLevel: string): string {
  switch (riskLevel) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-amber-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-blue-500';
  }
}

export function getRiskLevelBackgroundClassName(riskLevel: string): string {
  switch (riskLevel) {
    case 'high':
      return 'bg-red-50';
    case 'medium':
      return 'bg-amber-50';
    case 'low':
      return 'bg-green-50';
    default:
      return 'bg-blue-50';
  }
}

export function getRiskLabel(riskScore: number): string {
  if (riskScore >= 60) return 'High';
  if (riskScore >= 30) return 'Medium';
  return 'Low';
}
