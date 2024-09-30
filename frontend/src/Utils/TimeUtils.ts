import { PhotoCellData, Time } from "../../types";

export function convertRawToPhotoCellData(
  fields: (string | null)[]
): PhotoCellData {
  return {
    lapCount: Number(fields[0]),
    lapsLeft: Number(fields[Number(fields[0]) + 1]),
    time: convertTimeFromStringToObject(String(fields[11])),
    startPermission: Boolean(Number(fields[12])),
    photocell1Activ: Boolean(Number(fields[13])),
    photocell2Activ: Boolean(Number(fields[14])),
    photocell3Activ: Boolean(Number(fields[15])),
  };
}

export function convertTimeFromStringToObject(time: string): Time {
  const timeArray = time
    .replaceAll(/[a-zA-Z#]/g, "")
    .split("_")
    .reverse()
    .map((z) => Number(z));
  return {
    ms: timeArray[0] ?? 0,
    s: timeArray[1] ?? 0,
    m: timeArray[2] ?? 0,
    h: timeArray[3] ?? 0,
  };
}

export function convertTimeFromMilisecondsToObject(time: number): Time {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const miliseconds = time % 1000;

  return { h: hours, m: minutes, s: seconds, ms: miliseconds };
}

export function convertTimeToString(time: number): string {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const miliseconds = time % 1000;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${miliseconds.toString().padStart(3, "0")}`;
}

export function getTimeInMs(time: Time): number {
  return time.ms + time.s * 1000 + time.m * 1000 * 60 + time.h * 1000 * 60 * 60;
}

export function convertTimeToMs(time: Time): number {
  const hoursToMs = time.h * 60 * 60 * 1000; // 1 hour = 3600000 ms
  const minutesToMs = time.m * 60 * 1000; // 1 minute = 60000 ms
  const secondsToMs = time.s * 1000; // 1 second = 1000 ms
  const totalMs = hoursToMs + minutesToMs + secondsToMs + time.ms;

  return totalMs;
}
