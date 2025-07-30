import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["dkstatics-public.digikala.com", "www.technolife.com"],
  },
};

export default withPayload(nextConfig);
