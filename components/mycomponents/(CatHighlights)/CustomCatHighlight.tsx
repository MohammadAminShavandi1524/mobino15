import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CustomCatHighlightProps {
  options: {
    img: string;
    label: string;
    href: string;
  }[];
  label: string;
  bgColor: string;
  imageSize?: number;
}

const CustomCatHighlight = ({
  label,
  options,
  bgColor,
  imageSize
}: CustomCatHighlightProps) => {
  return (
    <div className="flex flex-col  justify-center items-center w-full my-14 ">
      <div className="text-[26px] font-medium text-black mb-8">
        برترین های {label}
      </div>
      <ul className="flex items-center gap-x-14">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <Link
                className="flex flex-col items-center gap-y-3 cursor-pointer"
                href={option.href}
              >
                <div className="relative size-50  flex justify-center items-center">
                  <div
                    className={cn("size-43 rounded-[24px]")}
                    style={{ backgroundColor: bgColor }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[182px] h-[182px] flex justify-center items-center">
                    <Image
                      className={cn(
                        "transition-all hover:scale-110 object-cover"
                      )}
                      src={option.img}
                      alt={option.label}
                      width={imageSize || 182}
                      height={imageSize || 182}
                    />
                  </div>
                </div>
                <span className="text-[18px]">{option.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomCatHighlight;
