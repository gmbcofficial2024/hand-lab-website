import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Camera, Calendar, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Photos - Members',
  description: 'Photo gallery of KAIST HAND Lab activities and events',
}

const photoGallery = [
  {
    id: 'group-2024',
    title: 'Lab Group Photo 2024',
    date: '2024-03',
    category: 'Group',
    thumbnail: '/images/photos/placeholder.jpg',
    description: 'Annual lab group photo'
  },
  {
    id: 'conference-2024',
    title: 'International Conference',
    date: '2024-06',
    category: 'Conference',
    thumbnail: '/images/photos/placeholder.jpg',
    description: 'Presentation at MRS Spring Meeting'
  },
  {
    id: 'workshop-2024',
    title: 'Lab Workshop',
    date: '2024-09',
    category: 'Event',
    thumbnail: '/images/photos/placeholder.jpg',
    description: 'Annual lab workshop and team building'
  },
  {
    id: 'graduation-2024',
    title: 'Graduation Ceremony',
    date: '2024-02',
    category: 'Graduation',
    thumbnail: '/images/photos/placeholder.jpg',
    description: 'Celebrating our graduates'
  },
  {
    id: 'seminar-2024',
    title: 'Guest Seminar',
    date: '2024-05',
    category: 'Seminar',
    thumbnail: '/images/photos/placeholder.jpg',
    description: 'Distinguished lecture series'
  },
  {
    id: 'lab-2024',
    title: 'Lab Activities',
    date: '2024-07',
    category: 'Lab',
    thumbnail: '/images/photos/placeholder.jpg',
    description: 'Daily research activities'
  }
]

const categories = ['All', 'Group', 'Conference', 'Event', 'Graduation', 'Seminar', 'Lab']

export default function PhotosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/members"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Members
          </Link>
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4" />
              Gallery
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Photo Gallery</h1>
            <p className="text-xl text-blue-100">
              Memories and moments from HAND Lab
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoGallery.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-primary-300" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium text-gray-700">
                      {photo.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{photo.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {photo.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12 text-center p-8 bg-gray-50 rounded-2xl">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">More Photos Coming Soon</h3>
            <p className="text-gray-500">
              We&apos;re updating our photo gallery. Check back later for more memories!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
