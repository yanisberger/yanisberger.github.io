import { Fragment } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { now } from '../data/now'

export default function Now() {
  const { language, t } = useLanguage()

  return (
    <div className="wrap">
      <section className="now" aria-labelledby="now-h">
        <div>
          <h2 id="now-h">{t('now.title')}</h2>
          <span className="meta">{now.updated[language]}</span>
        </div>
        <dl>
          {now.lines.map((line) => (
            <Fragment key={line.label.en}>
              <dt>{line.label[language]}</dt>
              <dd>{line.text[language]}</dd>
            </Fragment>
          ))}
        </dl>
      </section>
    </div>
  )
}
