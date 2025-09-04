"use client";

import { useBreakpoints } from "@/hooks/useBreakPoint";
import {
  ArrowRight,
  ChevronLeft,
  CircleX,
  Search,
  SquareX,
  TextSearch,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/modules/SearchHistory/hooks/useHistory";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export const searchCategories = [
  // * mobile
  {
    categoryName: "گوشی موبایل",
    href: "/mobile",
    keywords: [
      "گوشی موبایل",
      "گوشی",
      "موبایل",
      "خرید گوشی",
      "قیمت گوشی",
      "گوشی ارزان",
      "گوشی پرچمدار",
      "گوشی میان رده",
      "گوشی اقتصادی",
      "گوشی گیمینگ",
      "گوشی ضد آب",
      "گوشی باتری قوی",
      "گوشی حافظه بالا",
      "گوشی رم بالا",
      "گوشی دانشجویی",
      "گوشی دو سیم کارت",
      "گوشی لمسی",
      "اندروید",
      "ios",
      "اسمارت فون",
      "گوشی هوشمند",

      // برندها
      "سامسونگ",
      "samsung",
      "ایفون",
      "iphone",
      "apple",
      "شیائومی",
      "شیاعومی",
      "xiaomi",
      "اپل",
      "گلکسی",
      "ریلمی",
      "realme",
      "آنر",
      "honor",
    ],
  },

  {
    categoryName: "گوشی سامسونگ",
    href: "/mobile/samsungPhone",
    keywords: [
      "گوشی سامسونگ",
      "سامسونگ",
      "samsung",
      "گلکسی s20",
      "گلکسی s20 اولترا",
      "گلکسی s21",
      "گلکسی s21 پلاس",
      "گلکسی s21 اولترا",
      "گلکسی s22",
      "گلکسی s22 پلاس",
      "گلکسی s22 اولترا",
      "گلکسی s23",
      "گلکسی s23 پلاس",
      "گلکسی s23 اولترا",
      "گلکسی s24",
      "گلکسی s24 پلاس",
      "گلکسی s24 اولترا",
      "گلکسی z fold 3",
      "گلکسی z fold 4",
      "گلکسی z fold 5",
      "گلکسی z flip 3",
      "گلکسی z flip 4",
      "گلکسی z flip 5",
      "گلکسی نوت 10",
      "گلکسی نوت 20",
      "a10",
      "a11",
      "a12",
      "a13",
      "a14",
      "a23",
      "a24",
      "a32",
      "a33",
      "a34",
      "a42",
      "a52",
      "a53",
      "a54",
      "a72",
      "a73",
      "m12",
      "m22",
      "m32",
      "m33",
      "m52",
      "m53",
      "f12",
      "f23",
      "f52",
    ],
  },
  {
    categoryName: "گوشی آیفون",
    href: "/mobile/iPhone",
    keywords: [
      "گوشی آیفون",
      "ایفون",
      "آیفون",
      "iphone",
      "ایفون 11",
      "ایفون 11 پرو",
      "ایفون 11 پرو مکس",
      "ایفون 12",
      "ایفون 12 مینی",
      "ایفون 12 پرو",
      "ایفون 12 پرو مکس",
      "ایفون 13",
      "ایفون 13 مینی",
      "ایفون 13 پرو",
      "ایفون 13 پرو مکس",
      "ایفون 14",
      "ایفون 14 پلاس",
      "ایفون 14 پرو",
      "ایفون 14 پرو مکس",
      "ایفون 15",
      "ایفون 15 پلاس",
      "ایفون 15 پرو",
      "ایفون 15 پرو مکس",
      "iphone se",
      "iphone se 2020",
      "iphone se 2022",
    ],
  },
  {
    categoryName: "گوشی شیائومی",
    href: "/mobile/XiaomiPhone",
    keywords: [
      "گوشی شیائومی",
      "شیائومی",
      "شیاعومی",
      "xiaomi",
      "ردمی نوت 8",
      "ردمی نوت 9",
      "ردمی نوت 10",
      "ردمی نوت 10 پرو",
      "ردمی نوت 11",
      "ردمی نوت 11 پرو",
      "ردمی نوت 12",
      "ردمی نوت 12 پرو",
      "ردمی نوت 13",
      "ردمی نوت 13 پرو",
      "ردمی k40",
      "ردمی k50",
      "ردمی k60",
      "ردمی k70",
      "پوکو",
      "poco",
      "پوکو x3",
      "پوکو x3 پرو",
      "پوکو x4",
      "پوکو x4 پرو",
      "پوکو x5",
      "پوکو x5 پرو",
      "پوکو x6",
      "پوکو x6 پرو",
      "پوکو f3",
      "پوکو f4",
      "پوکو f4 gt",
      "پوکو f5",
      "پوکو f5 پرو",
      "پوکو f6",
      "پوکو f6 پرو",
      "mi 10",
      "mi 11",
      "mi 11 lite",
      "mi 11 ultra",
      "mi 12",
      "mi 12t",
      "mi 12 pro",
      "mi 13",
      "mi 13 pro",
      "mi 13 ultra",
      "xiaomi 14",
      "xiaomi 14 pro",
    ],
  },
  {
    categoryName: "گوشی ریلمی",
    href: "/mobile/RealmePhone",
    keywords: [
      "گوشی ریلمی",
      "ریلمی",
      "realme",
      "ریلمی 7",
      "ریلمی 8",
      "ریلمی 9",
      "ریلمی 10",
      "ریلمی 10 پرو",
      "ریلمی 11",
      "ریلمی 11 پرو",
      "ریلمی gt",
      "ریلمی gt neo",
      "ریلمی gt neo 2",
      "ریلمی gt neo 3",
      "ریلمی narzo",
    ],
  },
  {
    categoryName: "گوشی آنر",
    href: "/mobile/HonorPhone",
    keywords: [
      "گوشی آنر",
      "آنر",
      "honor",
      "honor 50",
      "honor 70",
      "honor 80",
      "honor 90",
      "honor 100",
      "honor 200",
      "honor magic 4",
      "honor magic 5",
      "honor magic 6",
    ],
  },

  // * laptop

  {
    categoryName: "لپ‌تاپ",
    href: "/laptop",
    keywords: [
      "لپتاپ",
      "لپ‌تاپ",
      "لبتاب",
      "laptop",
      "notebook",

      "خرید لپ تاپ",
      "قیمت لپ تاپ",
      "لپ تاپ ارزان",
      "لپ تاپ دانشجویی",
      "لپ تاپ گیمینگ",
      "لپ تاپ پرقدرت",
      "لپ تاپ سبک",
      "لپ تاپ لمسی",
      "لپ تاپ حرفه ای",
      "لپ تاپ مهندسی",
      "لپ تاپ برنامه نویسی",
      "لپ تاپ اداری",
      "لپ تاپ دانش آموزی",
      "نوت بوک",
      "ultrabook",
      "gaming laptop",
      "business laptop",

      // برندها
      "dell",
      "لپ تاپ دل",
      "msi",
      "لپ تاپ ام اس آی",
      "acer",
      "لپ تاپ ایسر",
      "hp",
      "لپ تاپ اچ پی",
      "lenovo",
      "لپ تاپ لنوو",
      "asus",
      "لپ تاپ ایسوس",
      "apple",
      "مک بوک",
    ],
  },

  {
    categoryName: "لپ‌تاپ دل",
    href: "/laptop/DellLaptop",
    keywords: [
      // شکل‌های مختلف نوشتن لپ‌تاپ
      "لپتاپ دل",
      "لپ‌تاپ دل",
      "لپتاب دل",
      "لبتاب دل",

      // برند و مدل‌ها
      "دل",
      "dell",
      "dell xps",
      "dell xps 13",
      "dell xps 15",
      "dell inspiron",
      "dell inspiron 15",
      "dell latitude",
      "dell vostro",
      "dell precision",
      "لپ تاپ دل اینسپایرون",
      "لپ تاپ دل لتیتود",
      "لپ تاپ دل وسترو",
      "لپ تاپ دل پرسیشن",
    ],
  },

  {
    categoryName: "لپ‌تاپ ام‌اس‌آی",
    href: "/laptop/MSILaptop",
    keywords: [
      // شکل‌های مختلف نوشتن لپ‌تاپ
      "لپتاپ ام اس آی",
      "لپ‌تاپ ام اس آی",
      "لپتاب ام اس آی",
      "لبتاب ام اس آی",

      // برند و مدل‌ها
      "msi",
      "ام اس آی",
      "msi gaming",
      "msi stealth",
      "msi titan",
      "msi raider",
      "msi creator",
      "msi modern",
      "msi prestige",
      "msi thin",
      "لپ تاپ ام اس آی گیمینگ",
      "لپ تاپ ام اس آی پرستیج",
      "لپ تاپ ام اس آی کریتور",
    ],
  },

  {
    categoryName: "لپ‌تاپ ایسر",
    href: "/laptop/AcerLaptop",
    keywords: [
      "لپتاپ ایسر",
      "لپ‌تاپ ایسر",
      "لپتاب ایسر",
      "لبتاب ایسر",

      "acer",
      "ایسر",
      "acer aspire",
      "acer nitro",
      "acer predator",
      "acer swift",
      "acer spin",
      "acer chromebook",
      "لپ تاپ ایسر اسپایر",
      "لپ تاپ ایسر نیترو",
      "لپ تاپ ایسر پردیتور",
    ],
  },
  {
    categoryName: "لپ‌تاپ اچ‌پی",
    href: "/laptop/HPLaptop",
    keywords: [
      "لپتاپ اچ پی",
      "لپ‌تاپ اچ پی",
      "لپتاب اچ پی",
      "لبتاب اچ پی",

      "hp",
      "اچ پی",
      "hp pavilion",
      "hp envy",
      "hp elitebook",
      "hp probook",
      "hp spectre",
      "omen by hp",
      "لپ تاپ اچ پی پاویلیون",
      "لپ تاپ اچ پی انوی",
      "لپ تاپ اچ پی اسپکتر",
      "لپ تاپ اچ پی پروبوک",
      "لپ تاپ اچ پی الیت بوک",
    ],
  },
  {
    categoryName: "لپ‌تاپ لنوو",
    href: "/laptop/lenovoLaptop",
    keywords: [
      "لپتاپ لنوو",
      "لپ‌تاپ لنوو",
      "لپتاب لنوو",
      "لبتاب لنوو",

      "lenovo",
      "لنوو",
      "lenovo thinkpad",
      "lenovo ideapad",
      "lenovo legion",
      "lenovo yoga",
      "lenovo flex",
      "لپ تاپ لنوو تینک پد",
      "لپ تاپ لنوو آیدیاپد",
      "لپ تاپ لنوو لژیون",
      "لپ تاپ لنوو یوگا",
    ],
  },
  {
    categoryName: "لپ‌تاپ ایسوس",
    href: "/laptop/asusLaptop",
    keywords: [
      "لپتاپ ایسوس",
      "لپ‌تاپ ایسوس",
      "لپتاب ایسوس",
      "لبتاب ایسوس",

      "asus",
      "ایسوس",
      "asus zenbook",
      "asus vivobook",
      "asus tuf gaming",
      "asus rog",
      "asus chromebook",
      "لپ تاپ ایسوس ذن بوک",
      "لپ تاپ ایسوس ویوو بوک",
      "لپ تاپ ایسوس راگ",
      "لپ تاپ ایسوس تاف",
    ],
  },
  {
    categoryName: "مک‌بوک",
    href: "/laptop/appleLaptop",
    keywords: [
      "مک بوک",
      "macbook",
      "مکبوک",
      "لپتاپ اپل",
      "لپ‌تاپ اپل",
      "laptop apple",

      "apple",
      "macbook air",
      "macbook air m1",
      "macbook air m2",
      "macbook pro",
      "macbook pro 13",
      "macbook pro 14",
      "macbook pro 16",
      "apple silicon",
      "لپ تاپ اپل",
      "مک بوک ایر",
      "مک بوک پرو",
    ],
  },

  // * tablet

  {
    categoryName: "تبلت",
    href: "/tablet",
    keywords: [
      "تبلت",
      "خرید تبلت",
      "قیمت تبلت",
      "تبلت دانشجویی",
      "تبلت ارزان",
      "تبلت گیمینگ",
      "تبلت حرفه ای",
      "تبلت نقاشی",
      "تبلت آموزشی",
      "تبلت بچه ها",
      "تبلت سیم کارت خور",
      "تبلت اندروید",
      "ios تبلت",
      "windows tablet",
      "تبلت ویندوزی",
      "تبلت کیبورد دار",
      "تبلت با قلم",
      "اسمارت تبلت",

      // برندها
      "samsung tablet",
      "تبلت سامسونگ",
      "apple ipad",
      "اپل آیپد",
      "ipad",
      "lenovo tablet",
      "تبلت لنوو",
      "microsoft surface",
      "تبلت مایکروسافت",
    ],
  },
  {
    categoryName: "تبلت لنوو",
    href: "/tablet/LenovoTablet",
    keywords: [
      "lenovo tablet",
      "تبلت لنوو",
      "لنوو",
      "lenovo tab m7",
      "lenovo tab m8",
      "lenovo tab m9",
      "lenovo tab m10",
      "lenovo tab p11",
      "lenovo tab p12",
      "lenovo yoga tab",
      "lenovo tab k10",
      "تبلت لنوو m8",
      "تبلت لنوو p11",
      "تبلت لنوو یوگا",
    ],
  },
  {
    categoryName: "تبلت مایکروسافت",
    href: "/tablet/MicrosoftTablet",
    keywords: [
      "microsoft surface",
      "تبلت مایکروسافت",
      "مایکروسافت",
      "microsoft surface go",
      "microsoft surface go 3",
      "microsoft surface pro 7",
      "microsoft surface pro 8",
      "microsoft surface pro 9",
      "microsoft surface pro x",
      "microsoft surface book",
      "تبلت سرفیس",
      "تبلت مایکروسافت پرو",
      "سرفیس گو",
      "سرفیس پرو",
    ],
  },
  {
    categoryName: "تبلت سامسونگ",
    href: "/tablet/SamsungTablet",
    keywords: [
      "samsung tablet",
      "تبلت سامسونگ",
      "سامسونگ",
      "samsung galaxy tab a7",
      "samsung galaxy tab a8",
      "samsung galaxy tab s6",
      "samsung galaxy tab s7",
      "samsung galaxy tab s7 fe",
      "samsung galaxy tab s8",
      "samsung galaxy tab s8 ultra",
      "samsung galaxy tab s9",
      "samsung galaxy tab s9 ultra",
      "galaxy tab active",
      "تبلت سامسونگ a7",
      "تبلت سامسونگ s6",
      "تبلت سامسونگ s8",
      "تبلت سامسونگ s9",
    ],
  },
  {
    categoryName: "آیپد اپل",
    href: "/tablet/AppleTablet",
    keywords: [
      "اپل آیپد",
      "اپل",
      "ipad",
      "ipad pro",
      "ipad pro 11",
      "ipad pro 12.9",
      "ipad air",
      "ipad air m1",
      "ipad air m2",
      "ipad mini",
      "ipad mini 6",
      "ipad 9th generation",
      "ipad 10th generation",
      "apple pencil",
      "آیپد پرو",
      "آیپد ایر",
      "آیپد مینی",
    ],
  },

  // * Headphones
  {
    categoryName: "هدفون",
    href: "/headphones",
    keywords: [
      "هدفون",
      "خرید هدفون",
      "قیمت هدفون",
      "هدفون بی سیم",
      "هدفون سیمی",
      "هدفون بلوتوثی",
      "هدفون گیمینگ",
      "هدفون موسیقی",
      "هدفون حرفه ای",
      "ایرفون",
      "هندزفری",
      "هدست",
      "هدفون با میکروفون",
      "هدفون سبک",
      "هدفون نویز کنسلینگ",
      "noise cancelling",
      "wireless headphones",
      "gaming headset",

      // برندها
      "tsco headphones",
      "هدفون تسکو",
      "anker headphones",
      "هدفون انکر",
      "razer headphones",
      "هدفون ریزر",
      "beats headphones",
      "هدفون بیتس",
    ],
  },

  {
    categoryName: "هدفون تسکو",
    href: "/headphones/TscoHeadphones",
    keywords: [
      "tsco headphones",
      "هدفون تسکو",
      "تسکو",
      "tsco th 5124",
      "tsco th 5356",
      "tsco th 5324",
      "tsco th 5330",
      "tsco th 5340",
      "tsco th 5355",
      "tsco th 5370",
      "tsco th 5371",
      "هدفون بی سیم تسکو",
      "هدفون سیمی تسکو",
      "هندزفری تسکو",
    ],
  },

  {
    categoryName: "هدفون انکر",
    href: "/headphones/AnkerHeadphones",
    keywords: [
      "anker headphones",
      "هدفون انکر",
      "انکر",
      "anker soundcore life q20",
      "anker soundcore life q30",
      "anker soundcore life q35",
      "anker soundcore space q45",
      "anker soundcore liberty air 2",
      "anker soundcore liberty 3 pro",
      "anker soundcore sport x10",
      "anker soundcore r100",
      "anker soundcore r500",
      "هدفون بلوتوث انکر",
      "ایرفون انکر",
    ],
  },

  {
    categoryName: "هدفون ریزر",
    href: "/headphones/RazerHeadphones",
    keywords: [
      "razer headphones",
      "هدفون ریزر",
      "ریزر",
      "razer kraken",
      "razer kraken x",
      "razer kraken v3",
      "razer blackshark v2",
      "razer barracuda",
      "razer barracuda x",
      "razer nari",
      "razer thresher",
      "razer hammerhead",
      "هدفون گیمینگ ریزر",
      "هدست ریزر",
    ],
  },

  {
    categoryName: "هدفون بیتس",
    href: "/headphones/BeatsHeadphones",
    keywords: [
      "beats headphones",
      "هدفون بیتس",
      "بیتس",
      "beats solo pro",
      "beats solo 3",
      "beats studio 3",
      "beats studio buds",
      "beats fit pro",
      "beats powerbeats",
      "beats powerbeats pro",
      "beats flex",
      "هدفون بیتس بی سیم",
      "هدفون بیتس استودیو",
      "ایرفون بیتس",
    ],
  },

  // * SmartWatch
  {
    categoryName: "ساعت هوشمند",
    href: "/smartwatch",
    keywords: [
      "ساعت هوشمند",
      "خرید ساعت هوشمند",
      "قیمت ساعت هوشمند",
      "اسمارت واچ",
      "smart watch",
      "مچ بند هوشمند",
      "دستبند هوشمند",
      "ساعت ورزشی",
      "ساعت فیتنس",
      "ساعت سلامتی",
      "ساعت هوشمند ضد آب",
      "ساعت هوشمند سیم کارت خور",
      "ساعت هوشمند تماس",
      "ساعت هوشمند اندروید",
      "ساعت هوشمند ios",
      "wearable",

      // برندها
      "xiaomi smartwatch",
      "ساعت هوشمند شیائومی",
      "ساعت هوشمند شیاعومی",
      "samsung smartwatch",
      "ساعت هوشمند سامسونگ",
      "apple watch",
      "اپل واچ",
    ],
  },

  {
    categoryName: "ساعت هوشمند شیائومی",
    href: "/smartwatch/XiaomiSmartWatch",
    keywords: [
      "xiaomi smartwatch",
      "ساعت هوشمند شیائومی",
      "ساعت هوشمند شیاعومی",
      "شیائومی",
      "شیاعومی",
      "xiaomi mi band 5",
      "xiaomi mi band 6",
      "xiaomi mi band 7",
      "xiaomi mi band 8",
      "xiaomi mi band 8 pro",
      "xiaomi watch s1",
      "xiaomi watch s1 active",
      "xiaomi watch 2 pro",
      "xiaomi redmi watch 2 lite",
      "xiaomi redmi watch 3",
      "xiaomi redmi watch 3 active",

      "ساعت هوشمند شیائومی واچ",
      "ساعت هوشمند شیاعومی واچ",
      "مچ بند هوشمند شیائومی",
      "مچ بند هوشمند شیاعومی",
    ],
  },
  {
    categoryName: "ساعت هوشمند سامسونگ",
    href: "/smartwatch/SamsungSmartwatch",
    keywords: [
      "samsung smartwatch",
      "ساعت هوشمند سامسونگ",
      "سامسونگ",
      "samsung galaxy watch active 2",
      "samsung galaxy watch 3",
      "samsung galaxy watch 4",
      "samsung galaxy watch 4 classic",
      "samsung galaxy watch 5",
      "samsung galaxy watch 5 pro",
      "samsung galaxy watch 6",
      "samsung galaxy watch 6 classic",
      "galaxy fit 2",
      "galaxy fit 3",
      "ساعت هوشمند سامسونگ گلکسی واچ",
      "مچ بند هوشمند سامسونگ",
      "گلکسی فیت",
    ],
  },
  {
    categoryName: "اپل واچ",
    href: "/smartwatch/AppleWatch",
    keywords: [
      "apple watch",
      "اپل واچ",
      "اپل",
      "apple watch series 5",
      "apple watch series 6",
      "apple watch series 7",
      "apple watch series 8",
      "apple watch series 9",
      "apple watch ultra",
      "apple watch ultra 2",
      "apple watch se",
      "apple watch se 2",
      "اپل واچ سری 5",
      "اپل واچ سری 6",
      "اپل واچ سری 7",
      "اپل واچ سری 8",
      "اپل واچ سری 9",
      "اپل واچ اولترا",
      "اپل واچ اس ای",
    ],
  },

  // * Monitor

  {
    categoryName: "مانیتور",
    href: "/monitor",
    keywords: [
      "مانیتور",
      "خرید مانیتور",
      "قیمت مانیتور",
      "نمایشگر",
      "صفحه نمایش",
      "مانیتور کامپیوتر",
      "مانیتور لپ تاپ",
      "مانیتور اداری",
      "مانیتور گیمینگ",
      "مانیتور طراحی",
      "مانیتور 4k",
      "مانیتور 2k",
      "مانیتور فول اچ دی",
      "مانیتور التراواید",
      "ultrawide monitor",
      "gaming monitor",
      "professional monitor",
      "monitor curved",
      "مانیتور خمیده",
      "مانیتور لمسی",
    ],
  },

  {
    categoryName: "مانیتور ایسر",
    href: "/monitor/AcerMonitor",
    keywords: [
      "ایسر",
      "acer",
      "acer monitor",
      "مانیتور acer",
      "acer nitro monitor",
      "acer predator monitor",
      "acer gaming monitor",
      "مانیتور ایسر نیترو",
      "مانیتور ایسر پرداتور",
      "acer 4k monitor",
      "acer curved monitor",
      "acer 144hz monitor",
    ],
  },
  {
    categoryName: "مانیتور ال جی",
    href: "/monitor/LGMonitor",
    keywords: [
      "LG",
      "ال جی",
      "lg",
      "lg monitor",
      "مانیتور lg",
      "lg ultragear",
      "lg ultrawide monitor",
      "lg gaming monitor",
      "lg 4k monitor",
      "lg 5k monitor",
      "lg curved monitor",
      "lg ips monitor",
      "lg monitor 144hz",
    ],
  },
  {
    categoryName: "مانیتور دل",
    href: "/monitor/DellMonitor",
    keywords: [
      "دل",
      "dell",
      "dell monitor",
      "مانیتور dell",
      "dell ultrasharp",
      "dell gaming monitor",
      "dell 4k monitor",
      "dell curved monitor",
      "dell ips monitor",
      "مانیتور دل اولتراشارپ",
      "dell office monitor",
      "مانیتور اداری دل",
    ],
  },
  {
    categoryName: "مانیتور سامسونگ",
    href: "/monitor/SamsungMonitor",
    keywords: [
      "samsung",
      "samsung monitor",
      "مانیتور سامسونگ",
      "سامسونگ",
      "samsung odyssey g3",
      "samsung odyssey g5",
      "samsung odyssey g7",
      "samsung odyssey g9",
      "مانیتور سامسونگ ادیسه",
      "samsung curved monitor",
      "samsung 4k monitor",
      "samsung 144hz monitor",
    ],
  },
  {
    categoryName: "مانیتور ایسوس",
    href: "/monitor/ASUSMonitor",
    keywords: [
      "ایسوس",
      "مانیتور asus",
      "asus",
      "asus tuf gaming monitor",
      "asus rog swift",
      "asus gaming monitor",
      "asus curved monitor",
      "asus 4k monitor",
      "asus 2k monitor",
      "asus 240hz monitor",
      "مانیتور ایسوس گیمینگ",
    ],
  },
];

const popularSearches = [
  { label: "گوشی", href: "/mobile" },
  { label: "مک بوک", href: "/laptop/appleLaptop" },
  { label: "تبلت شیائومی", href: "/tablet/XiaomiTablet" },
  { label: "آیفون", href: "/mobile/iPhone" },
  { label: "poco", href: "/products?search=poco" },
  { label: "تسکو", href: "/products?search=تسکو" },
  { label: "انکر", href: "/products?search=انکر" },
  { label: "گوشی سامسونگ", href: "/mobile/samsungPhone" },
  { label: "اپل واچ", href: "/SmartWatch/AppleWatch" },
  { label: "گوشی ریلمی", href: "/mobile/RealmePhone" },
];

interface SearchBarmodalProps {
  userName?: string;
  isSearchBarModalOpened: boolean;
  setIsSearchBarModalOpened: Dispatch<SetStateAction<boolean>>;
}

const SearchBarmodal = ({
  isSearchBarModalOpened,
  setIsSearchBarModalOpened,
}: SearchBarmodalProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const trpc = useTRPC();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 500); // نیم ثانیه

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const _products = useQuery(
    trpc.products.getSearchMany.queryOptions(
      { search: debouncedQuery },
      {
        enabled: !!debouncedQuery,
      },
    ),
  ).data?.docs;

  const products =
    _products &&
    Array.from(new Map(_products.map((p) => [p.label, p])).values());

  const catResults = searchCategories.filter((cat) =>
    cat.keywords.some((kw) =>
      kw.toLowerCase().includes(searchValue.toLowerCase()),
    ),
  );

  const router = useRouter();
  const { addSearch, clearSearches, searches } = useSearch();
  const { sm } = useBreakpoints();
  const searchbarRef = useRef<HTMLInputElement>(null);
  const mobileSearchbarRef = useRef<HTMLInputElement>(null);

  const handleSearchResult = () => {
    setIsSearchBarModalOpened(false);
    addSearch(searchValue);
    router.push(`/products?search=${searchValue}`);
  };

  const handleClose = () => {
    setIsSearchBarModalOpened(false);
    setSearchValue("");
  };

  useEffect(() => {
    if (isSearchBarModalOpened) {
      const timer = setTimeout(() => {
        searchbarRef.current?.focus();
        mobileSearchbarRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSearchBarModalOpened]);

  return (
    <AnimatePresence>
      {isSearchBarModalOpened && (
        <div
          className="fixed top-0 right-0 z-[500] mx-auto block min-h-screen w-full max-w-[1920px] min-w-screen bg-zinc-900/50"
          onClick={() => setIsSearchBarModalOpened(false)}
        >
          {/* pc content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-lg:hidden lg:mx-auto lg:w-[90%]"
          >
            <div
              className="s:mt-[132.5px] mt-[118.5px] mr-6 flex w-full flex-col gap-y-4 sm:mt-[140.5px] md:mt-[156.5px] lg:mt-[76px] lg:mr-[190.583px] lg:w-fit"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* searchBar */}
              <div
                onClick={() => setIsSearchBarModalOpened(true)}
                className="relative flex h-10 w-[calc(100%-48px)] gap-x-4 rounded-md bg-[#f0f0f0] px-4 py-3 sm:w-[calc(100%-204px)] md:h-12 lg:h-14 lg:w-115 xl:w-150"
              >
                <motion.span
                  className="flex items-center justify-center text-xl text-gray-400 sm:text-3xl"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <Search />
                </motion.span>
                <input
                  ref={searchbarRef}
                  placeholder={
                    !sm
                      ? "جستجو ..."
                      : "محصول، برند یا دسته مورد نظرتان را جستجو کنید"
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-[#f0f0f0] text-[14px] focus:outline-0"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (searchValue === "آیفون" || searchValue === "ایفون") {
                        router.push(`/mobile/iPhone`);
                      } else {
                        addSearch(searchValue);
                        router.push(`/products?search=${searchValue}`);
                      }

                      handleClose();
                    }
                  }}
                />
              </div>
              {/* result */}
              <div className="flex h-125 w-[calc(100%-48px)] flex-col rounded-xl bg-white pb-4 shadow-lg sm:w-[calc(100%-204px)] lg:w-115 xl:w-150">
                {/* header */}
                {searchValue.length > 0 && (
                  <div
                    onClick={() => handleSearchResult()}
                    className="mr-4.75 ml-5.75 flex cursor-pointer items-center justify-between border-b border-b-[#223c78] pt-5 pb-3"
                  >
                    <div className="flex items-center gap-x-1.5">
                      <TextSearch color="#6c6c6c" size={20} />
                      <div className="pb-0.5 text-sm font-light text-[#6c6c6c]">
                        جستجو برای...
                      </div>
                      <div className="mr-0.5 text-sm text-[#678ec2]">
                        {searchValue}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <div className="pb-0.25 text-xs font-medium text-[#28417b]">
                        مشاهده همه نتایج
                      </div>
                      <div>
                        <ChevronLeft
                          strokeWidth={2.5}
                          color="#28417b"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {debouncedQuery.length > 0 ? (
                  <ScrollArea dir="rtl" className="max-h-[429px]">
                    <>
                      {/* categories  */}
                      {catResults.length > 0 ? (
                        <div className="mr-4.75 ml-5.75 flex flex-col gap-y-4 border-b border-b-[#c0c0c0] pt-3 pb-4 xl:pt-4 xl:pb-5">
                          <div className="flex items-center gap-x-1.5">
                            <span className="max-xl:hidden">
                              <Search color="#222222" size={18} />
                            </span>
                            <span className="xl:hidden">
                              <Search color="#222222" size={16} />
                            </span>
                            <span className="text-xs text-[#222222] xl:text-[15px]">
                              در دسته بندی
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 xl:gap-3">
                            {catResults.slice(0, 7).map((result, index) => {
                              return (
                                <Link
                                  onClick={() => handleClose()}
                                  href={result.href}
                                  key={index}
                                  className="flex items-center gap-x-1 rounded-full border border-[#d1d3d3] py-1.25 pr-3 pl-2 xl:py-1.75 xl:pr-4 xl:pl-3"
                                >
                                  <span className="text-xs text-[#333333] xl:pb-0.5 xl:text-sm">
                                    {result.categoryName}
                                  </span>
                                  <span className="max-xl:hidden">
                                    <ChevronLeft size={18} color="#333333" />
                                  </span>
                                  <span className="xl:hidden">
                                    <ChevronLeft size={14} color="#333333" />
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <PopularSearches
                          setIsSearchBarModalOpened={setIsSearchBarModalOpened}
                          setSearchValue={setSearchValue}
                        />
                      )}
                      {/* products */}
                      {products && products?.length > 0 && (
                        <div className="mr-4.75 ml-5.75 flex flex-col gap-y-4 overflow-hidden py-4">
                          <div className="flex items-center gap-x-1 text-xs text-[#222222]">
                            <span>تمامی محصولات</span>
                            <span className="">{searchValue}</span>
                          </div>

                          <div className="flex flex-col gap-y-2.75">
                            {products.map((product, index) => {
                              return (
                                <Link
                                  onClick={() => handleClose()}
                                  className="flex w-full items-center gap-x-4 rounded-lg bg-[#f3f8fd] px-3 py-2"
                                  href={`/products/${product.order}_${product.label}`}
                                >
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.order.toString()}
                                    width={56}
                                    height={56}
                                  />
                                  <div className="text-xs text-[#222222]">
                                    {product.label}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  </ScrollArea>
                ) : (
                  <>
                    {/* user history */}

                    {searches.length > 0 && (
                      <div className="flex h-[124px] flex-col gap-y-3 overflow-y-hidden rounded-t-xl bg-[#f8f8f8] py-4 pr-4.75 pl-5.75">
                        <div className="mt-1 flex items-center justify-between">
                          <div className="pr-1 text-sm font-medium text-[#333333]">
                            جستجو های شما
                          </div>

                          <div
                            onClick={() => clearSearches()}
                            className="cursor-pointer"
                          >
                            <Trash2 color="#333333" size={18} />
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          {searches
                            .slice(0)
                            .reverse()
                            .map((search, index) => {
                              return (
                                <Link
                                  onClick={() =>
                                    setIsSearchBarModalOpened(false)
                                  }
                                  href={`/products?search=${search}`}
                                  key={index}
                                  className="rounded-full border border-[#d1d3d3] px-4 py-1.5 text-xs font-light text-[#7b7b7b]"
                                >
                                  {search}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* popular searches */}
                    <PopularSearches
                      setIsSearchBarModalOpened={setIsSearchBarModalOpened}
                      setSearchValue={setSearchValue}
                    />
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* mobile content */}
          <>
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="s:p-4 h-screen max-h-[1080px] min-h-fit w-full min-w-screen bg-white px-2 py-4 lg:hidden"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="mb-5 flex items-center gap-x-2">
                {/* searchBar */}
                <div
                  onClick={() => setIsSearchBarModalOpened(true)}
                  className="relative flex h-10 w-full gap-x-4 rounded-md bg-[#f0f0f0] px-4 py-3 md:h-12 lg:h-14"
                >
                  <span className="flex items-center justify-center text-xl text-gray-400 sm:text-3xl">
                    <Search />
                  </span>
                  <input
                    ref={mobileSearchbarRef}
                    placeholder={
                      !sm
                        ? "جستجو ..."
                        : "محصول، برند یا دسته مورد نظرتان را جستجو کنید"
                    }
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full bg-[#f0f0f0] text-[14px] focus:outline-0"
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (
                          searchValue === "آیفون" ||
                          searchValue === "ایفون"
                        ) {
                          router.push(`/mobile/iPhone`);
                        } else {
                          addSearch(searchValue);
                          router.push(`/products?search=${searchValue}`);
                        }

                        handleClose();
                      }
                    }}
                  />
                </div>

                {/* close button */}
                <button
                  onClick={() => setIsSearchBarModalOpened(false)}
                  className="flex size-10 cursor-pointer items-center justify-center text-xl text-gray-400 sm:text-3xl"
                >
                  <span className="max-s:hidden">
                    <X size={32} color="#242424" />
                  </span>
                  <span className="s:hidden">
                    <X size={24} color="#242424" />
                  </span>
                </button>
              </div>

              {/* result */}
              <div className="flex h-screen w-full flex-col rounded-xl bg-white pb-4">
                {/* header */}
                {searchValue.length > 0 && (
                  <div
                    onClick={() => handleSearchResult()}
                    className="s:mr-4.75 s:ml-5.75 mr-2.75 ml-3.75 flex cursor-pointer items-center justify-between border-b border-b-[#223c78] pt-5 pb-3"
                  >
                    <div className="flex items-center gap-x-1.5">
                      <TextSearch color="#6c6c6c" size={20} />
                      <div className="pb-0.5 text-sm font-light text-[#6c6c6c]">
                        جستجو برای...
                      </div>
                      <div className="mr-0.5 text-sm text-[#678ec2]">
                        {searchValue}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <div className="pb-0.25 text-xs font-medium text-[#28417b]">
                        مشاهده همه نتایج
                      </div>
                      <div>
                        <ChevronLeft
                          strokeWidth={2.5}
                          color="#28417b"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {debouncedQuery.length > 0 ? (
                  <>
                    {/* categories  */}
                    {catResults.length > 0 ? (
                      <div className="s:mr-4.75 s:ml-5.75 mr-2.75 ml-3.75 flex flex-col gap-y-4 border-b border-b-[#c0c0c0] pt-3 pb-4 xl:pt-4 xl:pb-5">
                        <div className="flex items-center gap-x-1.5">
                          <span className="max-xl:hidden">
                            <Search color="#222222" size={18} />
                          </span>
                          <span className="xl:hidden">
                            <Search color="#222222" size={16} />
                          </span>
                          <span className="text-xs text-[#222222] xl:text-[15px]">
                            در دسته بندی
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 xl:gap-3">
                          {catResults.slice(0, 7).map((result, index) => {
                            return (
                              <Link
                                onClick={() => handleClose()}
                                href={result.href}
                                key={index}
                                className="flex items-center gap-x-1 rounded-full border border-[#d1d3d3] py-1.25 pr-3 pl-2 xl:py-1.75 xl:pr-4 xl:pl-3"
                              >
                                <span className="text-xs text-[#333333] xl:pb-0.5 xl:text-sm">
                                  {result.categoryName}
                                </span>
                                <span className="max-xl:hidden">
                                  <ChevronLeft size={18} color="#333333" />
                                </span>
                                <span className="xl:hidden">
                                  <ChevronLeft size={14} color="#333333" />
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <PopularSearches
                        setIsSearchBarModalOpened={setIsSearchBarModalOpened}
                        setSearchValue={setSearchValue}
                      />
                    )}
                    {/* products */}
                    {products && products?.length > 0 && (
                      <div className="s:mr-4.75 s:ml-5.75 mr-2.75 ml-3.75 flex flex-col gap-y-4 overflow-hidden py-4">
                        <div className="flex items-center gap-x-1 text-xs text-[#222222]">
                          <span>تمامی محصولات</span>
                          <span className="">{searchValue}</span>
                        </div>
                        <ScrollArea dir="rtl" className="h-[80%]">
                          <div className="flex flex-col gap-y-2.75">
                            {products.map((product, index) => {
                              return (
                                <Link
                                  onClick={() => handleClose()}
                                  className="flex w-full items-center gap-x-4 rounded-lg bg-[#f3f8fd] px-3 py-2"
                                  href={`/products/${product.order}_${product.label}`}
                                >
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.order.toString()}
                                    width={56}
                                    height={56}
                                  />
                                  <div className="productlist-title text-xs text-[#222222]">
                                    {product.label}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* user history */}

                    {searches.length > 0 && (
                      <div className="s:pr-4.75 s:pl-5.75 flex h-[124px] flex-col gap-y-3 overflow-y-hidden bg-[#f8f8f8] py-4 pr-2.75 pl-3.75 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="pr-1 text-sm font-medium text-[#333333]">
                            جستجو های شما
                          </div>

                          <div
                            onClick={() => clearSearches()}
                            className="cursor-pointer"
                          >
                            <Trash2 color="#333333" size={18} />
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1.75 gap-2 s:gap-2.5">
                          {searches
                            .slice(0)
                            .reverse()
                            .map((search, index) => {
                              return (
                                <Link
                                  onClick={() =>
                                    setIsSearchBarModalOpened(false)
                                  }
                                  href={`/products?search=${search}`}
                                  key={index}
                                  className="rounded-full border border-[#d1d3d3] px-4 py-1.5 text-xs font-light text-[#7b7b7b]"
                                >
                                  {search}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* popular searches */}
                    <PopularSearches
                      setIsSearchBarModalOpened={setIsSearchBarModalOpened}
                      setSearchValue={setSearchValue}
                    />
                  </>
                )}
              </div>
            </motion.div>
          </>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchBarmodal;

interface PopularSearchesProps {
  setIsSearchBarModalOpened: Dispatch<SetStateAction<boolean>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const PopularSearches = ({
  setIsSearchBarModalOpened,
  setSearchValue,
}: PopularSearchesProps) => {
  const handleClose = () => {
    setIsSearchBarModalOpened(false);
    setSearchValue("");
  };
  return (
    <div className="s:pr-4.75 s:pl-5.75 flex flex-col gap-y-3 py-4 pr-2.75 pl-3.75">
      <div className="pr-1 text-sm font-medium text-[#333333]">
        جستجو های محبوب
      </div>
      <div className="flex flex-wrap items-center gap-2 s:gap-2.5">
        {popularSearches.map((search, index) => {
          return (
            <Link
              onClick={() => handleClose()}
              href={search.href}
              key={index}
              className="px-r rounded-full border border-[#d1d3d3] px-4 py-1.5 text-xs font-light text-[#7b7b7b]"
            >
              {search.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
