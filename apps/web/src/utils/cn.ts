import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge and deduplicate Tailwind CSS classes
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 * 
 * @example
 * <div className={cn('px-4', isActive && 'bg-primary', 'rounded-lg')} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
