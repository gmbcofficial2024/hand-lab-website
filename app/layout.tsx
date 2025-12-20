import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'KAIST HAND Lab - Human Augmentation Nano Device Laboratory',
    template: '%s | KAIST HAND Lab'
  },
  description: 'Human Augmentation Nano Device Laboratory at KAIST. Developing Human Augmentation Technologies based on Soft Electronics.',
  keywords: ['KAIST', 'HAND Lab', 'Human Augmentation', 'Nano Device', 'Soft Electronics', 'Wearable', 'MicroLED', 'Neuromorphic'],
  authors: [{ name: 'KAIST HAND Lab' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://hand.kaist.ac.kr',
    siteName: 'KAIST HAND Lab',
    title: 'KAIST HAND Lab - Human Augmentation Nano Device Laboratory',
    description: 'Developing Human Augmentation Technologies based on Soft Electronics',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
