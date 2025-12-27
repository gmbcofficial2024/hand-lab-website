import { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import publications from '@/content/publications.json'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Scientific publications from KAIST HAND Lab',
}

// Group publications by year
function groupByYear(pubs: typeof publications) {
  const grouped: Record<number, typeof publications> = {}
  pubs.forEach((pub) => {
    if (!grouped[pub.year]) {
      grouped[pub.year] = []
    }
    grouped[pub.year].push(pub)
  })
  return grouped
}

export default function PublicationsPageEn() {
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year)
  const groupedPublications = groupByYear(sortedPublications)
  const years = Object.keys(groupedPublications).map(Number).sort((a, b) => b - a)

  // Statistics
  const totalPubs = publications.length
  const avgIF = (
    publications.reduce((sum, p) => sum + (p.impactFactor || 0), 0) /
    publications.filter((p) => p.impactFactor).length
  ).toFixed(1)
  const highIFPubs = publications.filter((p) => (p.impactFactor || 0) >= 20).length

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Publications</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our research publications in peer-reviewed journals
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{totalPubs}+</div>
              <div className="text-sm text-gray-500">Total Publications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{avgIF}</div>
              <div className="text-sm text-gray-500">Average Impact Factor</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{highIFPubs}</div>
              <div className="text-sm text-gray-500">High Impact (IF≥20)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {years.map((year) => (
              <div key={year}>
                <div className="sticky top-20 bg-gray-50 py-3 z-10 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-3">
                    <span className="w-12 h-12 bg-primary-500 text-white rounded-xl flex items-center justify-center text-lg">
                      {year.toString().slice(-2)}
                    </span>
                    {year}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({groupedPublications[year].length} papers)
                    </span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {groupedPublications[year].map((pub, index) => (
                    <article
                      key={pub.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 text-center">
                          <span className="text-sm font-medium text-gray-400">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                            {pub.title}
                          </h3>

                          {/* Authors */}
                          <p className="text-sm text-gray-600 mb-2">
                            {pub.authors.join(', ')}
                          </p>

                          {/* Journal Info */}
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="font-medium text-primary-600">
                              {pub.journal}
                            </span>
                            {pub.volume && (
                              <span className="text-gray-500">
                                {pub.volume}
                                {pub.issue && `(${pub.issue})`}
                                {pub.pages && `, ${pub.pages}`}
                              </span>
                            )}
                            {pub.impactFactor && (
                              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                IF: {pub.impactFactor}
                              </span>
                            )}
                            {pub.featured && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>

                          {/* Links */}
                          <div className="flex gap-3 mt-3">
                            {pub.doi && (
                              <a
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs text-gray-500 hover:text-primary-600"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                DOI
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            * This list shows selected publications. For a complete list, please visit{' '}
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Google Scholar
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
