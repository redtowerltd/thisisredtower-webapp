"use client";

import React, { useEffect, useRef } from "react";

import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  backgroundImage: string; // URL for the background image
  text: string; // Text to display in the foreground
  hideLayer?: boolean;
};

const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function ParallaxCta(props: ParallaxProps) {
  const { backgroundImage, text, hideLayer = false } = props;
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
          progress * -300
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
    <div ref={containerRef} className="relative h-[400px] overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center scale-125"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      <div className="relative z-10 flex h-full items-center justify-center">
        <h2
          className={cn(
            "text-white text-4xl md:text-6xl font-bold text-center px-4 uppercase",
            josefinSans.className
          )}
        >
          {text}
        </h2>
      </div>

      {!hideLayer && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
      )}
    </div>
  );
}
