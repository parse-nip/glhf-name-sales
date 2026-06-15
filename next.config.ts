import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i2c.seadn.io" },
      { protocol: "https", hostname: "gigaverse.io" },
      { protocol: "https", hostname: "**.gigaverse.io" },
    ],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
