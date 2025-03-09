"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryProps {
  images: string[];
  title: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <Dialog open={open} onOpenChange={setOpen}>
          {images.map((image, index) => (
            <div key={index}>
              <DialogTrigger asChild>
                <Image
                  className="h-full w-full object-cover transition-all duration-500 cursor-pointer hover:scale-105 aspect-video"
                  src={image}
                  alt={title}
                  width={500}
                  height={200}
                  onClick={() => {
                    setSelectedImage(image);
                    setOpen(true);
                  }}
                />
              </DialogTrigger>
            </div>
          ))}

          <DialogContent className="p-0 bg-white max-w-4xl p-8">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full-size image"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Fragment>
  );
}
