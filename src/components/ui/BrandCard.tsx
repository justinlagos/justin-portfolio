'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types";
import { getStorageUrl } from "@/lib/utils";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = brand.featured_image
    ? getStorageUrl(brand.featured_image)
    : null;

  return (
    <Link href={`/work/${brand.slug}`}>
      <div className="group overflow-hidden">
        <div className="relative w-full aspect-[4/3] bg-cream-dark mb-4 overflow-hidden rounded">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cream-dark">
              <span className="font-serif text-2xl text-ink-muted/40">{brand.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <h3 className="font-serif text-xl text-ink mb-1">
          {brand.name}
        </h3>
        {brand.description && (
          <p className="text-sm text-ink-muted line-clamp-2">
            {brand.description}
          </p>
        )}
      </div>
    </Link>
  );
}
