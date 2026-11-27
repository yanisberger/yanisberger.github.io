import { useLanguage } from '../i18n/LanguageContext'

export default function Philosophy() {
  const { t } = useLanguage()

  return (
    <section className="block" id="why" aria-labelledby="why-h">
      <div className="wrap split">
        <div className="head"><h2 id="why-h">{t('philosophy.title')}</h2></div>
        <div className="prose">
          <p className="claim">{t('philosophy.quote')}</p>
          <p>{t('philosophy.p1')}</p>
          <p>{t('philosophy.p2')}</p>
          <p>{t('philosophy.p3')}</p>
          <p>{t('philosophy.p4')}</p>
        </div>
      </div>
    </section>
  )
}
