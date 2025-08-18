import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CatHighlightsProps {
  options: {
    img: string;
    label: string;
    href: string;
  }[];
  label: string;
}

const CatHighlights = ({ options, label }: CatHighlightsProps) => {
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
                <Image
                  className={cn("")}
                  src={option.img}
                  alt={option.label}
                  width={200}
                  height={200}
                />
                <span className="text-[18px]">{option.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CatHighlights;
