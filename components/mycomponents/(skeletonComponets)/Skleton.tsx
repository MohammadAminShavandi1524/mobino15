import { cn } from "@/lib/utils";

interface SkeletonProps {
  width: number;
  height: number;
}

const Skeleton = ({ height, width }: SkeletonProps) => {
  return (
    <div
      className={cn("bg-custom-skeleton block animate-pulse rounded-xl")}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};
export default Skeleton;
