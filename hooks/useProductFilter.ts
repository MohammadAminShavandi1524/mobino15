import { useQueryStates } from "nuqs";
import {
  createLoader,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

// * products collection colors (all colors)

const colors = [
  { label: "مشکی تیتانیوم", value: "TitaniumBlack" },
  { label: "مشکی", value: "Black" },
  { label: "نقره‌ای", value: "Silver" },
  { label: "بنفش", value: "Purple" },
  { label: "زرد", value: "yellow" },
  { label: "آبی تیره", value: "DarkBlue" },
  { label: "لیمویی", value: "Lemon" },
  { label: "نقره ای تیتانیوم", value: "TitaniumSilver" },
  { label: "خاکستری تیره", value: "DarkGray" },
  { label: "نچرال تیتانیوم", value: "NaturalTitanium" },
  { label: "طلایی", value: "Golden" },
  { label: "خاکستری تیتانیوم", value: "TitaniumGray" },
  { label: "آبی یخی تیتانیوم", value: "TitaniumIceBlue" },
  { label: "خاکستری", value: "Gray" },
  { label: "سرمه‌ای", value: "NavyBlue" },
  { label: "آجری", value: "Brick" },
  { label: "صحرایی تیتانیوم", value: "TitaniumDesert" },
  { label: "بنفش تیتانیوم", value: "TitaniumPurple" },
  { label: "جت‌بلک تیتانیوم", value: "JetBlackTitanium" },
  { label: "سبز روشن", value: "LightGreen" },
  { label: "فیروزه‌ای", value: "Turquoise" },
  { label: "خاکستری روشن", value: "LightGray" },
  { label: "آبی روشن", value: "LightBlue" },
  { label: "صورتی", value: "Pink" },
  { label: "سفید تیتانیوم", value: "TitaniumWhite" },
  { label: "سبز", value: "Green" },
  { label: "کرم", value: "Cream" },
  { label: "آبی", value: "Blue" },
  { label: "سفید", value: "White" },
  { label: "قرمز", value: "Red" },
  { label: "نارنجی", value: "Orange" },
  { label: "گرافیتی", value: "graphite" },
  { label: "آبی اقیانوسی", value: "oceanBlue" },
  { label: "رزگلد", value: "roseGold" },
  { label: "سبز زیتونی", value: "oliveGreen" },
  { label: "مسی", value: "copper" },
  { label: "برنز", value: "bronze" },
  { label: "نوک‌مدادی", value: "charcoalGray" },
  { label: "آبی آسمانی", value: "skyBlue" },
  { label: "یاسی", value: "lilac" },
  { label: "سبز نعنایی", value: "mintGreen" },
] as const;

// * divided products collection colors

const groupedColors = {
  WhiteGroup: [
    { label: "سفید تیتانیوم", value: "TitaniumWhite" },
    { label: "سفید", value: "White" },
  ],
  BlackGroup: [
    { label: "مشکی تیتانیوم", value: "TitaniumBlack" },
    { label: "مشکی", value: "Black" },
    { label: "جت‌بلک تیتانیوم", value: "JetBlackTitanium" },
  ],
  BlueGroup: [
    { label: "آبی تیره", value: "DarkBlue" },
    { label: "آبی یخی تیتانیوم", value: "TitaniumIceBlue" },
    { label: "آبی روشن", value: "LightBlue" },
    { label: "آبی", value: "Blue" },
    { label: "سرمه‌ای", value: "NavyBlue" },
    { label: "آبی اقیانوسی", value: "oceanBlue" },
    { label: "آبی آسمانی", value: "skyBlue" },
  ],
  YellowGroup: [
    { label: "زرد", value: "yellow" },
    { label: "لیمویی", value: "Lemon" },
    { label: "کرم", value: "Cream" },
    { label: "طلایی", value: "Golden" },
  ],
  NeutralGroup: [
    { label: "نقره‌ای", value: "Silver" },
    { label: "نقره ای تیتانیوم", value: "TitaniumSilver" },
    { label: "خاکستری تیره", value: "DarkGray" },
    { label: "خاکستری تیتانیوم", value: "TitaniumGray" },
    { label: "خاکستری", value: "Gray" },
    { label: "خاکستری روشن", value: "LightGray" },
    { label: "نچرال تیتانیوم", value: "NaturalTitanium" },
    { label: "گرافیتی", value: "graphite" },
    { label: "نوک‌مدادی", value: "charcoalGray" },
    { label: "صحرایی تیتانیوم", value: "TitaniumDesert" },
  ],
  GreenGroup: [
    { label: "سبز", value: "Green" },
    { label: "سبز روشن", value: "LightGreen" },
    { label: "سبز زیتونی", value: "oliveGreen" },
    { label: "سبز نعنایی", value: "mintGreen" },
  ],
  PinkGroup: [
    { label: "صورتی", value: "Pink" },
    { label: "رزگلد", value: "roseGold" },
    { label: "یاسی", value: "lilac" },
  ],
  RedGroup: [
    { label: "قرمز", value: "Red" },
    { label: "آجری", value: "Brick" },
    { label: "نارنجی", value: "Orange" },
    { label: "مسی", value: "copper" },
    { label: "برنز", value: "bronze" },
  ],
  PurpleGroup: [
    { label: "بنفش", value: "Purple" },
    { label: "بنفش تیتانیوم", value: "TitaniumPurple" },
  ],
};

export const GroupedColors = [
  "WhiteGroup",
  "BlackGroup",
  "BlueGroup",
  "YellowGroup",
  "NeutralGroup",
  "GreenGroup",
  "PinkGroup",
  "RedGroup",
  "PurpleGroup",
];

export const AllBrandOptions = [
  // ? Common
  {
    label: "اپل",
    value: "apple",
    category: ["mobile", "laptop", "tablet", "SmartWatch"],
  },
  {
    label: "سامسونگ",
    value: "samsung",
    category: ["mobile", "tablet", "SmartWatch", "Monitor"],
  },
  {
    label: "شیائومی",
    value: "xiaomi",
    category: ["mobile", "tablet", "SmartWatch"],
  },
  { label: "دل", value: "dell", category: ["laptop", "Monitor"] },
  { label: "ایسوس", value: "asus", category: ["laptop", "Monitor"] },
  { label: "ایسر", value: "acer", category: ["laptop", "Monitor"] },

  // * mobile

  { label: "آنر", value: "honor", category: ["mobile"] },
  { label: "ریلمی", value: "realme", category: ["mobile"] },

  // * laptop

  { label: "لنوو", value: "lenovo", category: ["laptop"] },
  { label: "اچ پی", value: "hp", category: ["laptop"] },
  { label: "ام اس آی", value: "msi", category: ["laptop"] },

  // * tablet

  { label: "مایکروسافت", value: "microsoft", category: ["tablet"] },

  // * Headphones

  { label: "بیتس", value: "beats", category: ["Headphones"] },
  { label: "ریزر", value: "razer", category: ["Headphones"] },
  { label: "انکر", value: "anker", category: ["Headphones"] },
  { label: "تسکو", value: "tsco", category: ["Headphones"] },

  // *SmartWatch

  // *Monitor

  { label: "LG", value: "lg", category: ["Monitor"] },
];

export const Brands = [
  // ? Common

  "apple",
  "samsung",
  "xiaomi",

  // * mobile

  "realme",
  "honor",

  // * laptop

  "lenovo",
  "asus",
  "hp",
  "msi",
  "dell",
  "acer",

  // * tablet

  "microsoft",

  // * headphones

  "beats",
  "razer",
  "anker",
  "tsco",

  // *Monitor
];

export const params = {
  search: parseAsString.withOptions({
    clearOnDefault: true,
  }),

  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  available: parseAsBoolean.withOptions({ clearOnDefault: true }),
  color: parseAsArrayOf(parseAsStringLiteral(GroupedColors)).withOptions({
    clearOnDefault: true,
  }),
  brand: parseAsArrayOf(parseAsStringLiteral(Brands)).withOptions({
    clearOnDefault: true,
  }),
  sort: parseAsStringLiteral([
    "MostPopular",
    "HighestPrice",
    "LowestPrice",
    "BiggestDiscount",
  ]).withOptions({
    clearOnDefault: true,
  }),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};

export const LoadProductFilters = createLoader(params);
