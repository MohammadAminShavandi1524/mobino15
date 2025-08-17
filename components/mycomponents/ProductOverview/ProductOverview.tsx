"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useState } from "react";

interface ProductOverviewContextType {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductOverviewContext = createContext<ProductOverviewContextType | null>(
  null
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

  return (
    <ProductOverviewContext.Provider value={{ isOpened, setIsOpened }}>
      <div
        className={cn(
          "flex flex-col mt-8 pt-8 border-t border-t-[#d7dee0]",
          className
        )}
      >
        {children}

        {/* button */}
        <button
          onClick={() => setIsOpened(!isOpened)}
          className="flex items-center gap-x-1 self-baseline text-custom-primary my-4 mt-8 cursor-pointer "
        >
          {isOpened ? (
            <>
              <span>بستن</span>
              <span className="pt-0.5">
                <ChevronUp size={20} />
              </span>
            </>
          ) : (
            <>
              <span>نمایش بیشتر</span>
              <span className="pt-0.5">
                <ChevronDown size={20} />
              </span>
            </>
          )}
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
        isOpened ? "h-fit " : "max-h-0"
      )}
    >
      {children}
    </div>
  );
};

const MainTitle = ({ label }: { label: string }) => {
  return <h1 className="text-[#333333] my-4 mt-6 font-medium">{label}</h1>;
};
const Title = ({ label }: { label: string }) => {
  return (
    <h3 className="text-base/[32px] text-[#666666] my-4 mt-6 font-medium">
      {label}
    </h3>
  );
};

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm/[32px] text-[#5f5f5f]">{children}</p>;
};

const CustomLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link className="text-[#41b2e4] " href={href}>
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
