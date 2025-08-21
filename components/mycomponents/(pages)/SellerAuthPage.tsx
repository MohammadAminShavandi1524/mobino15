"use client";

import { useState } from "react";
import Logo from "@/components/mycomponents/Logo";
import RegisterForm from "@/components/mycomponents/(auth)/RegisterForm";
import ThemeButton from "@/components/mycomponents/(theme)/ThemeButton";
import LoginForm from "@/components/mycomponents/(auth)/LoginForm";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const SellerAuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const trpc = useTRPC();
  const user = useSuspenseQuery(trpc.auth.session.queryOptions()).data.user;

  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="flex h-screen w-full bg-white">
      {/* content part  */}
      <section className="flex h-full w-1/4 flex-col items-center px-12 pt-15">
        {/* logo */}
        <Logo
          logoImage_height={50}
          logoImage_width={50}
          text_className="text-[40px]"
        />
        {/* ورود یا ثبت نام */}
        <div className="mt-12 mb-10 flex min-h-[30px] items-center gap-x-5 text-[22px]/[22px] transition-all">
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
        <div className="mb-6 text-sm font-medium">خوش اومدی !</div>

        {/**  form **/}

        {isSignIn ? (
          // ? Sign In
          <LoginForm />
        ) : (
          // ? Sign Up
          <RegisterForm user={user} />
        )}
      </section>
      {/* empty part */}
      <section className="h-full flex-1 bg-[#253a56]"></section>
    </div>
  );
};
export default SellerAuthPage;
