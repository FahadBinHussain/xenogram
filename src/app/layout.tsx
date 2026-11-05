import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { TrpcProvider } from '@/providers/TrpcProvider'
import { AnimationProvider } from '@/providers/AnimationProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const SITE_URL = 'https://xenotree.vercel.app'
const TITLE = 'Xenotree | Build and share your family tree'
const DESCRIPTION =
  'A modern family tree app to document, visualize, and share your family history — people, relationships, partnerships and life events.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Xenotree',
  },
  description: DESCRIPTION,
  applicationName: 'Xenotree',
  keywords: ['family tree', 'genealogy', 'ancestry', 'family history', 'xenotree'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Xenotree',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Xenotree — build and share your family tree',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans h-full`}>
        <AuthProvider>
          <TrpcProvider>
            <AnimationProvider>
              {children}
            </AnimationProvider>
          </TrpcProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 