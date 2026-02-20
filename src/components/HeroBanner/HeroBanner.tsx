"use client";

import { useCallback, useEffect, useState } from "react";

interface HeroBannerProps {
  data: any;
  assetUrl: string;
}

export default function HeroBanner(props: HeroBannerProps) {
  const { data, assetUrl } = props;

  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((current + 1) % data.length);
    }, 8000);
    return () => clearInterval(t);
  }, [current, goTo]);

  return (
    <section className="relative h-screen overflow-hidden">
      {data.map((s: any, i: number) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`${assetUrl}/${s.backgroundImage}`}
            alt={s.altText}
            className={`w-full h-full object-cover ${
              i === current ? "slide-enter" : ""
            }`}
            key={i === current ? key : i}
          />
        </div>
      ))}

      {/* Cinematic red vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "var(--gradient-red-vignette)" }}
      />

      {/* Dark gradient bottom fade */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "var(--gradient-hero-overlay)" }}
      />

      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />

      {/* Red corner accents */}
      <div
        className="absolute top-0 left-0 w-64 h-64 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, hsl(0 90% 35% / 0.25) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, hsl(0 90% 30% / 0.2) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-8 md:px-16">
        <div key={key}>
          <h1
            className="fade-up fade-up-delay-2 text-4xl md:text-7xl font-black text-white uppercase tracking-tight leading-none max-w-3xl mb-6 md:ms-8"
            style={{ textShadow: "0 2px 40px hsl(0 0% 0% / 1)" }}
          >
            {data[current].altText}
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {data.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-0.5 transition-all duration-500 ${
                i === current ? "w-12 bg-[#ce1211]" : "w-4 bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Slide nav arrows */}
        <button
          onClick={() => goTo((current - 1 + data.length) % data.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-[#ce1211] hover:border-[#ce1211] transition-colors text-lg"
        >
          ←
        </button>
        <button
          onClick={() => goTo((current + 1) % data.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-[#ce1211] hover:border-[#ce1211] transition-colors text-lg"
        >
          →
        </button>
      </div>
    </section>
  );
}
