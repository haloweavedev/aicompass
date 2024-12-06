// app/layout.tsx
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Compass - Expert Discovery & Assessment Platform',
  description: 'AI-powered platform connecting businesses with verified experts through intelligent requirement gathering and matching.',
  keywords: ['AI', 'Expert Discovery', 'Business Consulting', 'Service Matching', 'Professional Network'],
  authors: [{ name: 'AI Compass' }],
  creator: 'AI Compass',
  publisher: 'AI Compass',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aicompass.com',
    title: 'AI Compass - Expert Discovery & Assessment Platform',
    description: 'AI-powered platform connecting businesses with verified experts through intelligent requirement gathering and matching.',
    siteName: 'AI Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Compass - Expert Discovery & Assessment Platform',
    description: 'AI-powered platform connecting businesses with verified experts through intelligent requirement gathering and matching.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="min-h-screen bg-background font-sans antialiased">
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}