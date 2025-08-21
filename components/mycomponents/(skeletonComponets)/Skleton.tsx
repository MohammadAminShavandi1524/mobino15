import { cn } from "@/lib/utils";

interface SkeletonProps {
  className: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      // style={{ width: `${width}px`, height: `${height}px` }}
      className={cn("shimmer", className)}
    />
  );
};

export default Skeleton;
