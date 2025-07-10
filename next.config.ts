import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "g1wfrmj0qm.ufs.sh",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
