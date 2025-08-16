"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import FooterNavList from "./FooterNavList";
import { convertToPersianNumber } from "@/lib/utils";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return <div className="hidden"></div>;
  }

  const quickAccessOptions = [
    { href: "/mobile", label: "خرید گوشی" },
    { href: "/mobile/samsungPhone", label: "گوشی سامسونگ" },
    { href: "/laptop/appleLaptop", label: "مک بوک" },
    { href: "/mobile/iPhone", label: "گوشی آیفون" },
    { href: "/mobile/XiaomiPhone", label: "گوشی شیائومی" },
    { href: "/Monitor", label: "مانیتور" },
    { href: "/Headphones", label: "هدفون" },
    { href: "/Monitor/ASUSMonitor", label: "مانیتور ایسوس" },
  ];
  const bestSellingProductsOptions = [
    {
      href: "/products/4013_هدفون تسکو مدل TH 5323",
      label: "هدفون تسکو مدل TH 5323",
    },
    {
      href: "/products/6046_مانیتور خمیده گیمینگ 49 اینچ سامسونگ مدل Odyssey G9G95C LS49CG954EMXUE",
      label: "اودیسه G9",
    },
    {
      href: "/products/1031_گوشی شیائومی 15 Ultra ",
      label: "گوشی شیائومی 15 Ultra",
    },
    {
      href: "/products/1020_گوشی موبایل شیائومی مدل Poco X7 Pro ",
      label: "پوکو X7 Pro",
    },
    {
      href: "/products/2019_لپ تاپ 15.3 اینچی اپل مدل MacBook Air MC7A4 2025 LLA-M4-16GB Ram-256GB SSD",
      label: "مک بوک Air MC7A4",
    },
    {
      href: "/products/1011_گوشی موبایل ریلمی مدل Note 50 ",
      label: "ریلمی نوت 50",
    },
    {
      href: "/products/1028_گوشی موبایل سامسونگ مدل Galaxy Z Fold 7 ",
      label: "Galaxy Z Fold 7",
    },
    {
      href: "/products/5001_%D8%B3%D8%A7%D8%B9%D8%AA%20%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF%20%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF%20%D9%85%D8%AF%D9%84%20Galaxy%20Watch4%2040mm%20%D8%A8%D9%86%D8%AF%20%D8%B3%DB%8C%D9%84%DB%8C%DA%A9%D9%88%D9%86%DB%8C%D8%8C%20%D9%85%D9%86%D8%A7%D8%B3%D8%A8%20%D8%A8%D8%B1%D8%A7%DB%8C%20%D9%88%D8%B1%D8%B2%D8%B4%D8%8C%20%D8%B1%D9%88%D8%B2%D9%85%D8%B1%D9%87%D8%8C%20%D8%B1%D8%B3%D9%85%DB%8C%D8%8C%20%D8%A8%D9%86%D8%AF%20%D8%B3%DB%8C%D9%84%DB%8C%DA%A9%D9%88%D9%86%D8%8C%20%D9%81%D8%B1%D9%85%20%D8%B5%D9%81%D8%AD%D9%87%20%DA%AF%D8%B1%D8%AF%D8%8C%20%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C%20GPS%D8%8C%20%D9%BE%D8%B4%D8%AA%DB%8C%D8%A8%D8%A7%D9%86%DB%8C%20%D8%A7%D8%B2%20%D8%B3%DB%8C%D8%B3%D8%AA%D9%85%E2%80%8C%D8%B9%D8%A7%D9%85%D9%84%20Android%20Wear%D8%8C%20%D8%A8%D8%A7%20%D8%AD%D8%A7%D9%81%D8%B8%D9%87%20%D8%AF%D8%A7%D8%AE%D9%84%DB%8C%2016000",
      label: "Samsung Galaxy Watch4",
    },
  ];

  return (
    <div className=" p-4 pt-15 w-full ">
      {/* mobile and tablet footer 1024 */}
      <div className="lg:hidden"></div>
      {/* pc footer */}
      <div className="bg-primaryGradient flex flex-col w-full  rounded-[30px] max-lg:hidden pt-18 px-36">
        {/* header */}
        <div className="flex justify-between items-center pb-12 border-b border-b-[#fcfcfc] mb-12">
          <div>
            <Logo
              logo_className="hidden"
              text_className="text-white text-[38px]"
            />
          </div>
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center gap-x-4 pr-7 pl-5 py-4  bg-[#fcfeff] rounded-lg cursor-pointer"
          >
            <span className="text-[15px] font-medium">بازگشت به بالا</span>
            <span>
              <ChevronUp strokeWidth={2.25} size={20} />
            </span>
          </button>
        </div>
        {/* content */}
        <div className="flex">
          {/* navbar */}
          <div className="flex">
            {/* Quick access */}

            <FooterNavList title="دسترسی سریع" options={quickAccessOptions} />

            {/* Best-selling products */}
            <FooterNavList
              title="پرفروش ترین محصولات"
              options={bestSellingProductsOptions}
            />
          </div>

          {/* contact with us */}
          <div className="flex flex-col gap-y-7  text-white ">
            <div className="text-xl font-medium">درباره موبینو</div>
            <ul className="flex flex-col gap-y-3 text-sm font-medium pr-0.5">
              <li className="flex items-center gap-x-2">
                <Image
                  src="/footer/gmail.png"
                  alt="gmail"
                  width={24}
                  height={24}
                />
                <span>آدرس جیمیل:</span>
                <Link
                  href="mailto:maminshavandi1524@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  maminshavandi1524@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-x-2">
                <Image
                  className="rounded-full"
                  src="/footer/github.png"
                  alt="github"
                  width={24}
                  height={24}
                />
                <span>لینک ریپازیتوری:</span>
                <Link
                  href="https://github.com/MohammadAminShavandi1524/mobino15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  https://github.com/MohammadAminShavandi1524/mobino15
                </Link>
              </li>
            </ul>
          </div>

          {/* social logos */}

          <div></div>
        </div>
        {/* footer */}
        <div className="mt-12 py-12 flex justify-center gap-x-3 w-full text-white text-[14px] border-t border-t-[#fcfcfc]">
          <span>{convertToPersianNumber(1404)}</span>
          <span>
            اطلاعات محصولات با کمک منابع معتبر از جمله دیجی‌کالا و فناوری‌های
            هوش مصنوعی گردآوری شده است. طراحی رابط کاربری نیز با الهام از
            تجربه‌ی کاربری وب‌سایت تکنولایف شکل گرفته است.
          </span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
