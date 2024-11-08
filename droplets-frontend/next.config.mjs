/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve("src"); // Adjust path if `src` is not in the project root
    return config;
  },
};

export default nextConfig;
