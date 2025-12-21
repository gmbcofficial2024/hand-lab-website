'use client'

import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface NewsCardProps {
  id: string
  title: string
  date: string
  category: string
  thumbnail?: string
  excerpt?: string
  href?: string
  lang?: 'ko' | 'en'
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  research: { bg: 'bg-blue-100', text: 'text-blue-700' },
  award: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  media: { bg: 'bg-purple-100', text: 'text-purple-700' },
  event: { bg: 'bg-green-100', text: 'text-green-700' },
  lab: { bg: 'bg-orange-100', text: 'text-orange-700' },
}

const categoryLabels: Record<string, { ko: string; en: string }> = {
  research: { ko: '연구', en: 'Research' },
  award: { ko: '수상', en: 'Award' },
  media: { ko: '미디어', en: 'Media' },
  event: { ko: '행사', en: 'Event' },
  lab: { ko: '연구실', en: 'Lab' },
}

export default function NewsCard({
  id,
  title,
  date,
  category,
  thumbnail,
  excerpt,
  href,
  lang = 'en',
}: NewsCardProps) {
  const colors = categoryColors[category] || { bg: 'bg-gray-100', text: 'text-gray-700' }
  const label = categoryLabels[category]?.[lang] || category
  const linkHref = href || `/news/${id}`

  return (
    <Link href={linkHref}>
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="aspect-video bg-gray-100 overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
              {label}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
              {excerpt}
            </p>
          )}

          <div className="flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors mt-auto">
            {lang === 'ko' ? '자세히 보기' : 'Read More'}
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}
