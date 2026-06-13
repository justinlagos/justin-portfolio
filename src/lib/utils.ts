export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatServices(services: string[]): string {
  return services.join(', ')
}

export function getStorageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  // Local public assets (e.g. "/assets/projects/foo.jpg") pass through unchanged.
  if (path.startsWith('/')) return path
  // Bare paths (e.g. "assets/projects/foo.jpg") are treated as local public assets.
  return `/${path}`
}
