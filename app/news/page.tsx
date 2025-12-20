import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and updates from KAIST HAND Lab',
}

// Sample news data - in production, this would come from markdown files
const newsItems = [
  {
    id: 'news-2025-12-01',
    title: 'KAIST, 문어다리처럼 감싸 췌장암 치료하는 LED 장치 개발',
    date: '2025-12-15',
    category: 'research',
    excerpt: 'HAND Lab develops deeply implantable, shape-morphing 3D MicroLEDs for pancreatic cancer therapy, published in Advanced Materials.',
  },
  {
    id: 'news-2025-12-02',
    title: '이건재 교수, Extreme Mechanics Letters 저널 Editor 임명',
    date: '2025-12-01',
    category: 'award',
    excerpt: 'Professor Keon Jae Lee has been appointed as Editor for Extreme Mechanics Letters journal.',
  },
  {
    id: 'news-2025-11-01',
    title: '이건재 교수, 한국재료학회 부회장 임명',
    date: '2025-11-15',
    category: 'award',
    excerpt: 'Professor Keon Jae Lee has been appointed as Vice President of the Korean Institute of Materials.',
  },
  {
    id: 'news-2025-06-01',
    title: 'KAIST, 전자소자 분야 권위자 존 로저스 등 3명 초빙교수 임용',
    date: '2025-06-01',
    category: 'event',
    excerpt: 'KAIST appoints three distinguished visiting professors including John Rogers, a leading authority in electronic devices.',
  },
  {
    id: 'news-2025-04-01',
    title: 'Top viewed article in Advanced Materials',
    date: '2025-04-15',
    category: 'research',
    excerpt: 'Our recent publication becomes one of the top viewed articles in Advanced Materials.',
  },
  {
    id: 'news-2025-03-01',
    title: 'KAIST team develops framework for AI-based wearable blood pressure sensors',
    date: '2025-03-20',
    category: 'research',
    excerpt: 'A comprehensive framework for developing AI-powered wearable blood pressure sensors for continuous health monitoring.',
  },
  {
    id: 'news-2025-02-01',
    title: '2월 과기인상에 이건재 교수…피부밀착 마이크로LED 마스크 개발',
    date: '2025-02-15',
    category: 'award',
    excerpt: 'Professor Keon Jae Lee receives the February Science and Technology Award for developing skin-conformable microLED masks.',
  },
  {
    id: 'news-2024-12-01',
    title: '[국내 수상] 이건재 교수, KAIST Impact Research 상 수상',
    date: '2024-12-01',
    category: 'award',
    excerpt: 'Professor Keon Jae Lee receives KAIST Impact Research Award for outstanding research contributions.',
  },
]

const categoryColors: Record<string, string> = {
  research: 'bg-blue-100 text-blue-700',
  award: 'bg-amber-100 text-amber-700',
  media: 'bg-purple-100 text-purple-700',
  event: 'bg-green-100 text-green-700',
  lab: 'bg-gray-100 text-gray-700',
}

export default function NewsPage() {
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
            {newsItems.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <div className="inline-block sm:block">
                      <div className="text-2xl font-bold text-primary-600">
                        {new Date(news.date).getDate()}
                      </div>
                      <div className="text-sm text-gray-500 uppercase">
                        {new Date(news.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[news.category]}`}>
                        {news.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {news.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">{news.excerpt}</p>
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
