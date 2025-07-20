import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function adjustAlpha(rgba: string, newAlpha: number): string {
  return rgba.replace(
    /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*\d*\.?\d+\)/,
    `rgba($1, $2, $3, ${newAlpha})`
  );
}

export function generateGradient(rgba: string): string {
  return `linear-gradient(to left, ${rgba}, ${adjustAlpha(rgba, 0.2)})`;
}

export function convertToPersianNumber(num: number | string): string {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
}
