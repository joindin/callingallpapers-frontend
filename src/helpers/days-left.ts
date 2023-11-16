export function daysLeft(targetDate: Date, referenceDate?: Date) {
  return Math.ceil((targetDate.getTime() - (referenceDate ?? new Date()).getTime()) / (1000 * 3600 * 24));
}
