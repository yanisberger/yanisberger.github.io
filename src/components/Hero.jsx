import { useLanguage } from '../i18n/LanguageContext'
import AsciiPortrait from './AsciiPortrait'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="wrap hero" id="top" aria-labelledby="hero-name">
      <div>
        <h1 id="hero-name">Yanis Berger</h1>
        <p className="lead">{t('hero.lead')}</p>
        <p className="body">{t('hero.body')}</p>
        <div className="actions">
          <a className="btn" href="#work">{t('hero.cta')}</a>
          <a className="tlink" href="/resume.pdf" target="_blank" rel="noopener noreferrer">{t('hero.resume')}</a>
        </div>
      </div>
      <div className="visual">
        <AsciiPortrait label={t('hero.portraitAlt')} />
      </div>
    </section>
  )
}
