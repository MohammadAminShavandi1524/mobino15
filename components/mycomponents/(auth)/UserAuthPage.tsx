"use client";

import { useState } from "react";
import Logo from "../Logo";
import ParticlesBackground from "../ParticlesBackground";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import UserRegisterForm from "./UserRegisterForm";
import UserLoginForm from "./UserLoginForm";

interface UserAuthPageProps {}

//* option 1   bg-gradient-to-br from-purple-500 via-indigo-500 to-sky-500
//* option 2   bg-gradient-to-br from-[#8e2de2] via-[#4a00e0] to-[#00c6ff]
//* option 3   bg-gradient-to-br from-[#ff6a00] via-[#ee0979] to-[#8e2de2]
//* option 4   bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
//? option 5   bg-gradient-to-br  to-[#1a2a6c] via-[#5d54a4] from-[#9f7aea]

const UserAuthPage = ({}: UserAuthPageProps) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const trpc = useTRPC();
  const user = useSuspenseQuery(trpc.auth.session.queryOptions()).data.user;

  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="s:bg-gradient-to-br s:from-[#9f7aea] s:via-[#5d54a4] s:to-[#1a2a6c] max-s:flex max-s:justify-center relative min-h-screen w-full px-8 py-10">
      <ParticlesBackground />

      <section className="s:absolute s:top-1/2 s:left-1/2 s:-translate-x-1/2 s:-translate-y-1/2 s:rounded-2xl s:shadow-2xl s:p-8 max-s:w-full s:w-[min(92vw,420px)] flex min-h-120 flex-col items-center bg-white">
        <div className="s:my-2 s:mb-8 my-10 flex w-full flex-col items-center gap-y-8">
          {/* logo */}
          <Logo
            logoImage_height={44}
            logoImage_width={44}
            text_className="text-[36px]"
          />
          <div className="flex min-h-[30px] items-center gap-x-5 text-[20px]/[20px] transition-all">
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
            <span className="h-7 max-h-full w-[1.5px] rounded-sm bg-gray-700"></span>
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
        </div>

        {/* <div className="mb-6 text-sm font-medium">خوش اومدی !</div> */}

        {/**  form **/}

        {isSignIn ? (
          // ? Sign In
          <UserLoginForm />
        ) : (
          // ? Sign Up
          <UserRegisterForm user={user} />
        )}
      </section>
    </div>
  );
};

export default UserAuthPage;
