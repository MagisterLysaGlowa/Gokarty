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
