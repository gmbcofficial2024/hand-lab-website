import type { Metadata } from 'next'

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
    locale: 'en_US',
    url: 'https://hand.kaist.ac.kr/en',
    siteName: 'KAIST HAND Lab',
    title: 'KAIST HAND Lab - Human Augmentation Nano Device Laboratory',
    description: 'Developing Human Augmentation Technologies based on Soft Electronics',
  },
}

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
