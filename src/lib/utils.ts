export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatServices(services: string[]): string {
  return services.join(', ')
}

export function getStorageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${base}/storage/v1/object/public/portfolio/${path}`
}
