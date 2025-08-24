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
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-x-2 rounded-lg border-[2px] border-[#1cc662] py-4 pr-4 pl-4 select-none"
    >
      {/* logo  */}
      <div className="min-size-[42px] max-size-[42px] xl:max-size-[46px] xl:min-size-[46px] relative size-[42px] shrink-0 xl:size-[46px] 2xl:size-[52px]">
        <Image className="block" src={imgSrc} alt="logo" fill />
      </div>
      {/* label */}
      <div className="text-base text-neutral-700 2xl:text-lg"> {label}</div>
    </motion.div>
  );
};

export default WhyMobinoCard;
