import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Database, Download, FileText, ExternalLink, FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Data & Resources - Publications',
  description: 'Research data and resources from KAIST HAND Lab',
}

const resources = [
  {
    id: 'dataset-1',
    title: 'Piezoelectric Acoustic Sensor Dataset',
    description: 'Audio signal data collected from biomimetic piezoelectric acoustic sensors for speech recognition research.',
    type: 'Dataset',
    format: 'CSV, WAV',
    size: '2.3 GB',
    year: 2024,
    relatedPaper: 'Theoretical Basis of Biomimetic Self-powered Acoustic Sensors',
    doi: '10.1002/adfm.202309316'
  },
  {
    id: 'dataset-2',
    title: 'Wearable Blood Pressure Monitoring Data',
    description: 'Clinical validation data from piezoelectric blood pressure sensors including continuous BP measurements.',
    type: 'Dataset',
    format: 'CSV, JSON',
    size: '850 MB',
    year: 2023,
    relatedPaper: 'Clinical Validation of Wearable Piezoelectric Blood Pressure Sensor',
    doi: '10.1002/adma.202301627'
  },
  {
    id: 'code-1',
    title: 'Deep Learning Speech Processing',
    description: 'Neural network models and training code for noise-robust speech processing with flexible acoustic sensors.',
    type: 'Code',
    format: 'Python',
    size: '125 MB',
    year: 2022,
    relatedPaper: 'Deep Learning-based Noise Robust Flexible Piezoelectric Acoustic Sensors',
    doi: '10.1016/j.nanoen.2022.107610'
  },
  {
    id: 'dataset-3',
    title: 'Memristive Synapse Characterization Data',
    description: 'Electrical characterization data of memristive devices for neuromorphic computing applications.',
    type: 'Dataset',
    format: 'CSV, MATLAB',
    size: '340 MB',
    year: 2022,
    relatedPaper: 'Simultaneous Emulation of Synaptic and Intrinsic Plasticity',
    doi: '10.1038/s41467-022-30432-2'
  }
]

const typeColors: Record<string, string> = {
  'Dataset': 'bg-blue-100 text-blue-700',
  'Code': 'bg-green-100 text-green-700',
  'Model': 'bg-purple-100 text-purple-700',
  'Tool': 'bg-orange-100 text-orange-700'
}

export default function DataResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/publications"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Publications
          </Link>
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
              <Database className="w-4 h-4" />
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Data & Resources</h1>
            <p className="text-xl text-blue-100">
              Open datasets, code, and research materials
            </p>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8 bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">Data Availability</p>
              <p className="text-amber-700 text-sm mt-1">
                Some datasets may require registration or approval for access.
                Please contact us at <a href="mailto:keonlee@kaist.ac.kr" className="underline">keonlee@kaist.ac.kr</a> for inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[resource.type]}`}>
                        {resource.type}
                      </span>
                      <span className="text-sm text-gray-500">{resource.year}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {resource.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-4 h-4" />
                        {resource.format}
                      </span>
                      <span>{resource.size}</span>
                    </div>

                    <div className="text-sm">
                      <span className="text-gray-500">Related paper: </span>
                      <a
                        href={`https://doi.org/${resource.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        {resource.relatedPaper}
                      </a>
                    </div>
                  </div>

                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium flex-shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    Request Access
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-12 text-center p-8 bg-gray-50 rounded-2xl">
            <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">More Resources Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We are working on making more datasets and code available.
              Check back later or subscribe to our updates.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Need Custom Data?</h2>
          <p className="text-gray-600 mb-6">
            For collaboration opportunities or access to unpublished datasets, please contact us.
          </p>
          <a
            href="mailto:keonlee@kaist.ac.kr"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}
