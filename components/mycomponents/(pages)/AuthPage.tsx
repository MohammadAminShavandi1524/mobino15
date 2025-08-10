"use client";

import { useState } from "react";
import Logo from "@/components/mycomponents/Logo";
import RegisterForm from "@/components/mycomponents/(auth)/RegisterForm";
import ThemeButton from "@/components/mycomponents/(theme)/ThemeButton";
import LoginForm from "@/components/mycomponents/(auth)/LoginForm";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const trpc = useTRPC();
  const user = useSuspenseQuery(trpc.auth.session.queryOptions()).data.user;
  

  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="flex w-full h-screen bg-white">
      {/* content part  */}
      <section className="w-1/4 h-full flex flex-col items-center px-12 pt-15">
        {/* logo */}
        <Logo
          logoImage_height={50}
          logoImage_width={50}
          text_className="text-[40px]"
        />
        {/* ورود یا ثبت نام */}
        <div className="flex gap-x-5 items-center mt-12 mb-10 text-[22px]/[22px]  transition-all min-h-[30px] ">
          <button
            className={`pb-1.5  cursor-pointer ${
              isSignIn
                ? "text-[#2962ff] border-b-2 border-b-[#2962ff] cursor-pointer"
                : ""
            }  `}
            onClick={() => setIsSignIn(true)}
            disabled={isSignIn}
          >
            ورود
          </button>
          <span className="w-[2px] h-full bg-gray-700 rounded-sm"></span>
          <button
            className={`pb-1.5  cursor-pointer ${
              !isSignIn
                ? "text-[#2962ff] border-b-2 border-b-[#2962ff] cursor-pointer"
                : ""
            }  `}
            onClick={() => setIsSignIn(false)}
            disabled={!isSignIn}
          >
            ثبت نام
          </button>
        </div>
        <div className="font-medium text-sm mb-6">خوش اومدی !</div>

        {/**  form **/}

        {isSignIn ? (
          // ? Sign In
          <LoginForm  />
        ) : (
          // ? Sign Up
          <RegisterForm  user={user}/>
        )}
      </section>
      {/* empty part */}
      <section className=" flex-1 h-full bg-[#253a56]">
        
      </section>
    </div>
  );
};
export default AuthPage;
