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

export function formatToPersianGroupedNumber(input: number | string): string {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

  const englishNumber = input.toString().replace(/[^0-9]/g, '');
  const grouped = Number(englishNumber).toLocaleString("en-US"); // 1234567 -> 1,234,567

  return grouped.replace(/\d/g, (d) => persianDigits[+d]);
}


export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");

  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? parts[1]?.slice(0, 2) : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);

  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};

export const formatWithThousandSeparator = (value: string) => {
  const numericValue = value.replace(/\D/g, ""); // فقط رقم‌ها

  if (!numericValue) return "";

  return Number(numericValue).toLocaleString("en-US"); // فقط جداکننده هزارگان
};





 function toFarsiDigitsWithGrouping(input: string): string {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return input.replace(/\d/g, (d) => persianDigits[+d]).replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
}