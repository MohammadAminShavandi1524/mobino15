"use client";

import Link from "next/link";

interface FooterNavListProps {
  title: string;
  options: {
    href: string;
    label: string;
  }[];
}

const FooterNavList = ({ options, title }: FooterNavListProps) => {
  return (
    <div className="flex flex-col gap-y-7 w-100 xl:w-75 2xl:w-100 text-white ">
      <div className="text-xl font-medium">{title}</div>
      <ul className="flex flex-col gap-y-3 text-sm font-medium pr-0.5">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <Link href={option.href}>{option.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterNavList;
