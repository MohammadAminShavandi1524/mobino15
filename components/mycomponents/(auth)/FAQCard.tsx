"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQCardProps {
  question: string;
  answer: string;
  index: number;
  openedFAQ: number | null;
  setOpenedFAQ: Dispatch<SetStateAction<number | null>>;
}

const FAQCard = ({
  answer,
  index,
  question,
  openedFAQ,
  setOpenedFAQ,
}: FAQCardProps) => {
  const isSelected = openedFAQ === index;
  return (
    <div
      className={cn(
        "z-2 flex max-lg:w-full lg:max-w-[660px] flex-col rounded-2xl border border-[#efdcc7] bg-white/25 px-4 py-2 backdrop-blur-sm transition-all duration-200",
        isSelected && "border-[#e7a579] pb-5",
      )}
    >
      {/* trigger */}
      <button
        onClick={() => setOpenedFAQ(openedFAQ === index ? null : index)}
        className="flex cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-x-4 pb-2 xl:gap-x-5 2xl:gap-x-3">
          {/* number */}
          <div
            className={cn(
              "flex size-[45px] shrink-0 items-center justify-center rounded-full bg-[#f8e2cb] pt-1 xl:pt-1.25 text-[22px] text-[#ea580c] transition-colors duration-200 xl:size-[50px] xl:text-2xl",
              isSelected && "bg-[#ea580c] text-white",
            )}
          >
            {`0${index}`}
          </div>
          {/* label */}
          <div
            className={cn(
              "pt-1 xl:pt-1.25 text-right  text-[15px] xl:text-base text-neutral-600 2xl:pt-0",
              isSelected && "text-[#e77b02]",
            )}
          >
            {question}
          </div>
        </div>

        {/* chevron */}
        <div className="max-xl:hidden mr-4 flex size-[50px] justify-center pt-[7px] 2xl:mr-0">
          <ChevronDown
            className={cn(
              "transition duration-250",
              isSelected && "-rotate-180",
            )}
            size={30}
            color="#ea580c"
          />
        </div>
        <div className="xl:hidden mr-4 flex size-[45px] justify-center pt-[7px] 2xl:mr-0">
          <ChevronDown
            className={cn(
              "transition duration-250",
              isSelected && "-rotate-180",
            )}
            size={24}
            color="#ea580c"
          />
        </div>
      </button>

      {/* content */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden", transformOrigin: "top" }}
            layout
            className="pr-[62px] pl-6 text-sm/relaxed text-neutral-600 max-sm:text-justify"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQCard;
