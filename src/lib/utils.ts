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
