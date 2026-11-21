/**
 * Formats a post's `publishedAt` for display, or returns "" when it's missing
 * or not a valid date. `Intl.DateTimeFormat.format` throws a RangeError on an
 * invalid date, which would break the page.
 */
export function formatPublishedDate(
  value: string | undefined | null,
  options: Intl.DateTimeFormatOptions,
): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
