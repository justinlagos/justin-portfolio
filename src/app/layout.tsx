import type { Metadata, Viewport } from 'next'
import { Instrument_Sans } from 'next/font/google'

const sans = Instrument_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justin-portfolio-phi.vercel.app'

const description =
  'Design director in Kent, UK. Brand systems, campaigns and interactive products, including Draw in the Air and Voidcanvas.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Justin Ukaegbu, design director',
    template: '%s | Justin Ukaegbu',
  },
  description,
  icons: { icon: '/assets/favicon.png', apple: '/assets/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Justin Ukaegbu',
    title: 'Justin Ukaegbu, design director',
    description,
  },
  twitter: { card: 'summary_large_image', title: 'Justin Ukaegbu, design director', description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#FFFFFF' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={sans.variable}>
      <body>{children}</body>
    </html>
  )
}
