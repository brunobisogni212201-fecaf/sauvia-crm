/**
 * Format a date string to a human-readable format
 * 
 * @param date - The date to format (Date object, timestamp, or string)
 * @param locale - The locale to use (default: 'pt-BR')
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date()) // "15/03/2024"
 */
export function formatDate(
  date: Date | string | number,
  locale: string = 'pt-BR'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;

  return dateObj.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format a date string to a time format
 * 
 * @param date - The date to format
 * @returns Formatted time string
 * 
 * @example
 * formatTime(new Date()) // "09:00"
 */
export function formatTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;

  return dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
