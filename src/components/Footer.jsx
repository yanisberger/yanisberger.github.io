import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { GITHUB, LINKEDIN } from './Contact'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <Link className="mark" to="/">Yanis<br />Berger</Link>
          <small>{t('contact.copyright').replace('{year}', new Date().getFullYear())}</small>
        </div>
        <nav aria-label={t('footer.label')}>
          <div>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">{t('nav.resume')}</a>
            <Link to="/blog">{t('nav.writing')}</Link>
          </div>
        </nav>
      </div>
    </footer>
  )
}
