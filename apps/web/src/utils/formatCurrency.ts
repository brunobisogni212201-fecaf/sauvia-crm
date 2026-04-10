/**
 * Format a number as Brazilian Real currency
 * 
 * @param value - The value to format (in cents or as decimal)
 * @param options - Formatting options
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1234.56) // "R$ 1.234,56"
 */
export function formatCurrency(
  value: number,
  options: { locale?: string; currency?: string } = {}
): string {
  const { locale = 'pt-BR', currency = 'BRL' } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
