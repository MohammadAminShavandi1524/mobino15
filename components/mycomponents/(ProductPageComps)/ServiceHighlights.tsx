"use client"

import Image from "next/image";
import Link from "next/link";

const ServiceHighlights = () => {
  return (
    <div className="flex justify-between w-[700px] mx-auto gap-x-3 my-15">
      <Link href={""} className="flex flex-col items-center gap-y-3">
        <Image
          src="/productpage/refund.png"
          alt="refund"
          width={70}
          height={70}
        />
        <span className="text-xs">7 روز ضمانت بازگشت کالا</span>
      </Link>
      <Link href={""} className="flex flex-col items-center gap-y-3">
        <Image
          src="/productpage/installment.png"
          alt="installment"
          width={70}
          height={70}
        />
        <span className="text-xs">پرداخت اقساطی</span>
      </Link>

      <Link href={""} className="flex flex-col items-center gap-y-3">
        <Image
          src="/productpage/guarantee.png"
          alt="guarantee"
          width={70}
          height={70}
          unoptimized
        />
        <span className="text-xs">ضمانت اصالت کالا</span>
      </Link>
      <Link href={""} className="flex flex-col items-center gap-y-3">
        <Image
          src="/productpage/payment.png"
          alt="payment"
          width={70}
          height={70}
        />
        <span className="text-xs">پرداخت در محل</span>
      </Link>
    </div>
  );
};
export default ServiceHighlights;
