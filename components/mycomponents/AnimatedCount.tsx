"use client";

import { convertToPersianNumber } from "@/lib/utils";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCountProps {
  count: number;
  duration?: number;
  decimals?: number; 
}

export default function AnimatedCount({
  count,
  duration = 2,
  decimals = 0, 
}: AnimatedCountProps) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, count, {
      duration,
      onUpdate(value) {
        setDisplay(Number(value.toFixed(decimals))); 
      },
    });
    return () => controls.stop();
  }, [count, duration, decimals]);

  return <span>{convertToPersianNumber(display)}</span>;
}
