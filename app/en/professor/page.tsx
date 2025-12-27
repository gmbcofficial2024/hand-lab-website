import { Metadata } from 'next'
import { Mail, Phone, MapPin, GraduationCap, Briefcase, Award } from 'lucide-react'
import professor from '@/content/professor.json'

export const metadata: Metadata = {
  title: 'Professor',
  description: `Professor ${professor.nameEn} - Distinguished Professor at KAIST HAND Lab`,
}

export default function ProfessorPageEn() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo & Contact Card */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary-300 font-display">
                    {professor.nameEn.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{professor.nameEn}</h1>
                <p className="text-lg text-gray-600 mb-1">{professor.name}</p>
                <p className="text-primary-600 font-medium mb-6">{professor.title}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4 text-primary-500" />
                    <a href={`mailto:${professor.email}`} className="hover:text-primary-600">
                      {professor.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 text-primary-500" />
                    <span>{professor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span>{professor.office}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Bio */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-500 rounded-full" />
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed">{professor.bio}</p>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary-500" />
                  Education
                </h2>
                <div className="space-y-4">
                  {professor.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-600">{edu.year}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{edu.degree}</div>
                        <div className="text-gray-600">{edu.institution}</div>
                        <div className="text-sm text-gray-500">{edu.field}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Positions */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary-500" />
                  Positions
                </h2>
                <div className="space-y-3">
                  {professor.positions.map((pos, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-l-4 ${
                        pos.current
                          ? 'bg-primary-50 border-primary-500'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{pos.title}</div>
                          <div className="text-gray-600">{pos.organization}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{pos.period}</span>
                          {pos.current && (
                            <span className="text-xs px-2 py-1 bg-primary-500 text-white rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Awards */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary-500" />
                  Selected Awards
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {professor.awards.map((award, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{award.title}</div>
                          <div className="text-sm text-gray-600">{award.organization}</div>
                          <div className="text-xs text-gray-500">{award.year}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
