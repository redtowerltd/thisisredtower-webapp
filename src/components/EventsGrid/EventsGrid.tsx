"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventsGridProps {
  data: any;
  assetUrl: string;
}

export default function EventsGrid(props: EventsGridProps) {
  const { data, assetUrl } = props;

  const [allEvents, setAllEvents] = useState(9);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = (event: any) => {
    setSelectedEvent(event);
    setOpen(true);
    setLoading(true);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-12 gap-6">
        {data &&
          data.slice(0, allEvents).map((event: any, i: number) => {
            return (
              <div
                key={i}
                className={cn("relative group overflow-hidden cursor-pointer", {
                  "col-span-12 md:col-span-4": i < 3,
                  "col-span-6 md:col-span-2": i >= 3,
                })}
                onClick={() => handleOpenDialog(event)}
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
              </div>
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

      {/* Dialog for Event Details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[100%] max-w-screen-lg !rounded-none">
          <DialogHeader>
            <DialogTitle className="text-2xl uppercase">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>{selectedEvent?.description}</DialogDescription>
          </DialogHeader>

          <div className="relative mt-4 flex justify-center items-center">
            {loading && (
              <div className="absolute z-10 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
              </div>
            )}
            {selectedEvent?.thumbnail && (
              <Image
                className={cn("rounded-md transition-opacity w-full", {
                  "opacity-0": loading,
                  "opacity-100": !loading,
                })}
                src={`${assetUrl}${selectedEvent.thumbnail}`}
                alt={selectedEvent.title}
                width={800}
                height={400}
                onLoad={handleImageLoad}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
