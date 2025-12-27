import { Metadata } from 'next'
import { Mail, CheckCircle, Users, Beaker, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Recruit',
  description: 'Join KAIST HAND Lab - Open positions for researchers',
}

const positions = [
  {
    title: 'Ph.D. Students',
    description: 'We are looking for motivated Ph.D. students interested in human augmentation technologies, soft electronics, and neuromorphic computing.',
    requirements: [
      'Strong background in Materials Science, Electrical Engineering, or related fields',
      'Experience in device fabrication or characterization is a plus',
      'Good communication skills in English',
      'Self-motivated and collaborative attitude',
    ],
  },
  {
    title: 'M.S. Students',
    description: "Master's students interested in wearable sensors, flexible electronics, or AI-integrated devices are welcome to apply.",
    requirements: [
      'Background in Materials Science, Physics, or Engineering',
      'Interest in experimental research',
      'Willingness to learn new techniques',
    ],
  },
  {
    title: 'Postdoctoral Researchers',
    description: 'Postdoc positions are available for researchers with expertise in micro/nanofabrication, bioelectronics, or machine learning.',
    requirements: [
      'Ph.D. in relevant field',
      'Strong publication record',
      'Experience in leading research projects',
      'Excellent written and oral communication skills',
    ],
  },
  {
    title: 'Visiting Scholars',
    description: 'We welcome visiting scholars and researchers for collaborative projects.',
    requirements: [
      'Research experience in related fields',
      'Clear research objectives',
      'Funding or fellowship support',
    ],
  },
]

const benefits = [
  {
    icon: Beaker,
    title: 'World-class Research',
    description: 'Work on cutting-edge human augmentation technologies with state-of-the-art facilities',
  },
  {
    icon: Users,
    title: 'Collaborative Environment',
    description: 'Join a diverse team of researchers and collaborate with leading groups worldwide',
  },
  {
    icon: GraduationCap,
    title: 'Career Development',
    description: 'Opportunities for professional growth, conferences, and industry connections',
  },
]

export default function RecruitPageEn() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Join Our Team</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We are always looking for passionate researchers to push the boundaries of human augmentation technology
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Why Join HAND Lab?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              HAND Lab offers a unique opportunity to work on groundbreaking research in human augmentation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Open Positions</h2>
          </div>

          <div className="space-y-6">
            {positions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{position.title}</h3>
                <p className="text-gray-600 mb-4">{position.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">How to Apply</h2>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                If you are interested in joining our lab, please send the following documents to:
              </p>

              <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-lg">
                <Mail className="w-6 h-6 text-primary-600" />
                <a href="mailto:keonlee@kaist.ac.kr" className="text-lg font-medium text-primary-600 hover:underline">
                  keonlee@kaist.ac.kr
                </a>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Required Documents:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>CV/Resume with a list of publications (if any)</li>
                  <li>Academic transcripts</li>
                  <li>Statement of research interests (1-2 pages)</li>
                  <li>Contact information for 2-3 references</li>
                </ol>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> For Ph.D. and M.S. applicants, please also apply through the official KAIST admission process.
                  Contact us before the application deadline for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 font-display">Have Questions?</h2>
          <p className="text-blue-100 mb-6">
            Feel free to reach out if you have any questions about research opportunities at HAND Lab
          </p>
          <a
            href="mailto:keonlee@kaist.ac.kr"
            className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}
