import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 100],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "minio.danbildad.my.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "danbildad.web.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
