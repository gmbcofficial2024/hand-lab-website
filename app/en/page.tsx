import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Beaker, Award, ExternalLink, Play, Youtube } from 'lucide-react'
import publications from '@/content/publications.json'
import research from '@/content/research.json'
import news from '@/content/news.json'
import videos from '@/content/videos.json'
import { getLocalizedField } from '@/lib/i18n'

const categoryColors: Record<string, string> = {
  research: 'bg-blue-100 text-blue-700',
  award: 'bg-amber-100 text-amber-700',
  media: 'bg-purple-100 text-purple-700',
  event: 'bg-green-100 text-green-700',
  lab: 'bg-gray-100 text-gray-700',
  publication: 'bg-green-100 text-green-700',
}

export default function HomePageEn() {
  const featuredPublications = publications.filter(p => p.featured).slice(0, 4)
  const latestNews = news.slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />

        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                KAIST Department of Materials Science & Engineering
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
                Human<br />
                Augmentation<br />
                <span className="text-blue-300">Nano Device</span>
              </h1>

              <p className="text-xl text-blue-100 max-w-xl leading-relaxed">
                Developing Human Augmentation Technologies based on Soft Electronics
                for the harmonic coexistence of natural human and new humanity.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/en/research" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Explore Research
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/en/recruit" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
                  Join Our Lab
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm text-blue-200">Publications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">$13M</div>
                  <div className="text-sm text-blue-200">ERC Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-blue-200">Lab Members</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
                <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white/80">
                    <div className="text-8xl font-bold font-display mb-4">HAND</div>
                    <div className="text-lg">LAB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Research Areas</h2>
            <p className="section-subtitle mx-auto">
              We focus on three main research areas to develop human augmentation technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {research.map((area, index) => (
              <Link
                key={area.id}
                href={`/en/research/${area.id}`}
                className="group card card-hover p-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-300">
                  <Beaker className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {area.description.slice(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic.title}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {topic.title}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="section-title">NEWS</h2>
              <p className="section-subtitle">
                Latest updates and achievements from HAND Lab
              </p>
            </div>
            <Link
              href="/en/news"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              See all News
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {latestNews.map((item) => (
              <article key={item.id} className="card p-6 group hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {new Date(item.date).getDate()}
                    </div>
                    <div className="text-xs text-gray-500 uppercase">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(item.date).getFullYear()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {getLocalizedField(item, 'title', 'en')}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {getLocalizedField(item, 'content', 'en')}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="section-title">Featured Publications</h2>
              <p className="section-subtitle">
                Recent high-impact papers from our lab
              </p>
            </div>
            <Link
              href="/en/publications"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              View all publications
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredPublications.map((pub) => (
              <article key={pub.id} className="card p-6 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                        IF: {pub.impactFactor}
                      </span>
                      <span className="text-xs text-gray-500">{pub.year}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {pub.authors.slice(0, 3).join(', ')}
                      {pub.authors.length > 3 && ', et al.'}
                    </p>
                    <p className="text-sm font-medium text-primary-600">
                      {pub.journal}
                      {pub.volume && `, ${pub.volume}`}
                      {pub.pages && `, ${pub.pages}`}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Watch Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="section-title">WATCH</h2>
              <p className="section-subtitle">
                Featured videos from HAND Lab
              </p>
            </div>
            <Link
              href="/en/watch"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              See all Videos
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.watch.map((video) => (
              <div key={video.id} className="card group cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-600/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-primary-600 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {getLocalizedField(video, 'title', 'en')}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Vlog Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">LAB Vlog</h2>
            <p className="section-subtitle mx-auto">
              Get to know our lab and team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.vlog.map((video) => (
              <div key={video.id} className="card group cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-600/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Youtube className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {getLocalizedField(video, 'title', 'en')}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Highlights */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title">Global Bio-integrated Materials Center</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                HAND Lab is selected as an Engineering Research Center (ERC) with $13 million funding over 7 years.
                Our center, Global Bio-integrated Materials Center (GBMC), focuses on developing next-generation
                bio-integrated materials and devices for human augmentation.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">ERC Funding</div>
                    <div className="text-sm text-gray-500">$13M over 7 years</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Collaborative Research</div>
                    <div className="text-sm text-gray-500">Multi-institutional partnerships</div>
                  </div>
                </div>
              </div>
              <a
                href="http://bmc.kaist.ac.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit GBMC Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 font-display mb-2">GBMC</div>
                  <div className="text-gray-600">Global Bio-integrated Materials Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Join Our Research Team
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We are always looking for passionate researchers to join our lab.
            Explore opportunities to work on cutting-edge human augmentation technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/en/recruit" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              View Open Positions
            </Link>
            <Link href="/en/members" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
