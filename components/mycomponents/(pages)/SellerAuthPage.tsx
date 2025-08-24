"use client";

import { useState } from "react";
import Logo from "@/components/mycomponents/Logo";
import RegisterForm from "@/components/mycomponents/(auth)/RegisterForm";
import LoginForm from "@/components/mycomponents/(auth)/LoginForm";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import WhyMobinoCard from "../(auth)/WhyMobinoCard";
import FAQCard from "../(auth)/FAQCard";
import dynamic from "next/dynamic";
import Shopping from "@/lotties/Shopping.json";
import FAQ from "@/lotties/FAQ.json";
import Why from "@/lotties/why.json";

const SellerAuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const trpc = useTRPC();
  const user = useSuspenseQuery(trpc.auth.session.queryOptions()).data.user;

  const [selectedMenu, setSelectedMenu] = useState<
    "auth" | "FAQ" | "whymobino"
  >("auth");

  const [openedFAQ, setOpenedFAQ] = useState<number | null>(null);

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

  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="w-full">
      <div className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* دایره‌ها */}
        {/* top right */}
        <div className="absolute -top-[30vw] -right-[30vw] transition-all duration-200 max-sm:hidden">
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
        <div className="absolute -bottom-[20vw] -left-[20vw] transition-all duration-200 max-sm:hidden">
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

        <div className="relative z-10 flex size-full flex-col overflow-hidden bg-white sm:size-[86%] sm:rounded-[30px] sm:shadow-2xl">
          {/* inner left */}
          {(selectedMenu === "auth" || selectedMenu === "whymobino") && (
            <div className="absolute top-1/2 -left-[40vw] -translate-y-1/2 transition-all duration-200 max-lg:hidden xl:top-1/2 xl:-left-[27.5vw] 2xl:-left-[25vw]">
              <div
                className="absolute top-1/2 left-[7vw] size-[70vw] -translate-y-1/2 rounded-full opacity-45 xl:left-[5vw] xl:size-[60vw] 2xl:left-[2.5vw] 2xl:size-[60vw]"
                style={bigCirclesStyle}
              />
              <div
                className="absolute top-1/2 left-[0vw] size-[70vw] -translate-y-1/2 rounded-full opacity-35 xl:left-[0.5vw] xl:size-[60vw] 2xl:left-[2.75vw] 2xl:size-[55vw]"
                style={mediumCirclesStyle}
              />

              <div
                className="absolute top-1/2 -left-[10vw] size-[70vw] -translate-y-1/2 rounded-full opacity-35 xl:-left-[3vw] xl:size-[55vw] 2xl:left-[6vw] 2xl:size-[43vw]"
                style={smallCirclesStyle}
              />
            </div>
          )}

          {selectedMenu === "FAQ" && (
            <>
              {/* top left  */}
              <div className="absolute -top-[10vw] -left-[10vw] transition-all duration-200 max-sm:hidden">
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
              <div className="absolute -right-[15vw] -bottom-[15vw] transition-all duration-200 max-sm:hidden">
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

          {/* max lg  */}
          {(selectedMenu === "auth" || selectedMenu === "whymobino") && (
            <>
              {/* top left  */}

              <div className="absolute -top-[10vw] -left-[10vw] transition-all duration-200 max-sm:hidden lg:hidden">
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
              <div className="absolute -right-[15vw] -bottom-[15vw] transition-all duration-200 max-sm:hidden lg:hidden">
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

          {/* content */}
          {/* header */}
          <div className="flex w-full items-center gap-x-8 pt-8 pb-5 transition-all duration-200 max-xl:relative max-lg:justify-center lg:pr-10">
            <div className="max-xl:hidden">
              <Logo
                logoImage_height={60}
                logoImage_width={60}
                text_className="hidden"
                className="gap-x-1.5 xl:ml-4"
              />
            </div>

            <div className="max-s:hidden max-lg:absolute max-lg:top-1/2 max-lg:right-10 max-lg:-translate-y-1/2 max-lg:pt-3 xl:hidden">
              <Logo
                logoImage_height={44}
                logoImage_width={44}
                text_className="hidden"
                className="gap-x-1.5 xl:ml-4"
              />
            </div>

            <button
              className={cn(
                "cursor-pointer text-base text-neutral-600 xl:text-lg",
                selectedMenu === "auth" && "text-[#223c78]",
              )}
              onClick={() => setSelectedMenu("auth")}
            >
              ورود | ثبت نام
            </button>
            {/*  */}
            <button
              className={cn(
                "cursor-pointer text-base text-neutral-600 xl:text-lg",
                selectedMenu === "whymobino" && "text-[#1a8f47]",
              )}
              onClick={() => setSelectedMenu("whymobino")}
            >
              چرا موبینو ؟
            </button>
            {/*  */}
            <button
              className={cn(
                "cursor-pointer text-base text-neutral-600 xl:text-lg",
                selectedMenu === "FAQ" && "text-[#e77b02]",
              )}
              onClick={() => setSelectedMenu("FAQ")}
            >
              سوالات متداول
            </button>
          </div>

          <div className="flex flex-col">
            {/* sign up - login */}
            {selectedMenu === "auth" && (
              <div className="min-h-[calc(86vh-112px)] w-full max-lg:flex max-lg:flex-col max-lg:items-center xl:grid xl:grid-cols-10">
                {/* right side */}
                <div className="flex w-90 flex-col items-center lg:mr-[calc(5vw+16px)] xl:col-span-6 xl:mr-[calc(8vw+16px)]">
                  <div className="s:hidden">
                    <Logo
                      logoImage_height={40}
                      logoImage_width={40}
                      text_className="text-[32px]"
                      className="mt-7.5 gap-x-1.5"
                    />
                  </div>

                  {/* ورود یا ثبت نام */}
                  <div
                    className={cn(
                      "my-10 flex min-h-[30px] items-center gap-x-5 text-[20px]/[20px] transition-all xl:text-[22px]/[22px]",
                      isSignIn
                        ? "s:mt-15 mt-10 2xl:mt-25"
                        : "3xl:mt-15 s:mt-5 mt-10 mb-5 xl:mb-10 2xl:mt-10",
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
                    <span className="h-7.5 w-[2px] rounded-sm bg-gray-700"></span>
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
                <div className="absolute top-1/2 left-[200px] z-15 -translate-1/2 max-lg:hidden xl:left-[280px] xl:col-span-4 2xl:left-[320px]">
                  <div className="lg:w-80 xl:w-100 2xl:w-120">
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
              <div className="max-s:overflow-hidden min-h-[calc(86vh-112px)] w-full lg:grid lg:grid-cols-10">
                <div className="s:mt-[50px] mt-1 flex max-2xl:flex-col max-2xl:items-center lg:col-span-6">
                  <div className="s:hidden">
                    <Logo
                      logoImage_height={40}
                      logoImage_width={40}
                      text_className="text-[32px] text-[#1a8f47]"
                      className="mt-7.5 gap-x-1.5"
                    />
                  </div>

                  <div className="mlg:w-[70%] s:mt-[60px] xss:w-[75%] s:w-[90%] s:grid-cols-2 s:grid-rows-3 s:gap-x-6 s:gap-y-6 mt-[40px] grid w-[80%] grid-cols-1 grid-rows-6 gap-x-4 gap-y-4 self-baseline max-lg:mx-auto sm:w-[85%] md:w-[80%] lg:w-full lg:pr-10 lg:pl-20 xl:pr-10 xl:pl-30 2xl:mr-[16px] 2xl:pr-15 2xl:pl-40">
                    {/* card */}
                    {WhyMobinoCardOptions.map((option, index) => {
                      return (
                        <WhyMobinoCard
                          key={index}
                          label={option.label}
                          imgSrc={option.Icon}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="absolute top-1/2 left-[200px] z-15 -translate-1/2 pb-[100px] max-lg:hidden xl:left-[280px] xl:col-span-4 xl:pb-[115px] 2xl:left-[320px] 2xl:pb-[130px]">
                  <div className="lg:w-80 xl:w-100 2xl:w-110">
                    <Lottie animationData={Why} loop={true} autoplay={true} />
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === "FAQ" && (
              <div className="min-h-[calc(86vh-112px)] w-full lg:grid lg:grid-cols-10">
                <div className="s:mt-[40px] s:gap-y-4 s:w-[80%] mlg:w-[75%] flex w-[90%] flex-col gap-y-3.5 max-lg:mx-auto max-lg:items-center lg:col-span-6 lg:mr-[calc(2.5vw+16px)] lg:ml-[calc(2.5vw+16px)] xl:mr-[calc(3.5vw+16px)] 2xl:mt-[50px] 2xl:mr-[calc(5vw+16px)]">
                  <div className="s:hidden">
                    <Logo
                      logoImage_height={40}
                      logoImage_width={40}
                      text_className="text-[32px] text-[#e77b02]"
                      className="mt-7.5 mb-5 gap-x-1.5"
                    />
                  </div>
                  {/* faq card */}
                  <FAQCard
                    question="آیا در موبینو هزینه انبارداری از فروشنده اخذ می‌شود؟ "
                    answer="خیر، لازم به پرداخت هیچ هزینه‌ای از سمت فروشنده برای انبار کردن کالاها در موبینو نیست."
                    index={1}
                    openedFAQ={openedFAQ}
                    setOpenedFAQ={setOpenedFAQ}
                  />
                  <FAQCard
                    question="امکان فروش کدام محصولات توسط فروشندگان در سایت موبینو وجود ندارد؟"
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

                  <FAQCard
                    question="برای افزایش فروش در تکنولایف چه اقداماتی می‌شود انجام داد؟ "
                    answer="استفاده از ابزار‌های مارکتینگی تکنو‌لایف برای افزایش فروش و همچنین استفاده از پروموشن‌های اکتیو پنل فروشندگی در توسعه فروش شما بسیار تاثیر‌گذار است. "
                    index={5}
                    openedFAQ={openedFAQ}
                    setOpenedFAQ={setOpenedFAQ}
                  />
                </div>
                <div className="absolute top-1/2 left-[240px] z-15 -translate-1/2 pb-[100px] max-lg:hidden xl:left-[280px] xl:col-span-4 xl:pb-[115px] 2xl:left-[320px] 2xl:pb-[130px]">
                  <div className="lg:w-80 xl:w-100 2xl:w-110">
                    <Lottie animationData={FAQ} loop={true} autoplay={true} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* end of content */}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SellerAuthPage), { ssr: false });
