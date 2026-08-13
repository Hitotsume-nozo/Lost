import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date | string | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Found':
      return 'bg-sage-light text-sage-deep';
    case 'Lost':
      return 'bg-yellow-100 text-yellow-800';
    case 'Claimed':
      return 'bg-blue-100 text-blue-800';
    case 'Returned':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-orange-100 text-orange-800';
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getRoleBadgeColor(role: string): string {
  return role === 'admin' 
    ? 'bg-ink-navy text-white' 
    : 'bg-sage-light text-sage-deep';
}
