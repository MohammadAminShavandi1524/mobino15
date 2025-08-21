"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "./Skleton";

interface RemoteImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

export default function RemoteImage({
  src,
  alt,
  width,
  height,
  className,
}: RemoteImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: "relative", width, height }}>
      {loading && <Skeleton className={className} />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
        }
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
