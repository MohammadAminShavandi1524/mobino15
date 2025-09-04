"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useElementDimensions(
  ref: React.RefObject<HTMLDivElement | null>,
): [
  { width: number; height: number; top: number; left: number },
  VoidFunction,
] {
  const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

  function measure() {
    if (!ref.current) return;

    setSize(ref.current.getBoundingClientRect());
  }

  // Note: This won't accurately reflect viewport size changes
  useEffect(() => {
    measure();
  }, []);

  return [size, measure];
}

interface ConicGradientButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  buttonType: "submit" | "button";
}

export default function ConicGradientButton({
  buttonType,
  children,
  disabled,
  className,
}: ConicGradientButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ width, height, top, left }, measure] = useElementDimensions(ref);
  const gradientX = useMotionValue(0.5);
  const gradientY = useMotionValue(0.5);

  const background = useTransform(
    () =>
      `conic-gradient(from 0deg at calc(${
        gradientX.get() * 100
      }% - ${left}px) calc(${
        gradientY.get() * 100
      }% - ${top}px), #0cdcf7, #5a79d6, #9f7aea, #0cdcf7)`,
  );

  return (
    <button
      type={buttonType}
      disabled={disabled}
      className="relative mt-10 w-full mb-10"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPointerMove={(e) => {
          gradientX.set(e.clientX / width);
          gradientY.set(e.clientY / height);
        }}
      >
        <motion.div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
          style={{ background }}
          onPointerEnter={() => measure()}
        >
          <span className="relative z-10 self-center">{children}</span>
        </motion.div>
      </div>
    </button>
  );
}
