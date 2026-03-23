'use client';

import { useEffect, useState } from "react";
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
  }, [currentIndex, onClose]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity z-10"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      <div
        className="relative w-full h-full max-h-[80vh] max-w-5xl flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.caption || "Gallery image"}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p className="text-white text-sm mb-2">
          {currentIndex + 1} / {images.length}
        </p>
        {currentImage.caption && (
          <p className="text-white text-sm text-center max-w-2xl mx-auto">
            {currentImage.caption}
          </p>
        )}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
}
