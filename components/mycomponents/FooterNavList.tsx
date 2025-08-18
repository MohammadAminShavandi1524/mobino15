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
    <div className="flex w-100 flex-col gap-y-7 text-white xl:w-75 2xl:w-100">
      <div className="text-xl font-medium">{title}</div>
      <ul className="flex flex-col gap-y-3 pr-0.5 text-sm font-medium">
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
