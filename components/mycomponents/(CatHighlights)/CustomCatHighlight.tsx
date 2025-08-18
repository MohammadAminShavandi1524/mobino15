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
  imageSize,
}: CustomCatHighlightProps) => {
  return (
    <div className="my-14 flex w-full flex-col items-center justify-center">
      <div className="mb-8 text-[26px] font-medium text-black">
        برترین های {label}
      </div>
      <ul className="flex items-center gap-x-14">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <Link
                className="flex cursor-pointer flex-col items-center gap-y-3"
                href={option.href}
              >
                <div className="relative flex size-50 items-center justify-center">
                  <div
                    className={cn("size-43 rounded-[24px]")}
                    style={{ backgroundColor: bgColor }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 flex h-[182px] w-[182px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
                    <Image
                      className={cn(
                        "object-cover transition-all hover:scale-110",
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
