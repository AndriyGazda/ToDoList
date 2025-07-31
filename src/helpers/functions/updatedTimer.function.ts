export function getDaysAndHoursLeft(targetDate: string | Date): string {
  const now = new Date();
  const due = new Date(targetDate);

  if (isNaN(due.getTime())) return "";

  const diff = due.getTime() - now.getTime();
  if (diff <= 0) return "";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${days}d ${hours}h`;
}
