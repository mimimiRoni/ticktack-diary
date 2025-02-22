import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "src/styles/variables" as *;`,
  },
};

export default nextConfig;
