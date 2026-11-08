import sizes from '@/content/image-sizes.json'

const table = sizes as unknown as Record<string, [number, number]>

/** Pixel size of an image in /public, from the generated manifest. */
export function imgSize(src: string): { width: number; height: number } {
  const s = table[src]
  if (!s) {
    if (process.env.NODE_ENV !== 'production') console.warn(`[img] no size for ${src}; run scripts/image_manifest.py`)
    return { width: 1600, height: 1000 }
  }
  return { width: s[0], height: s[1] }
}
