export function convertTimeToString(time: number): string {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const miliseconds = time % 1000;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${miliseconds.toString().padStart(3, "0")}`;
}

export const calculateTimeFromStringToMs = (time: string) => {
  return time
    .split(":")
    .map(Number)
    .reverse()
    .map((value, index) => value * [1, 1000, 60000][index])
    .reduce((sum, current) => sum + current, 0);
};

export const removeSecondsAndMiliseconds = (date: Date): Date => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export const displayDateRange = (d1: Date, d2: Date): string => {
  return `${dateToString(d1)} ${!isSameDay(d1, d2) ? `- ${dateToString(d2)}` : ""}, ${timeToString(d1)} ${!isSameTime(d1, d2) ? `- ${timeToString(d2)}` : ""}`;
}

export const timeToString = (date: Date): string => {
  return date.toLocaleString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const dateToString = (date: Date): string => {
  return date.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isSameTime = (d1: Date, d2: Date): boolean => {
  return (
    d1.getHours() === d2.getHours() &&
    d1.getMinutes() === d2.getMinutes()
  );
}