import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import news from '@/content/news.json'
import { getLocalizedField } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and updates from KAIST HAND Lab',
}

const categoryColors: Record<string, string> = {
  research: 'bg-blue-100 text-blue-700',
  award: 'bg-amber-100 text-amber-700',
  media: 'bg-purple-100 text-purple-700',
  event: 'bg-green-100 text-green-700',
  lab: 'bg-gray-100 text-gray-700',
  publication: 'bg-green-100 text-green-700',
}

export default function NewsPageEn() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">News</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Latest updates and achievements from HAND Lab
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <div className="inline-block sm:block">
                      <div className="text-2xl font-bold text-primary-600">
                        {new Date(item.date).getDate()}
                      </div>
                      <div className="text-sm text-gray-500 uppercase">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {getLocalizedField(item, 'title', 'en')}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {getLocalizedField(item, 'content', 'en')}
                    </p>
                    <button className="text-sm text-primary-600 font-medium inline-flex items-center hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More News
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
