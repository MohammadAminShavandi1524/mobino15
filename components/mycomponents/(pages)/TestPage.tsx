"use client";

import { motion } from "framer-motion";

const TestPage = ({}) => {
  return (
    <div className="w-full">
      <div className="bg-background relative h-screen w-full overflow-hidden">
        {/* Top Left Circles - 45% coverage */}
        <div className="absolute -top-[22.5vw] -left-[22.5vw] border">
          {/* Largest circle (back) - light blue */}
          <div
            className="h-[45vw] w-[45vw] rounded-full opacity-20"
            style={{
              background:
                "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #93c5fd 100%)",
            }}
          />
          {/* Medium circle (middle) */}
          <div
            className="absolute top-[5vw] left-[5vw] h-[35vw] w-[35vw] rounded-full opacity-40"
            style={{
              background:
                "linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)",
            }}
          />
          {/* Smallest circle (front) - deeper blue */}
          <div
            className="absolute top-[10vw] left-[10vw] h-[25vw] w-[25vw] rounded-full opacity-60"
            style={{
              background:
                "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e3a8a 100%)",
            }}
          />
        </div>

        {/* Bottom Right Circles - 30% coverage */}
        <div className="absolute -right-[15vw] -bottom-[15vw]">
          {/* Largest circle (back) - light blue */}
          <div
            className="h-[30vw] w-[30vw] rounded-full opacity-20"
            style={{
              background:
                "linear-gradient(315deg, #e0f2fe 0%, #bae6fd 50%, #93c5fd 100%)",
            }}
          />
          {/* Medium circle (middle) */}
          <div
            className="absolute right-[3vw] bottom-[3vw] h-[24vw] w-[24vw] rounded-full opacity-40"
            style={{
              background:
                "linear-gradient(315deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
            }}
          />
          {/* Smallest circle (front) - darker blue */}
          <div
            className="absolute right-[6vw] bottom-[6vw] h-[18vw] w-[18vw] rounded-full opacity-60"
            style={{
              background:
                "linear-gradient(315deg, #1e40af 0%, #1d4ed8 30%, #1e3a8a 60%, #0f172a 100%)",
            }}
          />
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex size-full items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">Hello, World!</h1>
            <p className="text-muted-foreground">
              Your content goes here with beautiful overlapping circle
              backgrounds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
