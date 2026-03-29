import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/menu",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
