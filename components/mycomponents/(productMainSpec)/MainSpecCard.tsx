import { cn } from "@/lib/utils";

interface MainSpecCardProps {
  title: string;
  value: number | string;
  firstChild?: boolean;
  lastChild?: boolean;
}

const MainSpecCard = ({
  title,
  value,
  firstChild,
  lastChild,
}: MainSpecCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-[14px] text-xs lg:text-[14px]",
        firstChild && "pt-0",
        lastChild && "border-b-0 pb-0",
      )}
    >
      <span className="ml-3 font-light text-[#385086] shrink-0">{title} :</span>
      <span>{value}</span>
    </div>
  );
};

export default MainSpecCard;
