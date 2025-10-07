import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "d1wc69nzx5ojwh.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "www.bocadolobo.com",
      },
      {
        protocol: "https",
        hostname: "vitafoamng.com",
      },
      {
        protocol: "https",
        hostname: "www.tradegully.com",
      },
      {
        protocol: "https",
        hostname: "www.eunicon.com.ng",
      },
      {
        protocol: "https",
        hostname: "picketandrail.com",
      },
      {
        protocol: "https",
        hostname: "nobili-design.com",
      },
      {
        protocol: "https",
        hostname: "www.jensenoutdoor.com",
      },
    ],
  },
  
};



export default nextConfig;
