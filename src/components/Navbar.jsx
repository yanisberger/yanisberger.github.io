import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../i18n/ThemeContext'

// `home` is true on the start page; on blog pages the section links point back to it.
export default function Navbar({ home = true }) {
  const [open, setOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const base = home ? '' : '/'

  const links = [
    { href: `${base}#work`, label: t('nav.work') },
    home ? { href: '#writing', label: t('nav.writing') } : { href: '/blog', label: t('nav.writing'), route: true },
    { href: `${base}#about`, label: t('nav.about') },
    { href: `${base}#contact`, label: t('nav.contact') },
    { href: '/resume.pdf', label: t('nav.resume'), external: true },
  ]

  const renderLink = (l, onClick) =>
    l.route ? (
      <Link key={l.href} to={l.href} onClick={onClick}>{l.label}</Link>
    ) : (
      <a key={l.href} href={l.href} onClick={onClick} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {l.label}
      </a>
    )

  const toggles = (
    <>
      <button type="button" className="chip" onClick={toggleLanguage} aria-label={t('nav.language')}>
        {language === 'en' ? <><b>EN</b>CH</> : <>EN<b>CH</b></>}
      </button>
      <button type="button" className="chip" onClick={toggleTheme}>
        {theme === 'dark' ? t('nav.light') : t('nav.dark')}
      </button>
    </>
  )

  return (
    <header className="wrap">
      <div className="nav">
        <Link className="mark" to="/">Yanis<br />Berger</Link>
        <nav className="nav-links" aria-label={t('nav.label')}>
          {links.map((l) => renderLink(l))}
          {toggles}
        </nav>
        <div className="menu-btn" style={{ gap: 6 }}>
          {toggles}
          <button
            type="button"
            className="chip"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label={t('nav.label')}>
        {links.map((l) => renderLink(l, () => setOpen(false)))}
      </nav>
    </header>
  )
}
