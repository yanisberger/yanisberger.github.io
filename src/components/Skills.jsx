import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const securitySkills = [
  'OAuth / OIDC',
  'Privacy-Preserving Protocols',
  'Digital Identity Systems',
  'Zero-knowledge Proofs',
]

const supportingCards = [
  {
    num: '02',
    name: 'Languages',
    skills: ['Java', 'Go', 'Python', 'JavaScript', 'Swift'],
  },
  {
    num: '03',
    name: 'Frameworks & Libraries',
    skills: ['React', 'Tailwind CSS', 'Node.js', 'Flask'],
  },
  {
    num: '04',
    name: 'Tools & Infrastructure',
    skills: ['Git','GitHub', 'Docker', 'Kubernetes', 'PostgreSQL', 'GitHub Actions' , 'CI/CD'],
  },
  {
  num: '05',
  name: 'Blockchain & Web3',
  skills: ['Solidity', 'Smart Contracts', 'Ethereum', 'Truffle'],
}
]

function SkillTag({ label }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-3 py-1 text-sm rounded-full border cursor-default transition-all duration-200 select-none"
      style={{
        color: hovered ? 'var(--accent)' : 'var(--text-secondary)',
        borderColor: hovered ? 'var(--accent)' : 'rgba(107, 101, 96, 0.35)',
        backgroundColor: hovered ? 'rgba(245, 158, 11, 0.07)' : 'rgba(107, 101, 96, 0.08)',
      }}
    >
      {label}
    </span>
  )
}

function useFadeUp(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    },
  }
}

function SecurityCard() {
  const { ref, style } = useFadeUp(0)
  const { t } = useLanguage()

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.25)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      style={{
        ...style,
        gridColumn: '1 / 2',
        gridRow: '1 / 3',
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
        borderColor: 'rgba(245, 158, 11, 0.25)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        transition: style.transition + ', border-color 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <span
          className="text-lg font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          Security & Cryptography
        </span>
        <span
          className="font-mono text-xs px-2.5 py-1 rounded-full border shrink-0"
          style={{
            color: 'var(--accent)',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            backgroundColor: 'rgba(245, 158, 11, 0.06)',
          }}
        >
          Master's specialization
        </span>
      </div>

      {/* Prose */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {t('skills.securityProse')}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: 'rgba(245, 158, 11, 0.18)' }} />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {securitySkills.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>
    </div>
  )
}

function SmallCard({ card, index }) {
  const { ref, style } = useFadeUp((index + 1) * 70)

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(107, 101, 96, 0.2)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      style={{
        ...style,
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'rgba(107, 101, 96, 0.2)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '16px',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: style.transition + ', border-color 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Header */}
      <div className="flex items-baseline gap-2">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          {card.num} —
        </span>
        <span
          className="text-base font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {card.name}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {card.skills.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section
      id="skills"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <p
            className="font-mono text-sm tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {t('skills.title')}
          </p>
          <h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('skills.titleHighlight')}
          </h2>
        </div>

        {/* Asymmetric grid — collapses to 1 col on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '12px',
          }}
          className="skills-grid"
        >
          <SecurityCard />
          {supportingCards.map((card, i) => (
            <SmallCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .skills-grid {
            grid-template-columns: 1.9fr 1fr 1fr !important;
            grid-template-rows: 1fr 1fr;
          }
          .skills-grid > *:first-child {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
          }
        }
      `}</style>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />
    </section>
  )
}
