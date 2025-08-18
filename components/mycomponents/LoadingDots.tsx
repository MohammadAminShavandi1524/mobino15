import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  size?: number;
  className?: string;
  dotClassName?: string;
}

const LoadingDots = ({ size, className, dotClassName }: LoadingDotsProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-x-0.75 text-center sm:gap-x-1",
        className,
      )}
    >
      <div
        className={cn(
          "bg-custom-primary size-1.5 animate-bounce rounded-full [animation-delay:-0.2s] sm:size-2",
          size && `size-${size}`,
          dotClassName,
        )}
      ></div>
      <div
        className={cn(
          "bg-custom-primary size-1.5 animate-bounce rounded-full [animation-delay:-0.15s] sm:size-2",
          size && `size-${size}`,
          dotClassName,
        )}
      ></div>
      <div
        className={cn(
          "bg-custom-primary size-1.5 animate-bounce rounded-full sm:size-2",
          size && `size-${size}`,
          dotClassName,
        )}
      ></div>
    </div>
  );
};
export default LoadingDots;
