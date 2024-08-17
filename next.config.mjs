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
      {
        protocol: "https",
        hostname: "i1.hdslb.com",
        port: "",
        pathname: "/bfs/**",
      },
      {
        protocol: "https",
        hostname: "q3.qlogo.cn",
        port: "",
        pathname: "/headimg_dl/**",
      },
    ],
  },
};

export default nextConfig;
