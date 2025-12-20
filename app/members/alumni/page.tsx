import { Metadata } from 'next'
import Link from 'next/link'
import { User, Briefcase, GraduationCap } from 'lucide-react'
import alumni from '@/content/alumni.json'

export const metadata: Metadata = {
  title: 'Alumni',
  description: 'Alumni of KAIST HAND Lab',
}

// Group alumni by graduation year
function groupByYear(alums: typeof alumni) {
  const grouped: Record<number, typeof alumni> = {}
  alums.forEach((alum) => {
    if (!grouped[alum.graduationYear]) {
      grouped[alum.graduationYear] = []
    }
    grouped[alum.graduationYear].push(alum)
  })
  return grouped
}

export default function AlumniPage() {
  const groupedAlumni = groupByYear(alumni)
  const years = Object.keys(groupedAlumni).map(Number).sort((a, b) => b - a)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Alumni</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our graduates making impact around the world
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-white border-b sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <Link
              href="/members"
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Current Members
            </Link>
            <Link
              href="/members/alumni"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium"
            >
              Alumni
            </Link>
            <Link
              href="/members/photos"
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Alumni List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {years.map((year) => (
              <div key={year}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-display">Class of {year}</h2>
                    <p className="text-gray-500">{groupedAlumni[year].length} graduates</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedAlumni[year].map((alum) => (
                    <div
                      key={alum.id}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                      {/* Photo */}
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">{alum.nameEn}</h3>
                        <p className="text-sm text-gray-600">{alum.name}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {alum.position}
                        </span>

                        {/* Current Position */}
                        {alum.currentPosition && alum.currentOrganization && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-left">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                              <Briefcase className="w-3 h-3" />
                              Current Position
                            </div>
                            <p className="text-sm font-medium text-gray-900">{alum.currentPosition}</p>
                            <p className="text-xs text-gray-600">{alum.currentOrganization}</p>
                          </div>
                        )}

                        {/* Research Areas */}
                        <div className="flex flex-wrap justify-center gap-1 mt-3">
                          {alum.research.slice(0, 2).map((area) => (
                            <span
                              key={area}
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-display">Alumni Network</h2>
            <p className="text-gray-600">Our graduates are working at leading institutions worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">{alumni.length}+</div>
              <div className="text-sm text-gray-500">Total Alumni</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">10+</div>
              <div className="text-sm text-gray-500">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-500">Organizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">5+</div>
              <div className="text-sm text-gray-500">Professors</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
