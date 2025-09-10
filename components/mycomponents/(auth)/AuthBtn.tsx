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
      href={
        user
          ? user.roles?.includes("user")
            ? "/profile"
            : "/admin"
          : "/auth/user"
      }
      className="border-custom-primary block rounded-md border px-2.5 py-1.25 text-[15px] sm:rounded-lg sm:px-4 sm:py-2 lg:min-w-[140px]"
    >
      {user ? (
        <>
          <span className="block w-full text-center text-[14px] sm:text-[15px]">
            پنل کاربری
          </span>
        </>
      ) : (
        <>
          <span className="lg:border-custom-primary text-[14px] sm:text-[15px] lg:border-l lg:pl-4">
            ورود
          </span>
          <span className="hidden pr-4 lg:inline">ثبت نام</span>
        </>
      )}
    </Link>
  );
};
export default AuthBtn;
