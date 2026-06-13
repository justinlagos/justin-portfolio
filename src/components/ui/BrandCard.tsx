'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Brand } from '@/types'
import { getStorageUrl } from '@/lib/utils'

interface BrandCardProps {
  brand: Brand
  index?: number
}

export function BrandCard({ brand, index = 0 }: BrandCardProps) {
  const [imageError, setImageError] = useState(false)
  const imageUrl = brand.featured_image ? getStorageUrl(brand.featured_image) : null

  return (
    <Link href={`/work/${brand.slug}`} className="group block">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated img-hover">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={brand.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-5xl font-bold text-text-muted/30">
              {brand.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
            {brand.name}
          </h3>
          <p className="text-xs md:text-sm text-white/60 line-clamp-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {brand.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
