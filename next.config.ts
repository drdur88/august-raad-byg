import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for platforms that need it (e.g. plain nginx/Apache).
  // Comment this out when deploying to Vercel, Netlify or Railway — they run
  // the Node.js server directly and support Server Actions.
  // output: "export",

};

export default nextConfig;
