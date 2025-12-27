import { Metadata } from 'next'
import { Play, Youtube } from 'lucide-react'
import videos from '@/content/videos.json'
import { getLocalizedField } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Watch',
  description: 'Videos and vlogs from KAIST HAND Lab',
}

export default function WatchPageEn() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Watch</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Featured videos and vlogs from HAND Lab
            </p>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.watch.map((video) => (
              <div key={video.id} className="card group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-600/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-primary-600 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {getLocalizedField(video, 'title', 'en')}
                  </h3>
                  <p className="text-sm text-gray-500">{video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Vlog */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Lab Vlog</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.vlog.map((video) => (
              <div key={video.id} className="card group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-600/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Youtube className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                    {getLocalizedField(video, 'title', 'en')}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
