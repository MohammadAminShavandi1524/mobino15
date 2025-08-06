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
        " flex  justify-center items-center gap-x-0.75 sm:gap-x-1  w-full text-center",
        className
      )}
    >
      <div
        className={cn(
          "size-1.5 sm:size-2 bg-custom-primary rounded-full animate-bounce [animation-delay:-0.2s]",
          size && `size-${size}`,
          dotClassName
        )}
      ></div>
      <div
        className={cn(
          "size-1.5 sm:size-2 bg-custom-primary rounded-full animate-bounce [animation-delay:-0.15s]",
          size && `size-${size}`,
          dotClassName
        )}
      ></div>
      <div
        className={cn(
          "size-1.5 sm:size-2 bg-custom-primary rounded-full animate-bounce",
          size && `size-${size}`,
          dotClassName
        )}
      ></div>
    </div>
  );
};
export default LoadingDots;
