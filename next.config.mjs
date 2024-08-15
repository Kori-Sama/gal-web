/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lain.bgm.tv",
        port: "",
        pathname: "/pic/**",
      },
    ],
  },
};

export default nextConfig;
