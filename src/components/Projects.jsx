import { Lock, Glasses, ArrowUpRight, TabletSmartphone, ShieldCheck, Fish } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()

  const projects = [
    {
      titleKey: 'projects.pqPoolTitle',
      descKey: 'projects.pqPoolDesc',
      statusKey: 'projects.pqPoolStatus',
      tags: ['Post-Quantum Cryptography', 'Zero-Knowledge Proofs', 'Solidity', 'Noir'],
      icon: ShieldCheck,
      link: 'https://github.com/NicoSerranoP/pq-shielded-pool/tree/yanis-proof-foundryVerification',
      extraLinks: [
        { labelKey: 'projects.pqPoolSpikeLink', href: 'https://github.com/yanisberger/provekit-onchain' },
      ],
    },
    {
      titleKey: 'projects.phishTitle',
      descKey: 'projects.phishDesc',
      statusKey: 'projects.phishStatus',
      tags: ['SwiftUI', 'Security Awareness', 'Game Design'],
      icon: Fish,
      link: 'https://github.com/yanisberger/PhishOrPass',
    },
    {
      titleKey: 'projects.thesisTitle',
      descKey: 'projects.thesisDesc',
      statusKey: 'projects.thesisStatus',
      tags: ['Privacy-Preserving Authentication', 'Zero-Knowledge Proofs', 'Go'],
      icon: Lock,
      link: 'https://crypto.unibe.ch/archive/theses/2025.bsc.yanis.berger.pdf',
    },
    {
      titleKey: 'projects.mrTitle',
      descKey: 'projects.mrDesc',
      statusKey: 'projects.mrStatus',
      tags: ['Mixed Reality', 'Robotics', 'Python'],
      icon: Glasses,
      link: 'https://github.com/prakash-aryan/xrtact/tree/camera-background-threads',
    },
    {
      titleKey: 'projects.futureSelfTitle',
      descKey: 'projects.futureSelfDesc',
      statusKey: 'projects.futureSelfStatus',
      tags: ['iOS', 'flask', 'Software Engineering Project', 'Group Project'],
      icon: TabletSmartphone,
      link: 'https://apps.apple.com/ch/app/future-self/id6479296395?l=en-GBFuture Self'
    },
  ]

  return (
    <section
      id="projects"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {t('projects.title')}
          </p>
          <h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('projects.titleHighlight')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            return (
              <div
                key={project.titleKey}
                className={`group relative p-8 rounded-xl border transition-all duration-300 block ${project.link ? 'cursor-pointer' : ''}`}
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
                {/* Card-wide link; stretched over the card so extra links can sit above it */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(project.titleKey)}
                    className="absolute inset-0 rounded-xl z-10"
                  />
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: 'var(--accent-dim)' }}
                  >
                    <project.icon size={26} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{
                        backgroundColor: 'var(--accent-dim)',
                        color: 'var(--accent)',
                      }}
                    >
                      {t(project.statusKey)}
                    </span>
                    {project.link && (
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      />
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-semibold text-2xl mb-4 transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t(project.titleKey)}
                </h3>

                {/* Description */}
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t(project.descKey)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm rounded-full"
                      style={{
                        backgroundColor: 'rgba(107, 101, 96, 0.15)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Extra links */}
                {project.extraLinks && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {project.extraLinks.map((extra) => (
                      <a
                        key={extra.href}
                        href={extra.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        {t(extra.labelKey)}
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                )}

                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-dim), transparent 50%)',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />
    </section>
  )
}
