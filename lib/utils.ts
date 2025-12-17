import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWITADate() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const year = Number(parts.find(p => p.type === "year")!.value);
  const month = Number(parts.find(p => p.type === "month")!.value) - 1;
  const day = Number(parts.find(p => p.type === "day")!.value);
  const hour = Number(parts.find(p => p.type === "hour")!.value);
  const minute = Number(parts.find(p => p.type === "minute")!.value);
  const second = Number(parts.find(p => p.type === "second")!.value);

  // Create UTC Date that represents WITA time correctly
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}


export function getWITAMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Makassar", // WITA
  }).formatToParts(new Date());

  const hour = Number(parts.find(p => p.type === "hour")?.value);
  const minute = Number(parts.find(p => p.type === "minute")?.value);

  return hour * 60 + minute;
}

export const getWITADateString = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};
