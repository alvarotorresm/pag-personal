import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  async redirects() {
    return [
      {
        source: "/",
        destination: BASE_PATH,
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
