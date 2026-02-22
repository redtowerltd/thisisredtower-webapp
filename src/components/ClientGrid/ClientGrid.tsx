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

interface ClientGridProps {
  data: any;
  assetUrl: string;
}

export default function ClientGrid(props: ClientGridProps) {
  const { data, assetUrl } = props;

  const [allClients, setAllClients] = useState(12);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleOpenDialog = (event: any) => {
    setSelectedClient(event);
    setOpen(true);
  };

  return (
    <>
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
                  <div className="absolute inset-0 flex items-end justify-center p-4">
                    <h3 className="text-white text-sm md:text-[18px] font-bold !p-1 text-center uppercase bg-black/80 px-1">
                      {event.title}
                    </h3>
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
                  onClick={() => setAllClients(12)}
                >
                  Show Less
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedClient(null);
        }}
      >
        <DialogContent className="w-full max-w-screen-lg !rounded-none">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl uppercase">
              {selectedClient?.title}
            </DialogTitle>
            <DialogDescription>{selectedClient?.description}</DialogDescription>
          </DialogHeader>

          {/* Image Wrapper */}
          <div className="relative w-full flex justify-center items-center h-[400px]">
            {selectedClient?.thumbnail && (
              <Image
                className="w-auto h-full max-h-full object-contain"
                src={`${assetUrl}/${selectedClient.thumbnail}`}
                alt={selectedClient.title}
                width={800}
                height={600}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
