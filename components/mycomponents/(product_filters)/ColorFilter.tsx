"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { GroupedColors } from "@/hooks/useProductFilter";
import { adjustAlpha, cn } from "@/lib/utils";
import { ParserBuilder, SetValues } from "nuqs";

interface ColorFilterProps {
  colors: string[] | null;
  isColorFilterActive: boolean;
  setFilters: SetValues<{
    color: ParserBuilder<string[]>;
  }>;
}

const ColorFilter = ({
  isColorFilterActive,
  colors,
  setFilters,
}: ColorFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // // ? color group options based of product colors

  // const colorGroupOptionsMap = new Map<
  //   string,
  //   {
  //     name: string;
  //     label: string;
  //     color: string;
  //   }
  // >();

  // productColors.forEach((color) => {
  //   // * White  Group
  //   if (["TitaniumWhite", "White"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[0], {
  //       name: GroupedColors[0],
  //       label: "سفید",
  //       color: "rgba(255, 255, 255, 1)",
  //     });
  //   }
  //   // * Black Group
  //   if (["TitaniumBlack", "Black", "JetBlackTitanium"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[1], {
  //       name: GroupedColors[1],
  //       label: "سیاه",
  //       color: "rgba(0, 0, 0, 1)",
  //     });
  //   }
  //   // * Blue Group
  //   if (
  //     [
  //       "DarkBlue",
  //       "TitaniumIceBlue",
  //       "LightBlue",
  //       "Blue",
  //       "NavyBlue",
  //       "oceanBlue",
  //       "skyBlue",
  //     ].includes(color)
  //   ) {
  //     colorGroupOptionsMap.set(GroupedColors[2], {
  //       name: GroupedColors[2],
  //       label: "آبی",
  //       color: "rgba(25, 118, 210, 1)",
  //     });
  //   }
  //   // * Yellow Group
  //   if (["Golden", "yellow", "Lemon", "Cream"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[3], {
  //       name: GroupedColors[3],
  //       label: "زرد",
  //       color: "rgba(251, 192, 45, 1)",
  //     });
  //   }
  //   // * Neutral Group
  //   if (
  //     [
  //       "Silver",
  //       "TitaniumSilver",
  //       "DarkGray",
  //       "TitaniumGray",
  //       "Gray",
  //       "LightGray",
  //       "NaturalTitanium",
  //       "graphite",
  //       "charcoalGray",
  //       "TitaniumDesert",
  //     ].includes(color)
  //   ) {
  //     colorGroupOptionsMap.set(GroupedColors[4], {
  //       name: GroupedColors[4],
  //       label: "خنثی",
  //       color: "rgba(161, 163, 168, 1)",
  //     });
  //   }
  //   // * Green Group
  //   if (["Green", "LightGreen", "oliveGreen", "mintGreen"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[5], {
  //       name: GroupedColors[5],
  //       label: "سبز",
  //       color: "rgba(104, 159, 56, 1)",
  //     });
  //   }
  //   // * Pink Group
  //   if (["Pink", "roseGold", "lilac"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[6], {
  //       name: GroupedColors[6],
  //       label: "صورتی",
  //       color: "rgba(194, 24, 91, 1)",
  //     });
  //   }
  //   // * Red Group
  //   if (["Red", "Brick", "Orange", "copper", "bronze"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[7], {
  //       name: GroupedColors[7],
  //       label: "قرمز",
  //       color: "rgba(211, 47, 47, 1)",
  //     });
  //   }
  //   // * Purple Group
  //   if (["Purple", "TitaniumPurple"].includes(color)) {
  //     colorGroupOptionsMap.set(GroupedColors[8], {
  //       name: GroupedColors[8],
  //       label: "بنفش",
  //       color: "rgba(123, 31, 162, 1)",
  //     });
  //   }
  // });

  // const colorGroupOptions = Array.from(colorGroupOptionsMap.values());

  // ? all oprions
  const options = [
    // * White  Group
    {
      name: GroupedColors[0],
      label: "سفید",
      color: "rgba(255, 255, 255, 1)",
    },

    // * Black Group
    {
      name: GroupedColors[1],
      label: "سیاه",
      color: "rgba(0, 0, 0, 1)",
    },

    // * Blue Group
    {
      name: GroupedColors[2],
      label: "آبی",
      color: "rgba(25, 118, 210, 1)",
    },

    // * Yellow Group
    {
      name: GroupedColors[3],
      label: "زرد",
      color: "rgba(251, 192, 45, 1)",
    },

    // * Neutral Group
    {
      name: GroupedColors[4],
      label: "خنثی",
      color: "rgba(161, 163, 168, 1)",
    },

    // * Green Group
    {
      name: GroupedColors[5],
      label: "سبز",
      color: "rgba(104, 159, 56, 1)",
    },

    // *Pink Group
    {
      name: GroupedColors[6],
      label: "صورتی",
      color: "rgba(194, 24, 91, 1)",
    },

    // * Red Group
    {
      name: GroupedColors[7],
      label: "قرمز",
      color: "rgba(211, 47, 47, 1)",
    },
    // *Purple Group
    {
      name: GroupedColors[8],
      label: "بنفش",
      color: "rgba(123, 31, 162, 1)",
    },
  ];
  // ?

  if (isFilterOpen)
    return (
      <div className="cursor-pointer border-b border-b-[#ced0d0]">
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
        >
          <div className="relative">
            <div>رنگ ها</div>
            {isColorFilterActive && (
              <div className="absolute top-[8px] left-[-14px] h-[6px] w-[6px] rounded-full bg-[#19bfd3]"></div>
            )}
          </div>

          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          >
            <ChevronUp size={16} />
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 px-[14px] pt-1 pb-3">
          {options.map((colorGroup) => {
            const isSelected = colors?.includes(colorGroup.name);

            const handleColorChange = () => {
              setFilters((prev) => {
                const prevColors = prev.color || [];
                return {
                  ...prev,
                  color: isSelected
                    ? prevColors.filter((c) => c !== colorGroup.name)
                    : [...prevColors, colorGroup.name],
                };
              });
            };

            return (
              <div
                onClick={handleColorChange}
                className="flex flex-col items-center gap-y-3"
                key={colorGroup.name}
              >
                {/* color */}
                <div
                  className={cn(
                    "flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border border-[#e0e0e2]",
                    isSelected && "border-[3px] border-[#19bfd3]",
                  )}
                >
                  {colorGroup.label === "سفید" ||
                  colorGroup.label === "سیاه" ? (
                    <div
                      className={cn(
                        "h-9 w-9 rounded-md",
                        colorGroup.label === "سفید" &&
                          "border border-[#e0e0e2]",
                      )}
                      style={{ background: colorGroup.color }}
                    ></div>
                  ) : (
                    <div className={cn("grid h-9 w-9 grid-cols-4 rounded-md")}>
                      <div
                        style={{
                          background: adjustAlpha(colorGroup.color, 0.25),
                        }}
                        className="h-full rounded-r-md"
                      ></div>
                      <div
                        style={{
                          background: adjustAlpha(colorGroup.color, 0.5),
                        }}
                        className="h-full"
                      ></div>
                      <div
                        style={{
                          background: adjustAlpha(colorGroup.color, 0.75),
                        }}
                        className="h-full"
                      ></div>
                      <div
                        style={{
                          background: adjustAlpha(colorGroup.color, 1),
                        }}
                        className="h-full rounded-l-md"
                      ></div>
                    </div>
                  )}
                </div>
                {/* label */}
                <div className="text-[12px] text-[#3f4064]">
                  {colorGroup.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  return (
    <div
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="flex cursor-pointer items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
    >
      <div className="relative">
        <div>رنگ ها</div>
        {isColorFilterActive && (
          <div className="absolute top-[8px] left-[-14px] h-[6px] w-[6px] rounded-full bg-[#19bfd3]"></div>
        )}
      </div>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </div>
  );
};
export default ColorFilter;
