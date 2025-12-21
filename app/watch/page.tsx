'use client'

import { useState } from 'react'
import { Play, Calendar } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import videos from '@/content/videos.json'

type VideoCategory = 'all' | 'research' | 'vlog' | 'lab'

export default function WatchPage() {
  const { t, lang } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const categories: { key: VideoCategory; label: string }[] = [
    { key: 'all', label: lang === 'ko' ? '전체' : 'All' },
    { key: 'research', label: lang === 'ko' ? '연구 영상' : 'Research' },
    { key: 'vlog', label: 'Lab Vlog' },
    { key: 'lab', label: lang === 'ko' ? '연구실 소개' : 'Lab Introduction' },
  ]

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory)

  const featuredVideos = videos.filter(v => v.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            {t.watch.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            {t.watch.description}
          </p>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {lang === 'ko' ? '추천 영상' : 'Featured Videos'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video.youtubeId)}
                className="group relative aspect-video rounded-xl overflow-hidden bg-gray-900"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={lang === 'ko' ? video.titleKo : video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold line-clamp-2">
                    {lang === 'ko' ? video.titleKo : video.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Videos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setSelectedVideo(video.youtubeId)}
                  className="relative w-full aspect-video group"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={lang === 'ko' ? video.titleKo : video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-600 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </button>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {lang === 'ko' ? video.titleKo : video.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {lang === 'ko' ? video.descriptionKo : video.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{video.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <span className="text-lg">
                {lang === 'ko' ? '닫기' : 'Close'} ✕
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
