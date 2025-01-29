"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface HeroBannerProps {
  data: any;
  assetUrl: string;
}

export default function HeroBanner(props: HeroBannerProps) {
  const { data, assetUrl } = props;
  const plugin = useRef(Autoplay({ delay: 8000, stopOnInteraction: false }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative max-h-600px] md:max-h-[800px] w-screen"
    >
      <CarouselContent className="w-screen h-full ml-0">
        {data &&
          data.map((slide: any, i: number) => (
            <CarouselItem
              key={i}
              className="relative max-h-[600px] md:max-h-[800px] w-full h-full pl-0"
            >
              <Image
                src={`${assetUrl}/${slide.backgroundImage}`}
                alt={slide.altText}
                className=" h-full w-full object-cover object-center"
                width={500}
                height={200}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 m-4" />
      <CarouselNext className="absolute right-2 m-4" />
    </Carousel>
  );
}
