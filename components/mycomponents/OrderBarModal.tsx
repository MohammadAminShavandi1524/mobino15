"use client";

import { cn, getSortLabel } from "@/lib/utils";
import { ArrowDownWideNarrow, Check, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface OrderBarModalProps {
  isOrderbarModalOpened: boolean;
  setIsOrderbarModalOpened: Dispatch<SetStateAction<boolean>>;
  sorts:
    | "MostPopular"
    | "HighestPrice"
    | "LowestPrice"
    | "BiggestDiscount"
    | null;
  sortOptions: {
    label: string;
    value: string;
  }[];
  handleSortChange: (
    value: "MostPopular" | "HighestPrice" | "LowestPrice" | "BiggestDiscount",
  ) => void;
}

const OrderBarModal = ({
  isOrderbarModalOpened,
  setIsOrderbarModalOpened,
  sorts,
  sortOptions,
  handleSortChange,
}: OrderBarModalProps) => {
  return (
    <AnimatePresence>
      {isOrderbarModalOpened && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOrderbarModalOpened(false)}
          className="fixed top-0 right-0 z-[500] flex min-h-screen min-w-screen items-center justify-center overflow-y-scroll bg-zinc-900/50"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 30,
              mass: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative flex w-[300px] max-w-[420px] flex-col rounded-xl bg-white py-8 pr-8 pl-8 shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
          >
            {/* close btn */}

            <button
              onClick={() => setIsOrderbarModalOpened(false)}
              className="absolute top-7 left-7 flex size-7 cursor-pointer items-center justify-center rounded-full border border-[#b9375d]"
            >
              <X size={24} strokeWidth={2} color="#b9375d" />
            </button>

            <div className="mb-4 flex min-w-40 items-center gap-x-2.5 text-[#666666]">
              <span className="">
                <ArrowDownWideNarrow size={20} />
              </span>
              <span>ترتیب :</span>
            </div>

            <div className="flex flex-col gap-y-2">
              {sortOptions.map((sort, index) => {
                const isSelected = sorts?.includes(sort.value);

                return (
                  <div
                    key={index}
                    onClick={() =>
                      handleSortChange(
                        sort.value as
                          | "MostPopular"
                          | "HighestPrice"
                          | "LowestPrice"
                          | "BiggestDiscount",
                      )
                    }
                    className={cn(
                      "flex min-w-40 cursor-pointer items-center gap-x-2.5 py-4",
                      isSelected && "font-medium text-[#2296f3]",
                    )}
                  >
                    {" "}
                    {isSelected ? (
                      <>
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-md border border-[#666666]",
                            isSelected && "border-[#2296f3]",
                          )}
                        >
                          <Check strokeWidth={3} size={16} color="#2296f3" />
                        </span>
                      </>
                    ) : (
                      <span className="size-5 rounded-md border border-[#666666]"></span>
                    )}
                    <span>{sort.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderBarModal;
