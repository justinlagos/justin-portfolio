'use client';

import { useState } from "react";
import Image from "next/image";
import { ProjectMedia } from "@/types";
import { getStorageUrl } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  images: ProjectMedia[];
}

export function Gallery({ images }: GalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const lightboxImages = images.map((img) => ({
    src: getStorageUrl(img.image_url),
    alt: img.alt_text || img.caption || 'Gallery image',
    caption: img.caption || undefined,
  }));

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className="group relative w-full aspect-[4/3] overflow-hidden rounded cursor-pointer"
          >
            <Image
              src={getStorageUrl(image.image_url)}
              alt={image.caption || `Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={selectedIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}
