import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Beaker } from 'lucide-react'
import research from '@/content/research.json'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research areas at KAIST HAND Lab - Human Augmented Sensor, Neuromorphic AI, Human Electronics',
}

export default function ResearchPageEn() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Research</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Developing Human Augmentation Technologies based on Soft Electronics
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {research.map((area, index) => (
              <div
                key={area.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                    <Beaker className="w-4 h-4" />
                    Research Area {index + 1}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
                    {area.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {area.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-3 mb-6">
                    {area.topics.map((topic) => (
                      <div key={topic.title} className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">{topic.title}</div>
                        <div className="text-sm text-gray-600">{topic.description}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/en/research/${area.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-xl">
                    <div className="text-center">
                      <Beaker className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-primary-600 font-display">
                        {area.title.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Research Overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meta sapiens are on the verge of changing our lifestyle including bio-augmented human,
              AI-augmented human, and machine human.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                The goal of Human Augmentation Nano Device (HAND) LAB is to develop
                <strong className="text-primary-600"> 'Human Augmentation Technologies based on Soft Electronics'</strong>.
                These technologies could provide interesting opportunities for the harmonic coexistence
                of natural human and new humanity, enhancing human capability and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our research spans from fundamental materials science to practical device applications,
                covering wearable sensors, neuromorphic computing, and bio-integrated electronics.
                We collaborate with leading research groups worldwide and industry partners to
                translate our research into real-world applications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
