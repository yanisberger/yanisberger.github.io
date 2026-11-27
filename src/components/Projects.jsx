import { useLanguage } from '../i18n/LanguageContext'

const projects = [
  {
    key: 'pqPool',
    stack: 'Noir, Solidity, ProveKit',
    link: 'https://github.com/NicoSerranoP/pq-shielded-pool/tree/yanis-proof-foundryVerification',
    more: { key: 'pqPoolSpike', href: 'https://github.com/yanisberger/provekit-onchain' },
  },
  { key: 'phish', stack: 'SwiftUI, iPad, macOS', link: 'https://github.com/yanisberger/PhishOrPass' },
  { key: 'thesis', stack: 'Go, OpenID Connect', link: 'https://crypto.unibe.ch/archive/theses/2025.bsc.yanis.berger.pdf' },
  { key: 'mr', stack: 'Python, Meta Quest 3, LeRobot', link: 'https://github.com/prakash-aryan/xrtact/tree/camera-background-threads' },
  { key: 'futureSelf', stack: 'iOS, Flask', link: 'https://apps.apple.com/ch/app/future-self/id6479296395' },
]

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section className="block" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="head"><h2 id="work-h">{t('projects.title')}</h2></div>
        <ul className="rows">
          {projects.map((p) => (
            <li key={p.key}>
              <div className="row">
                <span className="meta">{t(`projects.${p.key}Kind`)}</span>
                <div>
                  <h3>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"><span>{t(`projects.${p.key}Title`)}</span></a>
                  </h3>
                  <p>{t(`projects.${p.key}Desc`)}</p>
                  {p.more && (
                    <a className="more" href={p.more.href} target="_blank" rel="noopener noreferrer">
                      {t(`projects.${p.more.key}`)}
                    </a>
                  )}
                </div>
                <span className="meta stack">{p.stack}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
