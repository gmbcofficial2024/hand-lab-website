'use client'

import { Mail, Linkedin, Globe } from 'lucide-react'

interface MemberCardProps {
  name: string
  nameEn: string
  position: string
  photo: string
  email?: string
  research?: string[]
  education?: string
  linkedin?: string
  website?: string
  lang?: 'ko' | 'en'
}

export default function MemberCard({
  name,
  nameEn,
  position,
  photo,
  email,
  research,
  education,
  linkedin,
  website,
  lang = 'en',
}: MemberCardProps) {
  const displayName = lang === 'ko' ? name : nameEn

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Photo */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={photo}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/members/placeholder.jpg'
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900">{displayName}</h3>
          {lang === 'ko' && nameEn && (
            <p className="text-sm text-gray-500">{nameEn}</p>
          )}
        </div>

        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full mb-3">
          {position}
        </span>

        {research && research.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {research.slice(0, 3).map((field) => (
              <span
                key={field}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                {field}
              </span>
            ))}
          </div>
        )}

        {education && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{education}</p>
        )}

        {/* Links */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          {email && (
            <a
              href={`mailto:${email}`}
              className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors"
              title="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
