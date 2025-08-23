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
        "z-2 flex flex-col rounded-2xl border border-[#efdcc7] bg-white/25 px-4 py-2  backdrop-blur-sm transition-all duration-200",
        isSelected && "border-[#e7a579] pb-5",
      )}
    >
      {/* trigger */}
      <button
        onClick={() => setOpenedFAQ(openedFAQ === index ? null : index)}
        className="flex cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-x-3 pb-2">
          {/* number */}
          <div
            className={cn(
              "flex size-[50px] items-center justify-center rounded-full bg-[#f8e2cb] pt-0.75 text-2xl text-[#ea580c] transition-colors duration-200",
              isSelected && "bg-[#ea580c] text-white",
            )}
          >
            {`0${index}`}
          </div>
          {/* label */}
          <div
            className={cn(
              "text-base text-neutral-600",
              isSelected && "text-[#e77b02]",
            )}
          >
            {question}
          </div>
        </div>

        {/* chevron */}
        <div className="flex size-[50px] justify-center pt-[7px]">
          <ChevronDown
            className={cn(
              "transition duration-250",
              isSelected && "-rotate-180",
            )}
            size={30}
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
            className="pr-[62px] pl-6 text-sm/relaxed text-neutral-600"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQCard;
