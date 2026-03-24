'use client';

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { LightboxImage } from "@/types";

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageError, setImageError] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goToPrevious = useCallback(() => {
    setImageError(false);
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setImageError(false);
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, goToPrevious, goToNext]);

  // Touch/swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setTouchStart(null);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Image container */}
      <div
        className="relative w-full h-full max-h-[80vh] max-w-5xl flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-white/60">
            <p className="text-lg">Image could not be loaded</p>
          </div>
        ) : (
          <Image
            src={currentImage.src}
            alt={currentImage.alt || "Gallery image"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Caption and counter */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center pointer-events-none">
        <p className="text-white/70 text-sm mb-2">
          {currentIndex + 1} / {images.length}
        </p>
        {currentImage.caption && (
          <p className="text-white text-sm max-w-2xl mx-auto">
            {currentImage.caption}
          </p>
        )}
      </div>

      {/* Navigation buttons - only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}
    </div>
  );
}
