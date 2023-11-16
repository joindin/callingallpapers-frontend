export function formatDateRange(start: Date, end: Date) {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // @ts-ignore
  return dateTimeFormat.formatRange(start, end);
}
