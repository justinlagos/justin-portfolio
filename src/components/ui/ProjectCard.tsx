'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { getStorageUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  brandSlug?: string;
}

export function ProjectCard({ project, brandSlug }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  // Try featured_image first, then fall back to first media item's cover
  const rawUrl = project.featured_image
    || project.media?.find((m) => m.is_cover)?.image_url
    || project.media?.[0]?.image_url
    || null;
  const imageUrl = rawUrl ? getStorageUrl(rawUrl) : null;

  const href = brandSlug
    ? `/work/${brandSlug}/${project.slug}`
    : project.brand?.slug
    ? `/work/${project.brand.slug}/${project.slug}`
    : `/work/${project.slug}`;

  return (
    <Link href={href}>
      <div className="group">
        <div className="relative w-full aspect-[3/2] bg-cream-dark mb-4 overflow-hidden rounded">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cream-dark">
              <span className="font-serif text-2xl text-ink-muted/40">{project.title.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-serif text-lg text-ink flex-1 line-clamp-2">
            {project.title}
          </h3>
          {project.year && (
            <span className="text-sm text-ink-muted whitespace-nowrap">
              {project.year}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium uppercase tracking-wider bg-rule text-ink rounded">
            {project.type}
          </span>
        </div>

        {project.services && project.services.length > 0 && (
          <p className="text-xs text-ink-muted line-clamp-1">
            {project.services.join(', ')}
          </p>
        )}
      </div>
    </Link>
  );
}
