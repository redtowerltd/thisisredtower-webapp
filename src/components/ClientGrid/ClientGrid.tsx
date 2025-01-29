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
import { Loader2 } from "lucide-react"; // Shadcn-compatible spinner icon
import { cn } from "@/lib/utils";

interface ClientGridProps {
  data: any;
  assetUrl: string;
}

export default function ClientGrid(props: ClientGridProps) {
  const { data, assetUrl } = props;

  const [allClients, setAllClients] = useState(9);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = (event: any) => {
    setSelectedClient(event);
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
          data.slice(0, allClients).map((event: any, i: number) => {
            return (
              <div
                key={i}
                className="relative group overflow-hidden cursor-pointer col-span-6 md:col-span-2"
                onClick={() => handleOpenDialog(event)}
              >
                {event.thumbnail && (
                  <Image
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 aspect-square"
                    src={`${assetUrl}/${event.thumbnail}`}
                    alt={event.title}
                    width={500}
                    height={200}
                  />
                )}
                <div className="absolute h-full w-full inset-0 bg-black transition-all duration-500 opacity-0 group-hover:opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h2 className="text-white text-xl md:text-2xl font-bold text-center uppercase bg-black/90 px-1">
                    {event.title}
                  </h2>
                </div>
              </div>
            );
          })}
        {data.length > 12 && (
          <div className="col-span-12 flex align-center justify-center md:col-span-12">
            {allClients === 12 ? (
              <Button
                variant="outline"
                className="uppercase"
                size="xxl"
                onClick={() => setAllClients(data.length)}
              >
                Show All
              </Button>
            ) : (
              <Button
                variant="outline"
                className="uppercase"
                size="xxl"
                onClick={() => setAllClients(9)}
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
              {selectedClient?.title}
            </DialogTitle>
            <DialogDescription>{selectedClient?.description}</DialogDescription>
          </DialogHeader>

          <div className="relative mt-4 flex justify-center items-center">
            {loading && (
              <div className="absolute z-10 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
              </div>
            )}
            {selectedClient?.thumbnail && (
              <Image
                className={cn("rounded-md transition-opacity w-full", {
                  "opacity-0": loading,
                  "opacity-100": !loading,
                })}
                src={`${assetUrl}${selectedClient.thumbnail}`}
                alt={selectedClient.title}
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
