import { Fragment } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Peaks from './Peaks'

const FACTS = ['languages', 'security', 'tools']

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
          <dl className="facts">
            <dt>{t('about.teaching')}</dt>
            <dd>
              <span className="role">{t('about.teachingRole')}</span>
              <ul className="taught">
                {t('about.teachingCourses').map(([course, semester]) => (
                  <li key={semester}><span>{course}</span><span className="meta">{semester}</span></li>
                ))}
              </ul>
            </dd>
            {FACTS.map((key) => (
              <Fragment key={key}>
                <dt>{t(`about.${key}`)}</dt>
                <dd>{t(`about.${key}Value`)}</dd>
              </Fragment>
            ))}
          </dl>
          {/* sits directly above the mountain photos, so it reads as their caption */}
          <p className="muted">{t('about.p3')}</p>
        </div>
      </div>
      <Peaks />
    </section>
  )
}
