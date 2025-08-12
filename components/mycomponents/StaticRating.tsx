import { cn } from "@/lib/utils";
import { FC } from "react";

interface StaticRatingProps {
  value: number;
  size?: number;
  className?: string;
}

export const StaticRating = ({
  value,
  className,
  size = 20,
}: StaticRatingProps) => {
  const roundedValue = Math.round(value * 10) / 10; // رند به یک رقم اعشار

  return (
    <div
      style={{ direction: "ltr" }}
      className={cn("inline-flex items-center gap-x-1.5", className)}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const fullStars = Math.floor(roundedValue);
        const remainder = roundedValue - i;
        let fillPercent = 0;

        if (starValue <= fullStars) {
          fillPercent = 100;
        } else if (starValue - 1 < roundedValue && starValue > fullStars) {
          fillPercent = Math.max(0, Math.min(100, remainder * 100));
        }

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="text-gray-300"
          >
            <defs>
              <linearGradient id={`grad-${i}`}>
                <stop offset={`${fillPercent}%`} stopColor="#f1c21b" />
                <stop offset={`${fillPercent}%`} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#grad-${i})`}
              stroke="none"
              d="M12 .587l3.668 7.425L24 9.753l-6 5.847 
                 1.417 8.263L12 19.771l-7.417 3.992L6 
                 15.6 0 9.753l8.332-1.741z"
            />
          </svg>
        );
      })}
    </div>
  );
};
