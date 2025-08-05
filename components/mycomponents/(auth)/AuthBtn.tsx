"use client";

import { User } from "@/payload-types";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface AuthBtnProps {
  user: User | null;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthBtn = ({ setIsSideBarOpen, user }: AuthBtnProps) => {
  return (
    <Link
      onClick={() => {
        setIsSideBarOpen(false);
      }}
      href={user ? "/admin" : "/auth"}
      className="min-w-[140px] px-2.5 py-1.25 sm:px-4 sm:py-2 border border-custom-primary rounded-md sm:rounded-lg text-[15px]
           "
    >
      {user ? (
        <>
          <span className="block w-full text-center text-[14px] sm:text-[15px]">
            پنل کاربری
          </span>
        </>
      ) : (
        <>
          <span className="text-[14px] sm:text-[15px] lg:pl-4 lg:border-l lg:border-custom-primary">
            ورود
          </span>
          <span className="hidden lg:inline pr-4">ثبت نام</span>
        </>
      )}
    </Link>
  );
};
export default AuthBtn;
