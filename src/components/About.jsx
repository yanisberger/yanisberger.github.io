import { GraduationCap, BookOpen, FlaskConical } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const cards = [
    {
      icon: GraduationCap,
      title: t('about.education'),
      education: [
        {
          degree: t('about.educationMsc'),
          spec: t('about.educationMscSpec'),
          date: t('about.educationMscDate'),
        },
        {
          degree: t('about.educationBsc'),
          date: t('about.educationBscDate'),
        },
      ],
    },
    {
      icon: BookOpen,
      title: t('about.teaching'),
      main: t('about.teachingRole'),
      list: [t('about.teachingCourse1'), t('about.teachingCourse2')],
    },
    {
      icon: FlaskConical,
      title: t('about.research'),
      main: t('about.researchFocus'),
      list: [t('about.researchArea1'), t('about.researchArea2'), t('about.researchArea3')],
    },
  ]

  return (
    <section
      id="about"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {t('about.title')}
          </p>
          <h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('about.titleHighlight')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text Content */}
          <div className="space-y-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('about.intro')}
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('about.thesis')}
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('about.teachingAssistant')}
            </p>
            <p
            className = "text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary' }}
            >
              {t('about.freetime')}
              
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-5">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'rgba(107, 101, 96, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(107, 101, 96, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: 'var(--accent-dim)' }}
                  >
                    <card.icon size={22} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3
                    className="font-display font-semibold text-xl"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {card.title}
                  </h3>
                </div>
                {card.main && (
                  <p style={{ color: 'var(--text-secondary)' }}>{card.main}</p>
                )}
                {card.sub && (
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    {card.sub}
                  </p>
                )}
                {card.education && (
                  <div className="space-y-3">
                    {card.education.map((edu, i) => (
                      <div key={i}>
                        <p style={{ color: 'var(--text-secondary)' }}>{edu.degree}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          {edu.spec && <span>{edu.spec}</span>}
                          {edu.spec && <span>·</span>}
                          <span>{edu.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {card.list && (
                  <ul className="mt-3 space-y-1">
                    {card.list.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm flex items-center gap-2"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span style={{ color: 'var(--accent)' }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-dim), transparent 50%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
