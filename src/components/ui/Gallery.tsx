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
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  if (!images || images.length === 0) {
    return null;
  }

  const visibleImages = images.filter((img) => !failedImages.has(img.id));

  const lightboxImages = visibleImages.map((img) => ({
    src: getStorageUrl(img.image_url),
    alt: img.alt_text || img.caption || 'Gallery image',
    caption: img.caption || undefined,
  }));

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const handleImageError = (imageId: string) => {
    setFailedImages((prev) => new Set(prev).add(imageId));
  };

  if (visibleImages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleImageClick(index)}
            className="group relative w-full aspect-[4/3] overflow-hidden rounded cursor-pointer bg-cream-dark"
          >
            <Image
              src={getStorageUrl(image.image_url)}
              alt={image.alt_text || image.caption || `Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => handleImageError(image.id)}
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
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
