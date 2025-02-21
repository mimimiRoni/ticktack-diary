import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "src/styles/globals" as *;`,
  },
};

export default nextConfig;
