import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../i18n/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'
  const navBg = isDark ? 'rgba(14, 12, 10, 0.88)' : 'rgba(245, 240, 232, 0.88)'
  const dropdownBg = isDark ? 'rgba(14, 12, 10, 0.97)' : 'rgba(245, 240, 232, 0.97)'
  const borderColor = isDark ? 'rgba(107, 101, 96, 0.3)' : 'rgba(107, 101, 96, 0.25)'

  const navLinks = [
    { href: '#home', key: 'nav.home' },
    { href: '#about', key: 'nav.about' },
    { href: '#skills', key: 'nav.skills' },
    { href: '#projects', key: 'nav.projects' },
    { href: '#contact', key: 'nav.contact' },
  ]

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Desktop pill navbar */}
      <div
        className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full backdrop-blur-sm border"
        style={{ backgroundColor: navBg, borderColor }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors duration-200 text-sm"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            {t(link.key)}
          </a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 text-sm"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          {t('nav.resume')}
        </a>

        <div style={{ width: '1px', height: '16px', backgroundColor: borderColor }} />

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1 rounded-full border transition-colors duration-200"
          style={{ borderColor: 'var(--text-muted)' }}
        >
          <span className="text-sm" style={{ color: language === 'en' ? 'var(--accent)' : 'var(--text-muted)' }}>EN</span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span className="text-sm" style={{ color: language === 'ch' ? 'var(--accent)' : 'var(--text-muted)' }}>CH</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200"
          style={{ borderColor: 'var(--text-muted)', color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--text-muted)'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      {/* Mobile pill navbar */}
      <div
        className="md:hidden flex items-center justify-between w-full max-w-sm px-5 py-2 rounded-full backdrop-blur-sm border"
        style={{ backgroundColor: navBg, borderColor }}
      >
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>YB</span>

        <div className="flex items-center gap-3">
          {/* Theme toggle (mobile) */}
          <button
            onClick={toggleTheme}
            className="transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="transition-colors duration-200"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="md:hidden absolute top-14 left-4 right-4 py-4 rounded-2xl border backdrop-blur-sm text-center"
          style={{ backgroundColor: dropdownBg, borderColor }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 transition-colors duration-200 text-sm"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setIsOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 transition-colors duration-200 text-sm"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setIsOpen(false)}
          >
            {t('nav.resume')}
          </a>

          <button
            onClick={toggleLanguage}
            className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-colors duration-200"
            style={{ borderColor: 'var(--text-muted)' }}
          >
            <span className="text-sm" style={{ color: language === 'en' ? 'var(--accent)' : 'var(--text-muted)' }}>EN</span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span className="text-sm" style={{ color: language === 'ch' ? 'var(--accent)' : 'var(--text-muted)' }}>CH</span>
          </button>
        </div>
      )}
    </nav>
  )
}
