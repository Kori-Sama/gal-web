"use client";
import React from "react";
import QQIcon from "@/components/icons/qq";
import SakuraIcon from "@/components/icons/sakura";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/store/user";
import Autoplay from "embla-carousel-autoplay";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col">
      <div className="flex h-full w-full select-none bg-[url('/bg.webp')] bg-cover bg-center dark:bg-[url('/dark-bg.webp')] lg:h-[92vh]">
        <CarouselCard />
        <div className="flex w-full flex-col">
          <LogoField />
          <PanelField />
        </div>
      </div>

      <div className="h-svh w-full bg-slate-800"></div>
    </main>
  );
}

interface ImageProps {
  src: string;
  alt: string;
  x?: string; //控制图片的水平起始位置
  y?: string; //控制图片的垂直起始位置
}
const ImageCard = ({ src, alt, x = "50%", y = "50%" }: ImageProps) => {
  return (
    <div className="h-full w-full">
      <Image
        className="h-full w-full overflow-hidden rounded-2xl object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
        style={{ objectPosition: `${x} ${y}` }}
        src={src}
        alt={alt}
        width={2000}
        height={2000}
      />
    </div>
  );
};

const CarouselCard = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  //在这里加图片
  const Images: ImageProps[] = [
    { src: "/images/Murasame-1.webp", alt: "Murasame1", x: "24%", y: "0%" },
    { src: "/images/Murasame-2.webp", alt: "Murasame2", x: "24%", y: "0%" },
    { src: "/images/Mako-1.webp", alt: "Mako1", x: "93%", y: "0%" },
    { src: "/images/10.webp", alt: "image", x: "75%", y: "0%" },
    { src: "/images/Suzuna-1.webp", alt: "image", x: "75%", y: "0%" },
  ];

  return (
    <div className="hidden h-full w-[120%] p-10 pt-3 lg:block">
      <Carousel
        plugins={[plugin.current]}
        className="h-full w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full w-full rounded-3xl">
          {Images.map(({ src, alt, x, y }) => (
            <CarouselItem key={src} className="h-full w-full p-10">
              <ImageCard src={src} alt={alt} x={x} y={y} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const LogoField = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center rounded-3xl shadow-xl transition duration-700 ease-linear hover:backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="order-2 py-3 text-6xl font-extrabold text-gray-700 dark:text-slate-200 lg:order-1 lg:text-8xl">
          0721の
          <br className="hidden lg:block" />
          小窝
        </div>

        <div className="order-1 flex h-auto max-h-[340px] w-auto items-center justify-center lg:order-2 lg:justify-start">
          <Image
            className="h-full max-h-[340px] w-full object-cover"
            src="/logo.png"
            alt="logo"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

const PanelField = () => {
  //判断用户是否登录
  const userInfo = useUser(s => s.userInfo);
  // userInfo.id = "Cypress";
  const GuestPanel = () => (
    <>
      <div className="flex rounded-xl bg-gray-400 bg-opacity-10 p-4 transition duration-300 ease-linear hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-md">
        欢迎回家, {userInfo.id}
        <br />
        今天想要做些什么呢？
      </div>
      {/* <div className="mt-10 h-2/3 w-full rounded-xl bg-gray-400 p-2">
        略缩的当前用户的投票情况
      </div> */}
    </>
  );
  const MemberPanel = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null); //for pausing the current audio
    return (
      <>
        <Collapsible className="m-2 flex w-full flex-col rounded-xl bg-opacity-10 p-4 shadow-xl transition duration-300 ease-linear hover:bg-white hover:bg-opacity-30 hover:backdrop-blur-sm">
          <CollapsibleTrigger className="dark:text-gray-300">
            你是...?
          </CollapsibleTrigger>
          <CollapsibleContent className="w-full">
            <div className="flex flex-col gap-3">
              <a className="w-full" href="/login">
                <div className="w-full rounded-xl p-2 transition-colors duration-500 ease-in-out hover:bg-gray-600 hover:text-gray-300">
                  {">"} 我是...
                </div>
              </a>
              <div
                className="group flex w-full justify-between rounded-xl p-2 transition-colors duration-500 ease-in-out hover:bg-white hover:text-red-400"
                onClick={() => {
                  //神必小语音
                  const randomBoolean = Math.random() >= 0.5;
                  const audioSrc = randomBoolean
                    ? "/audio/otto-cry.mp3"
                    : "/audio/anon.wav";

                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }

                  const sound = new Audio(audioSrc);
                  audioRef.current = sound;
                  sound.play();
                }}
              >
                {">"} 一切是我中的众生...
                <div className="hidden items-center justify-center transition-all duration-500 group-hover:block">
                  <SakuraIcon />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="hover:backdrop-blur-mdp-4 m-2 flex w-full justify-center rounded-xl p-4 transition duration-300 ease-linear hover:bg-white hover:bg-opacity-30 dark:text-gray-300">
          加入我们
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <QQIcon />
                  <a
                    className="hover:underline"
                    href="https://qm.qq.com/q/dzvDIXnJ3W"
                  >
                    1109299952
                  </a>
                </div>
              </TooltipTrigger>
              <TooltipContent className="rounded-2xl">
                <Image src="/qq-group.png" alt="qq" width={200} height={200} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl p-5">
      <div className="flex h-full w-full flex-col gap-3 rounded-xl p-1 text-3xl font-bold text-gray-800">
        {userInfo.id ? <GuestPanel /> : <MemberPanel />}
      </div>
    </div>
  );
};
