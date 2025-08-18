"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex cursor-pointer items-center justify-center rounded-lg p-2"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <span className="text-primaryText text-2xl">
          <Moon />
        </span>
      ) : (
        <span className="text-primaryText text-2xl">
          <Sun />
        </span>
      )}
    </button>
  );
}
