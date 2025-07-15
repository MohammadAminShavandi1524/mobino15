"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return <div className="hidden"></div>;
  }

  return <div>Footer</div>;
};
export default Footer;
