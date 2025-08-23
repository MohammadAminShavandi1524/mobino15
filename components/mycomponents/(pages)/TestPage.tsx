"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import Logo from "../Logo";
import { cn } from "@/lib/utils";
import LoginForm from "../(auth)/LoginForm";
import RegisterForm from "../(auth)/RegisterForm";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Shopping from "@/lotties/Shopping.json";
import FAQ from "@/lotties/FAQ.json";
import Why from "@/lotties/why.json";
import Lottie from "lottie-react";
import FAQCard from "../(auth)/FAQCard";

import WhyMobinoCard from "../(auth)/WhyMobinoCard";

const WhyMobinoCardOptions = [
  { label: " هزینه انبارداری رایگان ", Icon: "/whymobino/package.png" },
  {
    label: "ثبت‌ نام آسان، رایگان و آنلاین ",
    Icon: "/whymobino/clock.png",
  },

  {
    label: "فروش شبانه روزی کالا",
    Icon: "/whymobino/hours.png",
  },
  {
    label: "مرجوعی کالا بر اساس قوانین ",
    Icon: "/whymobino/refund.png",
  },
  {
    label: "افزایش فروش با تبلیغات گسترده",
    Icon: "/whymobino/profit.png",
  },
  {
    label: "بازپرداخت سریع ",
    Icon: "/whymobino/cash.png",
  },
];

const TestPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<
    "auth" | "FAQ" | "whymobino"
  >("whymobino");
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [openedFAQ, setOpenedFAQ] = useState<number | null>(null);

  const trpc = useTRPC();
  const user = useSuspenseQuery(trpc.auth.session.queryOptions()).data.user;

  const bigCirclesStyle = {
    background:
      selectedMenu === "FAQ"
        ? "linear-gradient(135deg, #fed7aa 0%, #fdba74 50%, #fb923c 100%)"
        : selectedMenu === "auth"
          ? "linear-gradient(135deg, #bfdbfe 0%, #93c5fd 50%, #60a5fa 100%)"
          : "linear-gradient(135deg, #bbf7d0 0%, #86efac 50%, #4ade80 100%)",
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.3)",
  };

  const mediumCirclesStyle = {
    background:
      selectedMenu === "FAQ"
        ? "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)"
        : selectedMenu === "auth"
          ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)"
          : "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)",
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.25)",
  };

  const smallCirclesStyle = {
    background:
      selectedMenu === "FAQ"
        ? "linear-gradient(135deg, #c2410c 0%, #9a3412 50%, #7c2d12 100%)"
        : selectedMenu === "auth"
          ? "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #0f172a 100%)"
          : "linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)",
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.2)",
  };

  return (
    <div className="w-full">
      <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* دایره‌ها */}
        {/* top right */}
        <div className="absolute -top-[30vw] -right-[30vw] transition-all duration-200">
          <div
            className="h-[60vw] w-[60vw] rounded-full opacity-45"
            style={bigCirclesStyle}
          />
          <div
            className="absolute top-[7vw] right-[7vw] h-[46vw] w-[46vw] rounded-full opacity-35"
            style={mediumCirclesStyle}
          />
          <div
            className="absolute top-[14vw] right-[14vw] h-[32vw] w-[32vw] rounded-full opacity-25"
            style={smallCirclesStyle}
          />
        </div>

        {/* bottom left */}
        <div className="absolute -bottom-[20vw] -left-[20vw] transition-all duration-200">
          <div
            className="h-[40vw] w-[40vw] rounded-full opacity-40"
            style={bigCirclesStyle}
          />
          <div
            className="absolute bottom-[4vw] left-[4vw] h-[32vw] w-[32vw] rounded-full opacity-30"
            style={mediumCirclesStyle}
          />
          <div
            className="absolute bottom-[8vw] left-[8vw] h-[24vw] w-[24vw] rounded-full opacity-20"
            style={smallCirclesStyle}
          />
        </div>

        <div className="relative z-10 flex size-[86%] flex-col overflow-hidden rounded-[30px] bg-white shadow-2xl">
          {/* inner left */}
          {(selectedMenu === "auth" || selectedMenu === "whymobino") && (
            <div className="absolute top-1/2 -left-[25vw] -translate-y-1/2 transition-all duration-200">
              <div
                className="absolute top-1/2 left-[2.5vw] size-[60vw] -translate-y-1/2 rounded-full opacity-45"
                style={bigCirclesStyle}
              />
              <div
                className="absolute top-1/2 left-[2.75vw] size-[55vw] -translate-y-1/2 rounded-full opacity-35"
                style={mediumCirclesStyle}
              />

              <div
                className="absolute top-1/2 left-[6vw] size-[43vw] -translate-y-1/2 rounded-full opacity-35"
                style={smallCirclesStyle}
              />
            </div>
          )}

          {selectedMenu === "FAQ" && (
            <>
              {/* top left  */}

              <div className="absolute -top-[10vw] -left-[10vw] transition-all duration-200">
                <div
                  className="h-[20vw] w-[20vw] rounded-full opacity-30"
                  style={bigCirclesStyle}
                />
                <div
                  className="absolute top-[2vw] left-[2vw] h-[16vw] w-[16vw] rounded-full opacity-20"
                  style={mediumCirclesStyle}
                />
                <div
                  className="absolute top-[4vw] left-[4vw] h-[12vw] w-[12vw] rounded-full opacity-10"
                  style={smallCirclesStyle}
                />
              </div>

              {/* bottom right  */}
              <div className="absolute -right-[15vw] -bottom-[15vw] transition-all duration-200">
                <div
                  className="h-[30vw] w-[30vw] rounded-full opacity-35"
                  style={bigCirclesStyle}
                />
                <div
                  className="absolute right-[3.5vw] bottom-[3.5vw] h-[23vw] w-[23vw] rounded-full opacity-25"
                  style={mediumCirclesStyle}
                />
                <div
                  className="absolute right-[7vw] bottom-[7vw] h-[16vw] w-[16vw] rounded-full opacity-15"
                  style={smallCirclesStyle}
                />
              </div>
            </>
          )}

          {/* header */}
          <div className="flex w-full items-center gap-x-8 py-5 pt-8 pr-10 transition-all duration-200">
            <Logo
              logoImage_height={60}
              logoImage_width={60}
              text_className="text-[32px] hidden"
              className="ml-8 gap-x-1.5"
            />
            <button
              className={cn(
                "cursor-pointer text-lg text-neutral-600",
                selectedMenu === "auth" && "text-[#223c78]",
              )}
              onClick={() => setSelectedMenu("auth")}
            >
              ورود | ثبت نام
            </button>
            {/*  */}
            <button
              className={cn(
                "cursor-pointer text-lg text-neutral-600",
                selectedMenu === "whymobino" && "text-[#1a8f47]",
              )}
              onClick={() => setSelectedMenu("whymobino")}
            >
              چرا موبینو ؟
            </button>
            {/*  */}
            <button
              className={cn(
                "cursor-pointer text-lg text-neutral-600",
                selectedMenu === "FAQ" && "text-[#e77b02]",
              )}
              onClick={() => setSelectedMenu("FAQ")}
            >
              سوالات متداول
            </button>
          </div>

          <div className="flex min-h-[calc(86vh-66px)] flex-col">
            {/* sign up - login */}
            {selectedMenu === "auth" && (
              <div className="grid min-h-[calc(86vh-112px)] w-full grid-cols-10">
                {/* right side */}
                <div className="col-span-6 mr-[calc(8vw+16px)] flex w-90 flex-col items-center">
                  {/* ورود یا ثبت نام */}
                  <div
                    className={cn(
                      "my-10 flex min-h-[30px] items-center gap-x-5 text-[22px]/[22px] transition-all",
                      isSignIn ? "mt-25" : "mt-15",
                    )}
                  >
                    <button
                      className={`cursor-pointer pb-1.5 ${
                        isSignIn
                          ? "cursor-pointer border-b-2 border-b-[#2962ff] text-[#2962ff]"
                          : ""
                      } `}
                      onClick={() => setIsSignIn(true)}
                      disabled={isSignIn}
                    >
                      ورود
                    </button>
                    <span className="h-full w-[2px] rounded-sm bg-gray-700"></span>
                    <button
                      className={`cursor-pointer pb-1.5 ${
                        !isSignIn
                          ? "cursor-pointer border-b-2 border-b-[#2962ff] text-[#2962ff]"
                          : ""
                      } `}
                      onClick={() => setIsSignIn(false)}
                      disabled={!isSignIn}
                    >
                      ثبت نام
                    </button>
                  </div>

                  {/**  form **/}

                  {isSignIn ? (
                    // ? Sign In
                    <LoginForm />
                  ) : (
                    // ? Sign Up
                    <RegisterForm user={user} />
                  )}
                </div>
                {/* left side  */}
                <div className="col-span-4 flex justify-center">
                  <div className="mt-[90px] w-120">
                    <Lottie
                      animationData={Shopping}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === "whymobino" && (
              <div className="grid min-h-[calc(86vh-112px)] w-full grid-cols-10">
                <div className="col-span-6 mt-[50px] mr-[calc(2.5vw+16px)] ml-[calc(2.5vw+16px)] flex">
                  <div className="mt-[60px] mr-[16px] grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-6 self-baseline">
                    {/* card */}
                    {WhyMobinoCardOptions.map((option, index) => {
                      return (
                        <WhyMobinoCard
                          label={option.label}
                          imgSrc={option.Icon}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="mt-[0px] mr-[70px] w-110">
                    <Lottie animationData={Why} loop={true} autoplay={true} />
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === "FAQ" && (
              <div className="grid min-h-[calc(86vh-112px)] w-full grid-cols-10">
                <div className="col-span-6 mt-[50px] mr-[calc(5vw+16px)] ml-[calc(2.5vw+16px)] flex flex-col gap-y-4">
                  {/* faq card */}
                  <FAQCard
                    question="آیا در موبینو هزینه انبارداری از فروشنده اخذ می‌شود؟ "
                    answer="خیر، لازم به پرداخت هیچ هزینه‌ای از سمت فروشنده برای انبار کردن کالاها در موبینو نیست . "
                    index={1}
                    openedFAQ={openedFAQ}
                    setOpenedFAQ={setOpenedFAQ}
                  />
                  <FAQCard
                    question="امکان فروش کدام محصولات توسط فروشندگان در سایت موبینو وجود ندارد؟ "
                    answer="امکان فروش کالاهای قاچاق و ممنوعه طبق تعاریف درج‌شده در جدول جرایم و تخلفات فروشندگان موبینو وجود ندارد."
                    index={3}
                    openedFAQ={openedFAQ}
                    setOpenedFAQ={setOpenedFAQ}
                  />
                  <FAQCard
                    question="نحوه محاسبه هزینه پردازش و ارسال کالاها چگونه است؟ "
                    answer="نحوه محاسبات کمیسیون به‌صورت پلکانی توافق می‌شود و میزان فروش فروشنده در کمترشدن میزان کمیسیون و بازپرداخت سریع‌تر صورت‌حساب در دسته‌بندی‌های فعالیت فروشنده تأثیرگذار است. "
                    index={2}
                    openedFAQ={openedFAQ}
                    setOpenedFAQ={setOpenedFAQ}
                  />

                  <FAQCard
                    question="فرایند ارسال کالا بر عهده چه کسی هست؟ "
                    answer="فروشنده موظف است کالاهایی که از آن سفارشی ثبت شده را جهت تامین کالا به انبار موبینو ارسال کند، پس از کنترل کیفی توسط تیم فنی انبار، ارسال کالا به خریدار بر عهده موبینو است. "
                    index={4}
                    openedFAQ={openedFAQ}
                    setOpenedFAQ={setOpenedFAQ}
                  />
                </div>
                <div className="col-span-4 flex">
                  <div className="mt-[70px] mr-[70px] w-100">
                    <Lottie animationData={FAQ} loop={true} autoplay={true} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(TestPage), { ssr: false });
