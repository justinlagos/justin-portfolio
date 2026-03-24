import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getNavItems, getSocialLinks } from '@/lib/data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justinukaegbu.com'

export const revalidate = 120

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Justin Ukaegbu - Design Leader',
    template: '%s - Justin Ukaegbu',
  },
  description:
    'Brand, product, and interaction design across 12+ years and 50+ countries. Building design systems and digital products that work at scale.',
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Justin Ukaegbu',
    title: 'Justin Ukaegbu - Design Leader',
    description:
      'Brand, product, and interaction design across 12+ years and 50+ countries.',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Justin Ukaegbu - Design Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Ukaegbu - Design Leader',
    description:
      'Brand, product, and interaction design across 12+ years and 50+ countries.',
    images: ['/assets/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [navItems, socialLinks] = await Promise.all([
    getNavItems(),
    getSocialLinks(),
  ])

  const navLinks = navItems.map((item) => ({
    label: item.label,
    href: item.href,
  }))

  const socialData = socialLinks.map((link) => ({
    platform: link.platform,
    url: link.url,
  }))

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans">
        <Header navLinks={navLinks} />
        <main className="flex-1">{children}</main>
        <Footer navLinks={navLinks} socialLinks={socialData} />
      </body>
    </html>
  )
}
