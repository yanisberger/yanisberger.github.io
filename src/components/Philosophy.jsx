import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Philosophy() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const paragraphs = [
    t('philosophy.p1'),
    t('philosophy.p2'),
    t('philosophy.p3'),
    t('philosophy.p4'),
  ]

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {t('philosophy.label')}
          </p>
          <h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('philosophy.title')}
          </h2>
        </div>

        {/* Content with left accent border */}
        <div
          className="relative pl-8 sm:pl-12"
          style={{ borderLeft: '2px solid var(--accent-dim)' }}
        >
          {/* First paragraph */}
          <p
            className={`text-lg sm:text-xl leading-relaxed mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            {paragraphs[0]}
          </p>

          {/* Featured Quote */}
          <blockquote
            className={`my-12 py-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              "{t('philosophy.quote')}"
            </p>
            <div
              className="mt-4 w-16 h-1 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </blockquote>

          {/* Second paragraph */}
          <p
            className={`text-lg sm:text-xl leading-relaxed mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            {paragraphs[1]}
          </p>

          {/* Third paragraph */}
          <p
            className={`text-lg sm:text-xl leading-relaxed mb-8 transition-all duration-700 delay-[400ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            {paragraphs[2]}
          </p>

          {/* Fourth paragraph*/}
          <p
            className={`text-lg sm:text-xl leading-relaxed transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: 'var(--text-secondary)' }}
          >
            {paragraphs[3]}
          </p>
        </div>
      </div>

      {/* Subtle bottom divider */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />
    </section>
  )
}
