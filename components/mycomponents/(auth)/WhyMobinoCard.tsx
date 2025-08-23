"use client";

import { Icon, IconNode, LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
interface WhyMobinoCardProps {
  imgSrc: string;
  label: string;
}

const WhyMobinoCard = ({ imgSrc, label }: WhyMobinoCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.075 }}
      className="flex h-fit items-center gap-x-2 rounded-lg border-[2px] border-[#1cc662] py-4 pr-4 pl-4"
    >
      {/* logo  */}
      <div className="text-neutral-600">
        <Image
          className="min-size-13 block"
          src={imgSrc}
          alt="logo"
          width={52}
          height={52}
        />
      </div>
      {/* label */}
      <div className="text-lg text-neutral-700"> {label}</div>
    </motion.div>
  );
};

export default WhyMobinoCard;
