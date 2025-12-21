'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { lang, setLang, t } = useI18n()

  const navigation = [
    { name: t.nav.professor, href: '/professor' },
    {
      name: t.nav.research,
      href: '/research',
      children: [
        { name: t.nav.allResearch, href: '/research' },
        { name: 'Human Augmented Sensor', href: '/research/human-augmented-sensor' },
        { name: 'Neuromorphic AI', href: '/research/neuromorphic-ai' },
        { name: 'Human Electronics', href: '/research/human-electronics' },
      ],
    },
    {
      name: t.nav.publications,
      href: '/publications',
      children: [
        { name: t.nav.journalPapers, href: '/publications' },
        { name: t.nav.dataResources, href: '/publications/data' },
      ],
    },
    {
      name: t.nav.members,
      href: '/members',
      children: [
        { name: t.nav.currentMembers, href: '/members' },
        { name: t.nav.alumni, href: '/members/alumni' },
        { name: t.nav.photos, href: '/members/photos' },
      ],
    },
    { name: t.nav.news, href: '/news' },
    { name: t.nav.recruit, href: '/recruit' },
    { name: t.nav.watch, href: '/watch' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg font-display">H</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900 font-display">HAND Lab</div>
              <div className="text-xs text-gray-500">KAIST</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="nav-link px-4 py-2 text-sm font-medium inline-flex items-center gap-1"
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Language Toggle */}
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center gap-1">
              <Globe className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => setLang('ko')}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  lang === 'ko'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                KR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  lang === 'en'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-slide-up">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Language Toggle */}
              <div className="px-4 py-3 border-t border-gray-100 mt-2 pt-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Language:</span>
                  <button
                    onClick={() => { setLang('ko'); setMobileMenuOpen(false); }}
                    className={`px-3 py-1.5 text-sm font-medium rounded ${
                      lang === 'ko'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => { setLang('en'); setMobileMenuOpen(false); }}
                    className={`px-3 py-1.5 text-sm font-medium rounded ${
                      lang === 'en'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
