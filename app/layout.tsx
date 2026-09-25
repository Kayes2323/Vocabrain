import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Noto_Sans_Bengali } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
// Bangla glyphs; Geist has no Bengali coverage, so the stack falls through to this.
const notoBengali = Noto_Sans_Bengali({ subsets: ['bengali'], variable: '--font-bengali', weight: ['400', '500', '600'] })

// Production URL for absolute Open Graph links. Set NEXT_PUBLIC_APP_URL when a
// custom domain is connected; Vercel's own URL is used until then.
const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} · IELTS, Vocabulary & Study Abroad with Mino`,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: `${APP_NAME} · IELTS, Vocabulary & Study Abroad with Mino`,
    description: APP_TAGLINE,
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary',
    title: APP_NAME,
    description: APP_TAGLINE,
  },
  appleWebApp: { capable: true, title: APP_NAME, statusBarStyle: 'default' },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fafafc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${notoBengali.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
