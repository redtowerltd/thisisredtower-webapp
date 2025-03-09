"use client";

import React, { useEffect, useRef } from "react";

import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

interface ParallaxStaffProps {
  backgroundImage: string;
  text: string;
  side?: "left" | "right";
}

const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function ParallaxStaff(props: ParallaxStaffProps) {
  const { backgroundImage, text, side = "left" } = props;
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
    <section ref={containerRef} className="relative h-[500px] overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center scale-125"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {text && (
        <div
          className={cn(
            "relative z-10 flex h-full items-center mx-auto max-w-[500px]",
            {
              "md:justify-start md:ms-10": side === "left",
              "md:justify-end md:me-10": side === "right",
            }
          )}
        >
          <h2
            className={cn(
              "text-white text-4xl !font-semibold text-center uppercase bg-black bg-opacity-40 p-4",
              josefinSans.className
            )}
          >
            {text}
          </h2>
        </div>
      )}
    </section>
  );
}
