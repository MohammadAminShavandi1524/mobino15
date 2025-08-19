"use client";

import { useBreakpoints } from "@/hooks/useBreakPoint";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useState } from "react";

interface ProductOverviewContextType {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductOverviewContext = createContext<ProductOverviewContextType | null>(
  null,
);

const useProductOverview = () => {
  const ctx = useContext(ProductOverviewContext);
  if (!ctx) {
    throw new Error("useProductOverview باید داخل ProductOverview استفاده بشه");
  }
  return ctx;
};

interface ProductOverviewProps {
  children: React.ReactNode;
  className?: string;
}

const ProductOverview = ({ children, className }: ProductOverviewProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { lg, md } = useBreakpoints();
  return (
    <ProductOverviewContext.Provider value={{ isOpened, setIsOpened }}>
      <div
        className={cn(
          "mt-[150px] flex flex-col border-t border-t-[#d7dee0] pt-8 text-justify max-lg:px-4",
          className,
        )}
      >
        {children}

        {/* button */}
        <button
          onClick={() => setIsOpened(!isOpened)}
          className="text-custom-primary my-4 mt-8 flex cursor-pointer items-center gap-x-1 self-baseline"
        >
          <span className="text-xs md:text-sm lg:text-base">
            {isOpened ? "بستن" : "نمایش بیشتر"}
          </span>
          <span className="pt-0.5">
            {isOpened ? (
              <ChevronUp size={lg ? 20 : md ? 18 : 16} />
            ) : (
              <ChevronDown size={lg ? 20 : md ? 18 : 16} />
            )}
          </span>
        </button>
      </div>
    </ProductOverviewContext.Provider>
  );
};

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ExtraContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

const ExtraContent = ({ children, className }: ExtraContentProps) => {
  const { isOpened } = useProductOverview();
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpened ? "h-fit" : "max-h-0",
      )}
    >
      {children}
    </div>
  );
};

const MainTitle = ({ label }: { label: string }) => {
  return <h1 className="my-4 mt-6 font-medium text-[#333333]">{label}</h1>;
};
const Title = ({ label }: { label: string }) => {
  return (
    <h3 className="my-4 mt-6 text-base/[32px] font-medium text-[#666666]">
      {label}
    </h3>
  );
};

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm/[32px] text-[#5f5f5f]">{children}</p>;
};

const CustomLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link className="text-[#41b2e4]" href={href}>
      {" "}
      {label}{" "}
    </Link>
  );
};

export {
  ProductOverview,
  MainTitle,
  ExtraContent,
  Content,
  Paragraph,
  Title,
  CustomLink,
};
