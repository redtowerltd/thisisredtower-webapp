"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EventsGridProps {
  data: any;
  assetUrl: string;
}

export default function EventsGrid(props: EventsGridProps) {
  const { data, assetUrl } = props;

  const [allEvents, setAllEvents] = useState(9);

  return (
    <div className="py-8">
      <div className="grid grid-cols-12 gap-6">
        {data &&
          data.slice(0, allEvents).map((event: any, i: number) => {
            return (
              <Link
                key={i}
                className={cn("relative group overflow-hidden cursor-pointer", {
                  "col-span-12 md:col-span-4": i < 3,
                  "col-span-6 md:col-span-2": i >= 3,
                })}
                href={`/events#${event.slug}`}
              >
                {event.thumbnail && (
                  <Image
                    className={cn(
                      "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
                      {
                        "aspect-video": i < 3,
                        "aspect-square": i >= 3,
                      }
                    )}
                    src={`${assetUrl}/${event.thumbnail}`}
                    alt={event.title}
                    width={500}
                    height={200}
                  />
                )}
                <div className="absolute h-full w-full inset-0 bg-black transition-all duration-500 opacity-0 group-hover:opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-white text-xl md:text-2xl font-bold text-center uppercase bg-black/90 px-1">
                    {event.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        {data.length > 9 && (
          <div className="col-span-12 flex align-center justify-center md:col-span-12">
            {allEvents === 9 ? (
              <Button
                variant="outline"
                className="uppercase"
                size="xxl"
                onClick={() => setAllEvents(data.length)}
              >
                Show All
              </Button>
            ) : (
              <Button
                variant="outline"
                className="uppercase"
                size="xxl"
                onClick={() => setAllEvents(9)}
              >
                Show Less
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
