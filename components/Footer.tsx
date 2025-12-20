import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  research: [
    { name: 'Human Augmented Sensor', href: '/research/human-augmented-sensor' },
    { name: 'Neuromorphic AI', href: '/research/neuromorphic-ai' },
    { name: 'Human Electronics', href: '/research/human-electronics' },
  ],
  lab: [
    { name: 'Professor', href: '/professor' },
    { name: 'Members', href: '/members' },
    { name: 'Publications', href: '/publications' },
    { name: 'News', href: '/news' },
  ],
  quick: [
    { name: 'KAIST', href: 'https://www.kaist.ac.kr' },
    { name: 'MSE Department', href: 'https://mse.kaist.ac.kr' },
    { name: 'GBMC', href: 'http://bmc.kaist.ac.kr' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Lab Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold font-display">H</span>
              </div>
              <div>
                <div className="text-white font-bold font-display">HAND Lab</div>
                <div className="text-xs text-gray-400">KAIST</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Human Augmentation Nano Device Laboratory<br />
              Department of Materials Science and Engineering
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>291 Daehak-ro, Yuseong-gu, Daejeon</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+82-42-350-3343</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:keonlee@kaist.ac.kr" className="hover:text-white transition-colors">
                  keonlee@kaist.ac.kr
                </a>
              </div>
            </div>
          </div>

          {/* Research Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4">Research</h3>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Lab</h3>
            <ul className="space-y-2">
              {footerLinks.lab.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/images/logos/kaist-white.png"
                alt="KAIST"
                className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} KAIST HAND Lab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
