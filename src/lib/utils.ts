import { clsx, type ClassValue } from "clsx";
import pino, { Logger } from "pino";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logger: Logger =
  process.env.NODE_ENV === "production"
    ? pino({ level: "warn" })
    : pino({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
        level: "debug",
      });

// exclude.ts

/**
 * Fungsi untuk mengecualikan properti tertentu dari objek.
 * @param obj - Objek asli yang ingin diproses.
 * @param keys - Array nama properti yang ingin dikecualikan.
 * @returns Objek baru tanpa properti yang dikecualikan.
 */
export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
  const newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}
