import { cn } from "@/lib/utils";

interface TomanLogoProps {
  className?: string;
}

const TomanLogo = ({ className }: TomanLogoProps) => {
  return (
    <div
      className={cn(
        "relative h-5 w-5 text-[9.5px] font-bold text-[#424750]",
        className,
      )}
    >
      <div className="absolute right-[1.5px] bottom-[1px]">تو</div>
      <div className="absolute bottom-[0px] left-[2.5px]">ما</div>
      <div className="absolute top-[-3px] left-[2.5px]">ن</div>
    </div>
  );
};
export default TomanLogo;
