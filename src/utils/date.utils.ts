import { dayjs } from "@/lib/dayjs";

export const minutesToDuration = (minutes: number) => {
  if (!minutes) minutes = 0;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes} min`;
  return `${hours}h${remainingMinutes.toString().padStart(2, "0")}`;
};

export const roundToNearest = (value: number, nearest: number) =>
  Math.ceil(value / nearest) * nearest;

export function groupByMonth(dates: string[]) {
  return dates.reduce<Record<string, string[]>>((acc, date) => {
    const key = dayjs(date).format("YYYY-MM");
    acc[key] = acc[key] || [];
    acc[key].push(date);
    return acc;
  }, {});
}
