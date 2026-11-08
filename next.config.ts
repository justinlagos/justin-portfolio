import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
      { source: '/work', destination: '/#work', permanent: false },
      // Old two-level case study URLs (/work/brand/project) now live at /work/brand.
      { source: '/work/:brand/:project', destination: '/work/:brand', permanent: true },
    ]
  },
}

export default nextConfig
