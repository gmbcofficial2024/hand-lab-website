import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Beaker, CheckCircle } from 'lucide-react'
import { notFound } from 'next/navigation'
import research from '@/content/research.json'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return research.map((area) => ({
    id: area.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const area = research.find((r) => r.id === id)

  if (!area) {
    return { title: 'Research Area Not Found' }
  }

  return {
    title: `${area.title} - Research`,
    description: area.description,
  }
}

export default async function ResearchDetailPage({ params }: Props) {
  const { id } = await params
  const area = research.find((r) => r.id === id)

  if (!area) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/research"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Link>
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
              <Beaker className="w-4 h-4" />
              Research Area
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{area.title}</h1>
            {area.titleKo && (
              <p className="text-xl text-blue-200">{area.titleKo}</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-600 text-lg leading-relaxed">
              {area.description}
            </p>
          </div>

          {/* Topics Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Research Topics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {area.topics.map((topic, index) => (
                <div
                  key={topic.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 text-sm">{topic.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Highlights */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Key Highlights</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Cutting-edge research published in high-impact journals (Nature, Advanced Materials, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Collaboration with leading international research groups</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Industry partnerships for technology transfer and commercialization</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">State-of-the-art facilities for device fabrication and characterization</span>
              </li>
            </ul>
          </div>

          {/* Related Publications Link */}
          <div className="mt-12 text-center">
            <Link
              href="/publications"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              View Related Publications
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
