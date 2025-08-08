import { AllBrandOptions } from "@/hooks/useProductFilter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const phoneTypeOptions = [
  { label: "اقتصادی", value: "Economic" },
  { label: "پرچم‌دار", value: "FlagBearer" },
  { label: "میان‌رده", value: "MidRange" },
];

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

export const formatWithThousandSeparator = (value: string) => {
  const numericValue = value.replace(/\D/g, ""); // فقط رقم‌ها

  if (!numericValue) return "";

  return Number(numericValue).toLocaleString("en-US"); // فقط جداکننده هزارگان
};

export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// تابع محاسبه روشنایی رنگ (بر اساس RGB)
export function isDarkColor(hex: string): boolean {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // فرمول استاندارد luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance < 140; // هرچی کمتر باشه، تیره‌تره
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type ColorInfo = {
  hex: string;
  label: string;
};

export function getColorInfo(color: string | undefined): ColorInfo {
  const colorMap: Record<string, ColorInfo> = {
    TitaniumBlack: { hex: "#383838", label: "مشکی تیتانیومی" },
    Black: { hex: "#1a1a1a", label: "مشکی" },
    Silver: { hex: "#cfcfcf", label: "نقره‌ای" },
    Purple: { hex: "#b030b0", label: "بنفش" },
    yellow: { hex: "#ffee59", label: "زرد" },
    DarkBlue: { hex: "#253873", label: "آبی تیره" },
    Lemon: { hex: "#f6f436", label: "لیمویی" },
    TitaniumSilver: { hex: "#dacccc", label: "نقره‌ای تیتانیومی" },
    DarkGray: { hex: "#1f1d1f", label: "خاکستری تیره" },
    NaturalTitanium: { hex: "#d7d6d6", label: "تیتانیوم طبیعی" },
    Golden: { hex: "#d4a54c", label: "طلایی" },
    TitaniumGray: { hex: "#64635f", label: "خاکستری تیتانیومی" },
    TitaniumIceBlue: { hex: "#bddafc", label: "آبی یخی تیتانیومی" },
    Gray: { hex: "#8f8f8f", label: "خاکستری" },
    NavyBlue: { hex: "#00009c", label: "آبی نفتی" },
    Brick: { hex: "#c47020", label: "آجری" },
    TitaniumDesert: { hex: "#e6c794", label: "بژ تیتانیومی" },
    TitaniumPurple: { hex: "#a98ead", label: "بنفش تیتانیومی" },
    JetBlackTitanium: { hex: "#1b1b1a", label: "مشکی جت تیتانیومی" },
    LightGreen: { hex: "#7fff00", label: "سبز روشن" },
    Turquoise: { hex: "#00ffff", label: "فیروزه‌ای" },
    LightGray: { hex: "#cecece", label: "خاکستری روشن" },
    LightBlue: { hex: "#74c1f6", label: "آبی روشن" },
    Pink: { hex: "#e05ce0", label: "صورتی" },
    TitaniumWhite: { hex: "#f9f6f6", label: "سفید تیتانیومی" },
    Green: { hex: "#22a148", label: "سبز" },
    Cream: { hex: "#938f7a", label: "کرم" },
    Blue: { hex: "#006cf0", label: "آبی" },
    White: { hex: "#ffffff", label: "سفید" },
    Red: { hex: "#e03131", label: "قرمز" },
    Orange: { hex: "#ffa600", label: "نارنجی" },
    graphite: { hex: "#3C3C3C", label: "گرافیتی" },
    oceanBlue: { hex: "#0077BE", label: "آبی اقیانوسی" },
    roseGold: { hex: "#B76E79", label: "رز گلد" },
    oliveGreen: { hex: "#708238", label: "سبز زیتونی" },
    copper: { hex: "#B87333", label: "مسی" },
    bronze: { hex: "#CD7F32", label: "برنزی" },
    charcoalGray: { hex: "#36454F", label: "ذغالی" },
    skyBlue: { hex: "#87CEEB", label: "آبی آسمانی" },
    lilac: { hex: "#C8A2C8", label: "یاسی" },
    mintGreen: { hex: "#98FF98", label: "سبز نعنایی" },
  };

  return colorMap[color ?? ""] || { hex: "#fff", label: "نامشخص" };
}


export const getBrandLabelFa = (value: string): string => {
  const brand = AllBrandOptions.find((b) => b.value === value);
  return brand ? brand.label : value; // اگه پیدا نشد همون value رو برمیگردونه
};




export const getClassification = (value: string): string => {
  const type = phoneTypeOptions.find((t) => t.value === value);
  return type ? type.label : value;
};


