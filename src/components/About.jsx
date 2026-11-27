import { Fragment } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const FACTS = ['teaching', 'languages', 'security', 'tools']

export default function About() {
  const { t } = useLanguage()

  return (
    <section className="block" id="about" aria-labelledby="about-h">
      <div className="wrap split">
        <div className="head"><h2 id="about-h">{t('about.title')}</h2></div>
        <div className="prose">
          <p className="claim">{t('about.quote')}</p>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p className="muted">{t('about.p3')}</p>
          <dl className="facts">
            {FACTS.map((key) => (
              <Fragment key={key}>
                <dt>{t(`about.${key}`)}</dt>
                <dd>{t(`about.${key}Value`)}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
