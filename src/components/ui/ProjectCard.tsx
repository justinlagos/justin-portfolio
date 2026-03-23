import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { getStorageUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  brandSlug?: string;
}

export function ProjectCard({ project, brandSlug }: ProjectCardProps) {
  const imageUrl = project.featured_image
    ? getStorageUrl(project.featured_image)
    : null;

  const href = brandSlug
    ? `/work/${brandSlug}/${project.slug}`
    : `/work/${project.slug}`;

  const type = project.type;

  return (
    <Link href={href}>
      <div className="group">
        <div className="relative w-full aspect-[3/2] bg-ink-muted mb-4 overflow-hidden rounded">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>

        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-serif text-lg text-ink flex-1">
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
            {type}
          </span>
        </div>

        {project.services && project.services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.services.map((service, idx) => (
              <span
                key={idx}
                className="text-xs text-ink-muted"
              >
                {service}
                {idx < project.services.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
