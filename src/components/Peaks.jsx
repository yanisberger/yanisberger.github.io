import { useLanguage } from '../i18n/LanguageContext'
import peaks from '../data/peaks.json'

// Mountain photos under About. Web versions are made by scripts/make-photos.py.
export default function Peaks() {
  const { language, t } = useLanguage()

  return (
    <div className="wrap peaks">
      {peaks.map((p) => (
        <figure className="peak" key={p.id}>
          <div className="img">
            <img
              src={`/photos/${p.id}-640.jpg`}
              srcSet={`/photos/${p.id}-640.jpg 640w, /photos/${p.id}-1000.jpg 1000w`}
              sizes="(max-width: 860px) 50vw, 280px"
              width="640"
              height="853"
              loading="lazy"
              decoding="async"
              alt={p.alt[language]}
            />
          </div>
          <figcaption className="meta">
            {p.place}, {p.altitude} m<br />
            {t(`peaks.${p.season}`)} {p.year}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
