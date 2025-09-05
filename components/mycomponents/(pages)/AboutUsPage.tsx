"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import { cn } from "@/lib/utils";
import { useBreakpoints } from "@/hooks/useBreakPoint";

interface AboutUsPageProps {}

const loadedImages = ["loaded.png", "loaded2.png", "loaded3.png"];

const TechnologiesUsedOptions = [
  {
    label: "Next.js",
    content:
      "نکست‌جی‌اس به‌عنوان فریم‌ورک اصلی پروژه استفاده شده تا امکان رندر سمت سرور (SSR) و تولید صفحات استاتیک (SSG) فراهم شود. این ویژگی‌ها باعث می‌شوند سرعت بارگذاری صفحات افزایش یابد، تجربه کاربری روان‌تری ایجاد شود و همچنین سئو سایت به‌طور چشمگیری بهبود پیدا کند. علاوه بر این، قابلیت‌های پیشرفته‌ی مسیریابی و بهینه‌سازی تصاویر نکست‌جی‌اس نیز در این پروژه به کار گرفته شده‌اند.",
    index: 1,
    bg: "#D6E4FF",
    hoverBg: "#AFC8FF",
    text: "#0A2E73",
    hoverText: "#051A40",
    titleColor: "#0A2E73",
    hoverTitleColor: "#051A40",
    contentColor: "#1C3F80",
    hoverContentColor: "#0D2857",
  },
  {
    label: "React",
    content:
      "ری‌اکت به‌عنوان کتابخانه‌ی رابط کاربری انتخاب شده تا ساخت صفحات پویا و تعاملی به‌سادگی انجام شود. با استفاده از کامپوننت‌های ماژولار، امکان توسعه و نگهداری کد بسیار آسان‌تر می‌شود. علاوه بر این، ری‌اکت قابلیت رندر به‌صورت کلاینت و سرور را فراهم می‌کند و با اکوسیستم گسترده‌ای از کتابخانه‌ها و ابزارهای جانبی سازگار است.",
    index: 2,
    bg: "#CCF2EF",
    hoverBg: "#99E6E0",
    text: "#0E4D45",
    hoverText: "#062D27",
    titleColor: "#0E4D45",
    hoverTitleColor: "#062D27",
    contentColor: "#14665C",
    hoverContentColor: "#0B3D36",
  },
  {
    label: "TailwindCSS",
    content:
      "تیلویندCSS یک فریم‌ورک سبک و انعطاف‌پذیر برای طراحی رابط کاربری است. در این پروژه از آن برای ایجاد صفحات واکنش‌گرا، طراحی مدرن و سفارشی‌سازی سریع استفاده شده است. به کمک کلاس‌های از پیش تعریف‌شده‌ی تیلویند، فرآیند طراحی بسیار سرعت گرفته و نیاز به نوشتن CSS سفارشی به حداقل رسیده است.",
    index: 3,
    bg: "#FFE0B3",
    hoverBg: "#FFCC80",
    text: "#663300",
    hoverText: "#331900",
    titleColor: "#663300",
    hoverTitleColor: "#331900",
    contentColor: "#804000",
    hoverContentColor: "#4D2600",
  },
  {
    label: "ShadcnUI",
    content:
      "شاد‌سی‌ان‌یو‌آی مجموعه‌ای از کامپوننت‌های آماده و زیبا است که بر پایه‌ی تیلویند ساخته شده‌اند. در این پروژه برای افزایش سرعت توسعه و داشتن طراحی یکپارچه از این کتابخانه استفاده شده است. این ابزار کمک کرده تا هم طراحی ظاهری حرفه‌ای‌تر به نظر برسد و هم تجربه کاربری بهبود یابد.",
    index: 4,
    bg: "#E5CCFF",
    hoverBg: "#D1A6FF",
    text: "#4B0073",
    hoverText: "#260040",
    titleColor: "#4B0073",
    hoverTitleColor: "#260040",
    contentColor: "#660099",
    hoverContentColor: "#3D005C",
  },
  {
    label: "Framer Motion",
    content:
      "فریمر موشن به‌عنوان کتابخانه‌ی انیمیشن در این پروژه به کار گرفته شده تا جلوه‌های بصری نرم و جذابی ایجاد شوند. انیمیشن‌ها نه تنها باعث زیبایی رابط کاربری می‌شوند، بلکه تجربه‌ی کاربری را نیز بهبود می‌بخشند. برای مثال، نمایش و مخفی‌سازی بخش‌ها یا حرکت عناصر با انیمیشن‌های روان پیاده‌سازی شده است.",
    index: 5,
    bg: "#CCFFCC",
    hoverBg: "#99FF99",
    text: "#006622",
    hoverText: "#003311",
    titleColor: "#006622",
    hoverTitleColor: "#003311",
    contentColor: "#009933",
    hoverContentColor: "#004D1A",
  },
  {
    label: "Payload CMS",
    content:
      "پی‌لود سی‌ام‌اس به‌عنوان سیستم مدیریت محتوا انتخاب شده است. این ابزار امکان مدیریت محصولات، نوشته‌ها و تنظیمات سایت را به‌سادگی فراهم می‌کند. علاوه بر مدیریت محتوای پویا، انعطاف‌پذیری بالای پی‌لود باعث شده تا بتوان قابلیت‌های جدید را به‌راحتی به پروژه اضافه کرد.",
    index: 6,
    bg: "#FFCCCC",
    hoverBg: "#FF9999",
    text: "#660000",
    hoverText: "#330000",
    titleColor: "#660000",
    hoverTitleColor: "#330000",
    contentColor: "#990000",
    hoverContentColor: "#4D0000",
  },
  {
    label: "tRPC + React Query",
    content:
      "ترکیب تی‌آر‌پی‌سی و ری‌اکت کوئری باعث شده ارتباط بین فرانت‌اند و بک‌اند سریع‌تر، ایمن‌تر و بهینه‌تر باشد. تی‌آر‌پی‌سی با استفاده از تایپ‌اسکریپت ارتباط نوع‌محور (type-safe) ایجاد می‌کند و ری‌اکت کوئری نیز مدیریت وضعیت و کش داده‌ها را به‌صورت خودکار انجام می‌دهد. نتیجه‌ی این ترکیب، سرعت توسعه بالاتر و خطاهای کمتر در مدیریت داده‌ها است.",
    index: 7,
    bg: "#CCFFF2",
    hoverBg: "#99FFE6",
    text: "#00664D",
    hoverText: "#003326",
    titleColor: "#00664D",
    hoverTitleColor: "#003326",
    contentColor: "#009973",
    hoverContentColor: "#004D39",
  },
  {
    label: "MongoDB",
    content:
      "مانگو‌دی‌بی به‌عنوان پایگاه‌داده انتخاب شده تا اطلاعات محصولات، کاربران و تنظیمات سایت ذخیره و مدیریت شوند. ویژگی‌هایی مثل مقیاس‌پذیری بالا، سرعت مناسب در ذخیره‌سازی و جستجو، و پشتیبانی از ساختار داده‌های منعطف باعث شده این پایگاه‌داده برای پروژه انتخاب شود. همچنین امکان اتصال ساده به بک‌اند با کمک کتابخانه‌های مخصوص مانگو‌دی‌بی فراهم شده است.",
    index: 8,
    bg: "#FFE6B3",
    hoverBg: "#FFCC66",
    text: "#664400",
    hoverText: "#332200",
    titleColor: "#664400",
    hoverTitleColor: "#332200",
    contentColor: "#996600",
    hoverContentColor: "#4D3300",
  },
];

const ProjectFeaturesOptions = [
  {
    label: "Multi-tenant",
    content:
      "این پروژه بر پایه معماری چند-مستاجری (Multi-tenant) طراحی شده است. این قابلیت به ما اجازه می‌دهد چندین فروشگاه مستقل را در یک پلتفرم واحد مدیریت کنیم. هر فروشگاه می‌تواند تنظیمات، محصولات و داده‌های مخصوص به خود را داشته باشد، بدون آنکه تداخلی با سایر فروشگاه‌ها ایجاد شود. این ویژگی باعث مقیاس‌پذیری بالا و کاهش هزینه‌های زیرساخت می‌شود.",
    index: 1,
    bg: "#CCF2EF",
    hoverBg: "#99E6E0",
    text: "#0E4D45",
    hoverText: "#062D27",
    titleColor: "#0E4D45",
    hoverTitleColor: "#062D27",
    contentColor: "#14665C",
    hoverContentColor: "#0B3D36",
  },
  {
    label: "Role-based",
    content:
      "سیستم کنترل دسترسی مبتنی بر نقش (RBAC) در پروژه پیاده‌سازی شده است. این امکان فراهم می‌کند که دسترسی کاربران به بخش‌های مختلف سیستم بر اساس نقش آن‌ها (مدیر، فروشنده، کارمند پشتیبانی و غیره) به‌صورت دقیق و ایمن مدیریت شود. این ساختار نه تنها امنیت را افزایش می‌دهد بلکه مدیریت کاربران را نیز ساده‌تر می‌کند.",
    index: 2,
    bg: "#D6E4FF",
    hoverBg: "#AFC8FF",
    text: "#0A2E73",
    hoverText: "#051A40",
    titleColor: "#0A2E73",
    hoverTitleColor: "#051A40",
    contentColor: "#1C3F80",
    hoverContentColor: "#0D2857",
  },
  {
    label: "Product ratings",
    content:
      "امکان ثبت امتیاز برای محصولات فراهم شده است. کاربران می‌توانند بر اساس تجربه‌ی خرید خود، به هر محصول یک امتیاز عددی اختصاص دهند. این قابلیت به خریداران جدید کمک می‌کند تا در تصمیم‌گیری آگاهانه‌تر عمل کنند و محصولات محبوب‌تر مشخص شوند.",
    index: 3,
    bg: "#E5CCFF",
    hoverBg: "#D1A6FF",
    text: "#4B0073",
    hoverText: "#260040",
    titleColor: "#4B0073",
    hoverTitleColor: "#260040",
    contentColor: "#660099",
    hoverContentColor: "#3D005C",
  },
  {
    label: "Product reviews",
    content:
      "کاربران می‌توانند علاوه بر امتیازدهی، نظر و تجربه‌ی خود را درباره‌ی محصولات در قالب متن به اشتراک بگذارند. این بخش باعث می‌شود خریداران دید بهتری نسبت به کیفیت، عملکرد و نقاط ضعف یا قوت هر محصول داشته باشند و فروشندگان نیز بتوانند براساس بازخورد واقعی کاربران خدمات خود را بهبود دهند.",
    index: 4,
    bg: "#FFE0B3",
    hoverBg: "#FFCC80",
    text: "#663300",
    hoverText: "#331900",
    titleColor: "#663300",
    hoverTitleColor: "#331900",
    contentColor: "#804000",
    hoverContentColor: "#4D2600",
  },
  {
    label: "Admin dashboard",
    content:
      "یک پنل مدیریتی قدرتمند برای مدیران سیستم طراحی شده است تا بتوانند به‌صورت متمرکز بر کل پلتفرم نظارت داشته باشند. این داشبورد شامل مدیریت کاربران، فروشگاه‌ها، محصولات، سفارش‌ها و گزارش‌های جامع است. هدف اصلی این بخش، افزایش کنترل و شفافیت در مدیریت کل سیستم است.",
    index: 5,
    bg: "#FFCCCC",
    hoverBg: "#FF9999",
    text: "#660000",
    hoverText: "#330000",
    titleColor: "#660000",
    hoverTitleColor: "#330000",
    contentColor: "#990000",
    hoverContentColor: "#4D0000",
  },
  {
    label: "Merchant dashboard",
    content:
      "فروشندگان هر فروشگاه یک پنل اختصاصی دارند که از طریق آن می‌توانند محصولات خود را مدیریت کرده، سفارش‌ها را بررسی کنند و اطلاعات آماری فروشگاه خود را مشاهده نمایند. این قابلیت به فروشندگان استقلال و انعطاف بیشتری می‌دهد و فرآیند مدیریت فروشگاه را ساده‌تر می‌سازد.",
    index: 6,
    bg: "#CCFFCC",
    hoverBg: "#99FF99",
    text: "#006622",
    hoverText: "#003311",
    titleColor: "#006622",
    hoverTitleColor: "#003311",
    contentColor: "#009933",
    hoverContentColor: "#004D1A",
  },
  {
    label: "Product filtering",
    content:
      "سیستم فیلتر پیشرفته دسته‌بندی‌ها و محصولات به کاربران این امکان را می‌دهد که به‌سرعت و با دقت بالا محصولات مورد نظر خود را پیدا کنند. کاربران می‌توانند بر اساس ویژگی‌هایی مثل قیمت، رنگ، برند و موجودی نتایج را محدود کنند. این قابلیت باعث صرفه‌جویی در زمان و بهبود تجربه کاربری می‌شود.",
    index: 7,
    bg: "#FFE6B3",
    hoverBg: "#FFCC66",
    text: "#664400",
    hoverText: "#332200",
    titleColor: "#664400",
    hoverTitleColor: "#332200",
    contentColor: "#996600",
    hoverContentColor: "#4D3300",
  },
  {
    label: "Search functionality",
    content:
      "قابلیت جستجو در این پروژه بهینه‌سازی شده تا کاربران بتوانند محصولات مورد نظر خود را به‌صورت سریع و دقیق بیابند. سیستم جستجو از الگوریتم‌هایی برای پیشنهاد نتایج مرتبط بهره می‌برد و امکان جستجو بر اساس کلیدواژه، دسته‌بندی و ویژگی‌های محصول را فراهم می‌کند.",
    index: 8,
    bg: "#CCFFF2",
    hoverBg: "#99FFE6",
    text: "#00664D",
    hoverText: "#003326",
    titleColor: "#00664D",
    hoverTitleColor: "#003326",
    contentColor: "#009973",
    hoverContentColor: "#004D39",
  },
];

const AboutUsPage = ({}: AboutUsPageProps) => {
  const [TUopenedTech, setTUOpenedTech] = useState<number | null>(null);
  const [TUhoveredIndex, setTUHoveredIndex] = useState<number | null>(null);

  const [PFopenedTech, setPFOpenedTech] = useState<number | null>(null);
  const [PFhoveredIndex, setPFHoveredIndex] = useState<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showLoading, setShowLoading] = useState(true);
  const [animateClip, setAnimateClip] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => {
      setAnimateClip(false); // clipPath reset
      setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
        setAnimateClip(true);

        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % loadedImages.length);
        }, 3000);
      }, 2500);
    }, 6500);

    return () => clearInterval(loop);
  }, []);

  return (
    <div className="s:px-8 mt-4 flex flex-col px-6 lg:mx-auto lg:w-[90%] lg:max-w-[1920px] lg:px-6">
      <div className="pb-30 lg:grid lg:grid-cols-20 lg:pb-70">
        <div className="flex flex-col gap-y-4 pt-8 max-lg:w-full lg:col-span-9 lg:pt-16.5 lg:pl-12 xl:pl-16 2xl:pl-20">
          {/* title */}
          <div className="text-custom-primary mb-2 text-2xl font-bold lg:text-[32px] 2xl:text-[36px]">
            درباره پروژه
          </div>
          <div className="text-justify text-base leading-8 text-gray-700 lg:text-lg 2xl:text-xl">
            این وب‌سایت به‌عنوان یک پروژه‌ی شخصی طراحی و توسعه داده شده است تا
            نمونه‌ای از یک فروشگاه اینترنتی مدرن و مقیاس‌پذیر را نمایش دهد. در
            ساخت این پروژه از جدیدترین تکنولوژی‌ها و ابزارهای روز استفاده شده تا
            علاوه بر سرعت و کارایی، تجربه کاربری روان و ساده‌ای فراهم شود.
          </div>
          <div className="text-justify text-base leading-8 text-gray-700 lg:text-lg 2xl:text-xl">
            در فرآیند توسعه، تلاش شده از جدیدترین تکنولوژی‌ها و ابزارهای روز
            استفاده شود تا علاوه بر افزایش سرعت بارگذاری و بهینه‌سازی برای
            موتورهای جستجو (SEO)، یک رابط کاربری ساده، جذاب و واکنش‌گرا در
            اختیار کاربران قرار گیرد.
          </div>
        </div>

        {/* image */}
        <div className="hidden items-center justify-center pt-20 lg:col-span-11 lg:flex">
          <motion.div
            className="relative overflow-hidden shadow-2xl lg:h-[280px] lg:w-[500px] xl:h-[336px] xl:w-[600px] 2xl:h-[392px] 2xl:w-[700px]"
            style={{ perspective: "1200px", borderRadius: "2%" }}
            whileHover={{
              rotateY: 18,
              rotateX: 8,
              scale: 1.08,
              boxShadow:
                "0 30px 60px rgba(0,0,0,0.35), 0 15px 25px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <AnimatePresence mode="wait">
              {showLoading && (
                <motion.img
                  key="loading"
                  src="./loading.png"
                  alt="loading"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {!showLoading && (
                <motion.img
                  key={currentIndex}
                  src={loadedImages[currentIndex]}
                  alt={`loaded-${currentIndex}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={
                    animateClip
                      ? { clipPath: "inset(0 0 0 0)", opacity: 1 }
                      : {}
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col pb-20 max-lg:gap-y-14 lg:grid lg:grid-cols-20 lg:gap-x-10 2xl:gap-x-14">
        <ProjectSpecTable
          Options={TechnologiesUsedOptions}
          title="تکنولوژی‌های مورد استفاده"
          hoveredIndex={TUhoveredIndex}
          openedTech={TUopenedTech}
          setHoveredIndex={setTUHoveredIndex}
          setOpenedTech={setTUOpenedTech}
        />
        <ProjectSpecTable
          Options={ProjectFeaturesOptions}
          title="قابلیت‌های کلیدی پروژه"
          hoveredIndex={PFhoveredIndex}
          openedTech={PFopenedTech}
          setHoveredIndex={setPFHoveredIndex}
          setOpenedTech={setPFOpenedTech}
        />
      </div>
    </div>
  );
};

export default AboutUsPage;

interface ProjectSpecTableProps {
  Options: {
    label: string;
    content: string;
    index: number;
    bg: string;
    hoverBg: string;
    text: string;
    hoverText: string;
    titleColor: string;
    hoverTitleColor: string;
    contentColor: string;
    hoverContentColor: string;
  }[];
  title: string;
  openedTech: number | null;
  setOpenedTech: Dispatch<SetStateAction<number | null>>;
  hoveredIndex: number | null;
  setHoveredIndex: Dispatch<SetStateAction<number | null>>;
}

const ProjectSpecTable = ({
  Options,
  title,
  openedTech,
  setOpenedTech,
  hoveredIndex,
  setHoveredIndex,
}: ProjectSpecTableProps) => {
  const { sm } = useBreakpoints();

  return (
    <div className="flex flex-col gap-y-5 lg:col-span-10 2xl:gap-y-7">
      <div className="mr-3 text-[22px] font-medium text-[#333333] lg:text-xl 2xl:text-2xl">
        {title}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-x-4 gap-y-4 rounded-xl border border-[#d7dee0] p-4 xss:p-5 sm:grid-cols-2 2xl:p-6",
          openedTech && "grid-cols-1 sm:grid-cols-1",
        )}
      >
        {Options.map((opt, index) => {
          const isSelected = opt.index === openedTech;
          const isHoverd = opt.index === hoveredIndex;

          if (openedTech && sm && !isSelected) return null;

          return (
            <motion.div
              key={index}
              layout
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={cn(
                "flex w-full flex-col overflow-hidden rounded-2xl",
                isSelected ? "h-full" : "",
              )}
            >
              {/* label */}
              <div
                onClick={() => setOpenedTech(isSelected ? null : opt.index)}
                onMouseEnter={() => setHoveredIndex(opt.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "flex cursor-pointer items-center justify-center px-6 py-4 text-[22px] lg:text-lg 2xl:px-8 2xl:py-6 2xl:text-xl",
                  isSelected ? "rounded-t-2xl" : "rounded-2xl",
                )}
                style={{
                  background: isSelected
                    ? opt.hoverBg
                    : isHoverd
                      ? opt.hoverBg
                      : opt.bg,
                  color: isSelected
                    ? opt.hoverTitleColor
                    : isHoverd
                      ? opt.hoverTitleColor
                      : opt.titleColor,
                }}
              >
                {opt.label}
              </div>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    key="content"
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "100%" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="s:p-6 s:text-lg/relaxed flex-1 overflow-hidden overflow-y-hidden bg-[#f3f8fd] p-4 text-justify text-base/relaxed text-[#222222] lg:max-h-[275px] xl:max-h-[250px] 2xl:max-h-[210px]"
                  >
                    {opt.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
