import { AllBrandOptions } from "@/hooks/useProductFilter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jalaali from "jalaali-js";
import { Product } from "@/payload-types";

const phoneTypeOptions = [
  { label: "اقتصادی", value: "Economic" },
  { label: "پرچم‌دار", value: "FlagBearer" },
  { label: "میان‌رده", value: "MidRange" },
];

const strapMaterials = [
  { label: "سیلیکونی", value: "silicone" },
  { label: "فلزی", value: "metal" },
  { label: "چرم", value: "leather" },
  { label: "نایلون", value: "nylon" },
  { label: "ترکیبی", value: "mixed" },
];

const MonitorUsages = [
  { label: "صنعتی", value: "industrial" },
  { label: "ترید", value: "trading" },
  { label: "اداری", value: "office" },
  { label: "گیمینگ", value: "gaming" },
  { label: "طراحی", value: "design" },
];

const compatibilityOptions = [
  { label: "اندروید 6.0 یا بالاتر", value: "android_6_up" },
  { label: "اندروید 8.0 یا بالاتر", value: "android_8_up" },
  { label: "اندروید 10.0 یا بالاتر", value: "android_10_up" },
  { label: "اندروید 11.0 یا بالاتر", value: "android_11_up" },
  { label: "اندروید 12.0 یا بالاتر", value: "android_12_up" },
  { label: "iOS 12.0 یا بالاتر", value: "ios_12_up" },
  { label: "iOS 11.0 یا بالاتر", value: "ios_11_up" },
  { label: "iOS 13.0 یا بالاتر", value: "ios_13_up" },
  { label: "iOS 18.0 یا بالاتر", value: "ios_18_up" },
  { label: "HarmonyOS", value: "harmony" },
];

const sensors = [
  { label: "جی‌پی‌اس (GPS)", value: "gps" },
  { label: "شتاب‌سنج", value: "accelerometer" },
  { label: "حسگر ضربان قلب", value: "heart_rate_monitor" },
  { label: "حسگر اکسیژن خون (SpO2)", value: "spo2" },
  { label: "ژیروسکوپ", value: "gyroscope" },
  { label: "فشارسنج", value: "barometer" },
  { label: "قطب‌نما", value: "compass" },
  { label: "حسگر نور محیط", value: "ambient_light" },
  { label: "حسگر دما", value: "temperature" },
  { label: "الکتروکاردیوگرام (ECG)", value: "ecg" },
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
    TitaniumBlack: { hex: "#333333", label: "مشکی تیتانیومی" },
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
    Cream: { hex: "#ffecca", label: "کرم" },
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

export const getStrapMaterial = (value: string): string => {
  const strapMaterial = strapMaterials.find((m) => m.value === value);
  return strapMaterial ? strapMaterial.label : value;
};

export function getCompatibilityLabels(values: string[]): string[] {
  return values.map(
    (v) => compatibilityOptions.find((opt) => opt.value === v)?.label || v
  );
}

export const getSensors = (values: string[]): string[] => {
  return values.map((v) => sensors.find((opt) => opt.value === v)?.label || v);
};

export const getMonitorUsage = (values: string[]): string => {
  return values
    .map((v) => MonitorUsages.find((opt) => opt.value === v)?.label || v)
    .join(" , ");
};

export function getResolutionInfo(value: string) {
  const options = [
    { label: "1920×1080 (Full HD)", value: "1080p" },
    { label: "2560×1440 (QHD)", value: "1440p" },
    { label: "3840×2160 (4K UHD)", value: "4k" },
    { label: "5120×2880 (5K)", value: "5k" },
    { label: "7680×4320 (8K)", value: "8k" },
  ];
  const found = options.find((opt) => opt.value === value);
  if (!found) return null;

  const match = found.label.match(/^(.+?) \((.+)\)$/);
  if (!match) return null;

  return {
    resolution: match[1], // مثل "1920×1080"
    quality: match[2], // مثل "Full HD"
  };
}

export function toJalali(dateString: string): string {
  const date = new Date(dateString);
  const { jy, jm, jd } = jalaali.toJalaali(date);

  // تبدیل اعداد به فارسی
  const toPersianDigits = (num: number) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  return `${toPersianDigits(jy)}/${toPersianDigits(jm).padStart(2, "۰")}/${toPersianDigits(jd).padStart(2, "۰")}`;
}

export const convertCatOrSubToId = (value: string) => {
  switch (value) {
    // cat
    case "mobile":
      return "686ff08bd6713d28c018821b";

    case "laptop":
      return "68721e69c794390510ef3922";

    case "tablet":
      return "686ff0c7d6713d28c0188278";

    case "Headphones":
      return "68790cf8f95b097b17ae9a5e";

    case "SmartWatch":
      return "687bc143f2c04befa15c8f92";

    case "Monitor":
      return "687bc225f2c04befa15c8fbf";

    // sub

    case "samsungPhone":
      return "68724255c794390510ef3cc5";

    case "iPhone":
      return "687242cdc794390510ef3d0a";

    case "XiaomiPhone":
      return "6872431cc794390510ef3d36";

    case "RealmePhone":
      return "687b566217fd79323bbc24a5";

    case "HonorPhone":
      return "687b56ed17fd79323bbc24da";

    case "appleLaptop":
      return "6872635e5d5a724e3846b756";

    case "asusLaptop":
      return "6872638f5d5a724e3846b778";

    case "lenovoLaptop":
      return "687263c05d5a724e3846b79f";

    case "HPLaptop":
      return "687264235d5a724e3846b7da";

    case "AcerLaptop":
      return "687b5fa017fd79323bbc2826";

    case "MSILaptop":
      return "687b5ff117fd79323bbc2846";

    case "DellLaptop":
      return "687b602c17fd79323bbc286a";

    case "AppleTablet":
      return "68790e40f95b097b17ae9af5";

    case "SamsungTablet":
      return "68790e9bf95b097b17ae9b11";

    case "MicrosoftTablet":
      return "68790ee6f95b097b17ae9b2c";

    case "XiaomiTablet":
      return "687b616f17fd79323bbc28aa";

    case "BeatsHeadphones":
      return "68790dadf95b097b17ae9a98";

    case "RazerHeadphones":
      return "687b633a17fd79323bbc28e2";

    case "AnkerHeadphones":
      return "687b636a17fd79323bbc28fd";

    case "TscoHeadphones":
      return "687b63af17fd79323bbc291a";

    case "AppleWatch":
      return "687bc42cf2c04befa15c900d";

    case "SamsungSmartwatch":
      return "687bc506f2c04befa15c902f";

    case "XiaomiSmartWatch":
      return "687bc549f2c04befa15c908f";

    case "ASUSMonitor":
      return "687bc5b7f2c04befa15c90c3";

    case "SamsungMonitor":
      return "687bc5e5f2c04befa15c90df";

    case "DellMonitor":
      return "687bc627f2c04befa15c9100";

    case "LGMonitor":
      return "687bc655f2c04befa15c9117";

    case "AcerMonitor":
      return "687bc685f2c04befa15c9130";
  }
};

const idToNameMap: Record<string, string> = {
  // cat
  "686ff08bd6713d28c018821b": "mobile",
  "68721e69c794390510ef3922": "laptop",
  "686ff0c7d6713d28c0188278": "tablet",
  "68790cf8f95b097b17ae9a5e": "Headphones",
  "687bc143f2c04befa15c8f92": "SmartWatch",
  "687bc225f2c04befa15c8fbf": "Monitor",

  // sub
  "68724255c794390510ef3cc5": "samsungPhone",
  "687242cdc794390510ef3d0a": "iPhone",
  "6872431cc794390510ef3d36": "XiaomiPhone",
  "687b566217fd79323bbc24a5": "RealmePhone",
  "687b56ed17fd79323bbc24da": "HonorPhone",
  "6872635e5d5a724e3846b756": "appleLaptop",
  "6872638f5d5a724e3846b778": "asusLaptop",
  "687263c05d5a724e3846b79f": "lenovoLaptop",
  "687264235d5a724e3846b7da": "HPLaptop",
  "687b5fa017fd79323bbc2826": "AcerLaptop",
  "687b5ff117fd79323bbc2846": "MSILaptop",
  "687b602c17fd79323bbc286a": "DellLaptop",
  "68790e40f95b097b17ae9af5": "AppleTablet",
  "68790e9bf95b097b17ae9b11": "SamsungTablet",
  "68790ee6f95b097b17ae9b2c": "MicrosoftTablet",
  "687b616f17fd79323bbc28aa": "XiaomiTablet",
  "68790dadf95b097b17ae9a98": "BeatsHeadphones",
  "687b633a17fd79323bbc28e2": "RazerHeadphones",
  "687b636a17fd79323bbc28fd": "AnkerHeadphones",
  "687b63af17fd79323bbc291a": "TscoHeadphones",
  "687bc42cf2c04befa15c900d": "AppleWatch",
  "687bc506f2c04befa15c902f": "SamsungSmartwatch",
  "687bc549f2c04befa15c908f": "XiaomiSmartWatch",
  "687bc5b7f2c04befa15c90c3": "ASUSMonitor",
  "687bc5e5f2c04befa15c90df": "SamsungMonitor",
  "687bc627f2c04befa15c9100": "DellMonitor",
  "687bc655f2c04befa15c9117": "LGMonitor",
  "687bc685f2c04befa15c9130": "AcerMonitor",
};

export const convertIdToCatOrSub = (id: string) => {
  return idToNameMap[id] || null;
};

const nameToPersianMap: Record<string, string> = {
  // cat
  mobile: "موبایل",
  laptop: "لپ‌تاپ",
  tablet: "تبلت",
  Headphones: "هدفون",
  SmartWatch: "ساعت هوشمند",
  Monitor: "مانیتور",

  // subcategories - اسم کامل
  samsungPhone: "موبایل سامسونگ",
  iPhone: "موبایل آیفون",
  XiaomiPhone: "موبایل شیائومی",
  RealmePhone: "موبایل ریلمی",
  HonorPhone: "موبایل آنر",
  appleLaptop: "لپ‌تاپ اپل",
  asusLaptop: "لپ‌تاپ ایسوس",
  lenovoLaptop: "لپ‌تاپ لنوو",
  HPLaptop: "لپ‌تاپ اچ‌پی",
  AcerLaptop: "لپ‌تاپ ایسر",
  MSILaptop: "لپ‌تاپ ام‌اس‌آی",
  DellLaptop: "لپ‌تاپ دل",
  AppleTablet: "تبلت اپل",
  SamsungTablet: "تبلت سامسونگ",
  MicrosoftTablet: "تبلت مایکروسافت",
  XiaomiTablet: "تبلت شیائومی",
  BeatsHeadphones: "هدفون بیتس",
  RazerHeadphones: "هدفون ریزر",
  AnkerHeadphones: "هدفون انکر",
  TscoHeadphones: "هدفون تسکو",
  AppleWatch: "اپل واچ",
  SamsungSmartwatch: "سامسونگ واچ",
  XiaomiSmartWatch: "شیائومی واچ",
  ASUSMonitor: "مانیتور ایسوس",
  SamsungMonitor: "مانیتور سامسونگ",
  DellMonitor: "مانیتور دل",
  LGMonitor: "مانیتور ال‌جی",
  AcerMonitor: "مانیتور ایسر",
};

export const getPersianLabel = (englishName: string) => {
  return nameToPersianMap[englishName] || englishName;
};

export const getDiscountPercent = (product: Product) => {
  const percent =
    product.offPrice &&
    Math.ceil(((product.price - product.offPrice) / product.price) * 100);

  return percent;
};

export const getMainImageUrl = (product: Product) => {
  const mainImageUrl =
    product.images?.find((image) => {
      return image.isMain;
    })?.url ||
    (product.images && product.images[0].url) ||
    "";

  return mainImageUrl;
};
