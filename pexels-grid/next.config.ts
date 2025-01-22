import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  publicRuntimeConfig: {
    SSR_API_URL: process.env.SSR_API_URL,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
  serverRuntimeConfig:{
    SSR_API_URL: process.env.SSR_API_URL,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  }
};

export default nextConfig;
