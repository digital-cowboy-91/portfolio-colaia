import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gtgwmloehjftsoyxpfhm.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/colaia.dev/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
