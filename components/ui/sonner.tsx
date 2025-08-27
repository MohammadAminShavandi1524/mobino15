"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner className="toaster group bg-green-500 text-white" {...props} />
  );
};

export { Toaster };
