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

export function getColorHex(color: string): string {
  const colorMap: Record<string, string> = {
    TitaniumBlack: "#383838",
    Black: "#1a1a1a",
    Silver: "#cfcfcf",
    Purple: "#b030b0",
    yellow: "#ffee59",
    DarkBlue: "#253873",
    Lemon: "#f6f436",
    TitaniumSilver: "#dacccc",
    DarkGray: "#1f1d1f",
    NaturalTitanium: "#d7d6d6",
    Golden: "#d4a54c",
    TitaniumGray: "#64635f",
    TitaniumIceBlue: "#bddafc",
    Gray: "#8f8f8f",
    NavyBlue: "#00009c",
    Brick: "#c47020",
    TitaniumDesert: "#e6c794",
    TitaniumPurple: "#a98ead",
    JetBlackTitanium: "#1b1b1a",
    LightGreen: "#7fff00",
    Turquoise: "#00ffff",
    LightGray: "#cecece",
    LightBlue: "#74c1f6",
    Pink: "#e05ce0",
    TitaniumWhite: "#f9f6f6",
    Green: "#22a148",
    Cream: "#938f7a",
    Blue: "#006cf0",
    White: "#ffffff",
    Red: "#e03131",
    Orange: "#ffa600",
    graphite: "#3C3C3C",
    oceanBlue: "#0077BE",
    roseGold: "#B76E79",
    oliveGreen: "#708238",
    copper: "#B87333",
    bronze: "#CD7F32",
    charcoalGray: "#36454F",
    skyBlue: "#87CEEB",
    lilac: "#C8A2C8",
    mintGreen: "#98FF98",
  };

  return colorMap[color] || "#fff"; // default color
}
