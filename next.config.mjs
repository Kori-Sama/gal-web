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
        hostname: "q1.qlogo.cn",
        port: "",
        pathname: "/headimg_dl/**",
      },
      {
        protocol: "https",
        hostname: "q2.qlogo.cn",
        port: "",
        pathname: "/headimg_dl/**",
      },
      {
        protocol: "https",
        hostname: "q3.qlogo.cn",
        port: "",
        pathname: "/headimg_dl/**",
      },
      {
        protocol: "https",
        hostname: "q4.qlogo.cn",
        port: "",
        pathname: "/headimg_dl/**",
      },
    ],
  },
};

export default nextConfig;
