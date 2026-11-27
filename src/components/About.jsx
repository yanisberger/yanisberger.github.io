import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const facts = [
    ['studying', 'studyingValue'],
    ['teaching', 'teachingValue'],
    ['before', 'beforeValue'],
    ['languages', 'languagesValue'],
    ['security', 'securityValue'],
    ['tools', 'toolsValue'],
  ]

  return (
    <section className="block" id="about" aria-labelledby="about-h">
      <div className="wrap split">
        <div className="head"><h2 id="about-h">{t('about.title')}</h2></div>
        <div className="prose">
          <p>{t('about.intro')}</p>
          <p>{t('about.thesis')}</p>
          <p className="muted">{t('about.freetime')}</p>
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label} style={{ display: 'contents' }}>
                <dt>{t(`about.${label}`)}</dt>
                <dd>{t(`about.${value}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
