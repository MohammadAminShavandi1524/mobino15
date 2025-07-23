import { cn } from "@/lib/utils";

interface SkeletonProps {
  width: number;
  height: number;
}

const Skeleton = ({ height, width }: SkeletonProps) => {
  return (
    <div
      className={cn("block bg-custom-skeleton rounded-xl animate-pulse")}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};
export default Skeleton;
