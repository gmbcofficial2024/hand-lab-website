'use client'

import { BookOpen, ExternalLink } from 'lucide-react'

interface PublicationCardProps {
  title: string
  authors: string[]
  journal: string
  volume?: string
  pages?: string
  year: number
  impactFactor?: number
  doi?: string
  compact?: boolean
}

export default function PublicationCard({
  title,
  authors,
  journal,
  volume,
  pages,
  year,
  impactFactor,
  doi,
  compact = false,
}: PublicationCardProps) {
  const doiUrl = doi ? `https://doi.org/${doi}` : null

  if (compact) {
    return (
      <article className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-2">
          {impactFactor && (
            <span className="text-xs font-medium px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full">
              IF: {impactFactor}
            </span>
          )}
          <span className="text-xs text-gray-500">{year}</span>
        </div>
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          {authors.slice(0, 3).join(', ')}
          {authors.length > 3 && ', et al.'}
        </p>
        <p className="text-xs text-primary-600 font-medium">
          {journal}
        </p>
      </article>
    )
  }

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {impactFactor && (
              <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                IF: {impactFactor}
              </span>
            )}
            <span className="text-xs text-gray-500">{year}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {authors.slice(0, 5).join(', ')}
            {authors.length > 5 && ', et al.'}
          </p>
          <p className="text-sm font-medium text-primary-600">
            {journal}
            {volume && `, ${volume}`}
            {pages && `, ${pages}`}
          </p>
          {doiUrl && (
            <a
              href={doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 mt-2 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              DOI
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
