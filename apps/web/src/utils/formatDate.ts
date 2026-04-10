/**
 * Format a date string to a human-readable format
 * 
 * @param date - The date to format (Date object, timestamp, or string)
 * @param locale - The locale to use (default: 'pt-BR')
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date()) // "15 de março de 2024"
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

/**
 * Format a date to relative time (e.g., "2 hours ago")
 * 
 * @param date - The date to format
 * @returns Relative time string
 * 
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) {
    return 'agora mesmo';
  } else if (diffMin < 60) {
    return `${diffMin} min atrás`;
  } else if (diffHour < 24) {
    return `${diffHour}h atrás`;
  } else if (diffDay < 7) {
    return `${diffDay}d atrás`;
  } else {
    return formatDate(dateObj);
  }
}
