"use client";

import Image from "next/image";
import Link from "next/link";

const ServiceHighlightsOptions = [
  {
    src: "/productpage/refund.png",
    alt: "refund",
    href: "",
    label: "7 روز ضمانت بازگشت کالا",
  },
  {
    src: "/productpage/installment.png",
    alt: "installment",
    href: "",
    label: "پرداخت اقساطی",
  },
  {
    src: "/productpage/guarantee.png",
    alt: "guarantee",
    href: "",
    label: "ضمانت اصالت کالا",
  },
  {
    src: "/productpage/payment.png",
    alt: "payment",
    href: "",
    label: "پرداخت در محل",
  },
];

const ServiceHighlights = () => {
  return (
    <div className="s:px-10 mx-auto mt-10 mb-8 flex w-full justify-between gap-x-3 border-b-6 border-double border-b-[#d3d8e4] px-7 max-lg:pb-10 lg:my-15 lg:w-[700px] lg:border-b-0 lg:px-0">
      {ServiceHighlightsOptions.map((img, index) => {
        return (
          <Link
            key={index}
            href={img.href}
            className="flex flex-col items-center gap-y-3"
          >
            <div className="xss:size-14 s:size-18 relative size-12">
              <Image src={img.src} alt={img.alt} fill />
            </div>
            <span className="max-xss:max-w-18 max-s:max-w-20 s:max-w-24 sm:max-w-full text-xs max-lg:text-center">
              {img.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
export default ServiceHighlights;
