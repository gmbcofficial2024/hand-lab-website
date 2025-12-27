import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, User } from 'lucide-react'
import members from '@/content/members.json'
import professor from '@/content/professor.json'

export const metadata: Metadata = {
  title: 'Members',
  description: 'Current members of KAIST HAND Lab',
}

// Group members by position
function groupByPosition(mems: typeof members) {
  const order = ['Postdoc', 'Research Professor', 'Ph.D. Student', 'M.S./Ph.D. Student', 'M.S. Student', 'Undergraduate', 'Visiting Scholar']
  const grouped: Record<string, typeof members> = {}

  order.forEach((pos) => {
    const filtered = mems.filter((m) => m.position === pos)
    if (filtered.length > 0) {
      grouped[pos] = filtered
    }
  })

  return grouped
}

export default function MembersPageEn() {
  const groupedMembers = groupByPosition(members)
  const positions = Object.keys(groupedMembers)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Our Team</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Meet the researchers of HAND Lab
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-white border-b sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <Link
              href="/en/members"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium"
            >
              Current Members
            </Link>
            <Link
              href="/en/members/alumni"
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Alumni
            </Link>
            <Link
              href="/en/members/photos"
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Professor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Principal Investigator</h2>

          <Link href="/en/professor" className="block">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow max-w-2xl">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary-400 font-display">
                    {professor.nameEn.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{professor.nameEn}</h3>
                  <p className="text-lg text-gray-600">{professor.name}</p>
                  <p className="text-primary-600 font-medium mb-3">{professor.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    {professor.email}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Members by Position */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {positions.map((position) => (
              <div key={position}>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 font-display">{position}s</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {groupedMembers[position].length}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedMembers[position].map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      {/* Photo */}
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">{member.nameEn}</h3>
                        <p className="text-sm text-gray-600 mb-1">{member.name}</p>
                        <p className="text-xs text-primary-600 mb-3">Since {member.year}</p>

                        {/* Research Areas */}
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {member.research.slice(0, 2).map((area) => (
                            <span
                              key={area}
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                        </div>

                        {/* Email */}
                        <a
                          href={`mailto:${member.email}`}
                          className="text-xs text-gray-500 hover:text-primary-600 flex items-center justify-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            Join Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            We are always looking for motivated researchers to join our lab.
          </p>
          <Link href="/en/recruit" className="btn-primary">
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  )
}
