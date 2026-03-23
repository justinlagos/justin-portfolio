import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types";
import { getStorageUrl } from "@/lib/utils";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const imageUrl = brand.featured_image
    ? getStorageUrl(brand.featured_image)
    : null;

  return (
    <Link href={`/work/${brand.slug}`}>
      <div className="group overflow-hidden">
        <div className="relative w-full aspect-[4/3] bg-ink-muted mb-4 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>
        <h3 className="font-serif text-xl text-ink mb-1">
          {brand.name}
        </h3>
        {brand.description && (
          <p className="text-sm text-ink-muted">
            {brand.description}
          </p>
        )}
      </div>
    </Link>
  );
}
