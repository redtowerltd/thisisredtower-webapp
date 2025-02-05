"use client";

import React, { useEffect, useRef } from "react";

import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

interface ParallaxVideoProps {
  backgroundImage: string;
  text: string;
  hideLayer?: boolean;
}

const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function ParallaxVideo(props: ParallaxVideoProps) {
  const { backgroundImage, hideLayer = false } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && backgroundRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate the progress of the component within the viewport
        const progress = Math.min(
          1,
          Math.max(
            0,
            (viewportHeight - containerRect.top) /
              (viewportHeight + containerRect.height)
          )
        );

        // Adjust the background position based on the progress
        backgroundRef.current.style.transform = `translateY(${
          progress * -100
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] sm:h-[500px] md:h-[800px] overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center scale-125"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full items-center justify-center p-8">
        <h2
          className={cn(
            "text-white text-2xl md:text-6xl !font-semibold text-center px-4 uppercase mb-4",
            josefinSans.className
          )}
        >
          Promotional Video
        </h2>
        <div className="max-w-[900px] flex justify-center items-center w-full">
          <video className="w-full aspect-video" controls autoPlay loop muted>
            <source
              className="w-full aspect-video"
              src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_20mb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {!hideLayer && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
      )}
    </div>
  );
}
