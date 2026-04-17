/**
 * Merge class names (Tailwind + conditional)
 * Simple utility — install `clsx` + `tailwind-merge` for production use
 */
export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ')

/**
 * Format a date string to a readable format
 */
export const formatDate = (date: string | Date, locale = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Truncate a string to a max length
 */
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

/**
 * Debounce a function
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

/**
 * Get initials from a full name
 */
export const getInitials = (firstName: string, lastName?: string): string => {
  const first = firstName?.[0]?.toUpperCase() ?? ''
  const last = lastName?.[0]?.toUpperCase() ?? ''
  return `${first}${last}`
}

/**
 * Sleep utility for async delays
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))
