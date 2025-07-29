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
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const englishNumber = input.toString().replace(/[^0-9]/g, "");
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
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .replace(/\d/g, (d) => persianDigits[+d])
    .replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
}

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

// let selectedColor = "#ddd";

// switch (product.color) {
//   case "TitaniumBlack":
//     selectedColor = "#383838";
//     break;

//   case "Black":
//     selectedColor = "#1a1a1a";
//     break;

//   case "Silver":
//     selectedColor = "#cfcfcf";
//     break;

//   case "Purple":
//     selectedColor = "#b030b0";
//     break;

//   case "yellow":
//     selectedColor = "#ffee59";
//     break;

//   case "DarkBlue":
//     selectedColor = "#253873";
//     break;

//   case "Lemon":
//     selectedColor = "#f6f436";
//     break;

//   case "TitaniumSilver":
//     selectedColor = "#dacccc";
//     break;

//   case "DarkGray":
//     selectedColor = "#1f1d1f";
//     break;

//   case "NaturalTitanium":
//     selectedColor = "#d7d6d6";
//     break;

//   case "Golden":
//     selectedColor = "#d4a54c";
//     break;

//   case "TitaniumGray":
//     selectedColor = "#64635f";
//     break;

//   case "TitaniumIceBlue":
//     selectedColor = "#bddafc";
//     break;

//   case "Gray":
//     selectedColor = "#8f8f8f";
//     break;

//   case "NavyBlue":
//     selectedColor = "#00009c";
//     break;

//   case "Brick":
//     selectedColor = "#c47020";
//     break;

//   case "TitaniumDesert":
//     selectedColor = "#e6c794";
//     break;

//   case "TitaniumPurple":
//     selectedColor = "#a98ead";
//     break;

//   case "JetBlackTitanium":
//     selectedColor = "#1b1b1a";
//     break;

//   case "LightGreen":
//     selectedColor = "#7fff00";
//     break;

//   case "Turquoise":
//     selectedColor = "#00ffff";
//     break;

//   case "LightGray":
//     selectedColor = "#cecece";
//     break;

//   case "LightBlue":
//     selectedColor = "#74c1f6";
//     break;

//   case "Pink":
//     selectedColor = "#e05ce0";
//     break;

//   case "TitaniumWhite":
//     selectedColor = "#f9f6f6";
//     break;

//   case "Green":
//     selectedColor = "#22a148";
//     break;

//   case "Cream":
//     selectedColor = "#938f7a";
//     break;

//   case "Blue":
//     selectedColor = "#006cf0";
//     break;

//   case "White":
//     selectedColor = "#ffffff";
//     break;

//   case "Red":
//     selectedColor = "#e03131";
//     break;

//   case "Orange":
//     selectedColor = "#ffa600";
//     break;

//   case "graphite":
//     selectedColor = "#3C3C3C";
//     break;

//   case "oceanBlue":
//     selectedColor = "#0077BE";
//     break;

//   case "roseGold":
//     selectedColor = "#B76E79";
//     break;

//   case "oliveGreen":
//     selectedColor = "#708238";
//     break;

//   case "copper":
//     selectedColor = "#B87333";
//     break;

//   case "bronze":
//     selectedColor = "#CD7F32";
//     break;

//   case "charcoalGray":
//     selectedColor = "#36454F";
//     break;

//   case "skyBlue":
//     selectedColor = "#87CEEB";
//     break;

//   case "lilac":
//     selectedColor = "#C8A2C8";
//     break;

//   case "mintGreen":
//     selectedColor = "#98FF98";
//     break;

//   default:
//     selectedColor = "#fff";
//     break;
// }

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
