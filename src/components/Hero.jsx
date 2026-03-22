import { useState, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const MOVE_INTENSITY = 15
const TRANSITION_SPEED = 0.15

export default function Hero() {
  const { t } = useLanguage()
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const pictureRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!pictureRef.current) return
    const rect = pictureRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    setTransform({ x: x * MOVE_INTENSITY, y: y * MOVE_INTENSITY })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Geometric pattern background */}
      <div className="hero-pattern" />

      <div className="relative z-10 max-w-7xl w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Text Content - Takes more space */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Greeting - smaller, offset */}
            <p
              className="animate-fade-in-1 text-sm sm:text-base tracking-[0.3em] uppercase mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('hero.greeting')}
            </p>

            {/* Name - Oversized display typography */}
            <h1
              className="animate-fade-in-2 font-display font-bold leading-[0.9] mb-6"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em'
              }}
            >
              {t('hero.name')}
              <span
                className="block text-[0.15em] font-medium tracking-[0.1em] mt-2"
                style={{ color: 'var(--accent)' }}
              >
                {t('hero.title')}
              </span>
            </h1>

            {/* Description */}
            <p
              className="animate-fade-in-3 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('hero.description')}
            </p>

            {/* CTAs - Refined interactions */}
            <div className="animate-fade-in-4 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6">
              {/* Primary CTA with arrow */}
              <a
                href="#projects"
                className="arrow-animate group flex items-center gap-3 text-lg font-medium transition-colors duration-300"
                style={{ color: 'var(--accent)' }}
              >
                <span className="underline-animate">{t('hero.viewWork')}</span>
                <ArrowRight className="arrow-icon" size={20} />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="text-lg font-medium transition-all duration-300 px-6 py-2 rounded-full border"
                style={{
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--accent)'
                  e.target.style.color = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--text-muted)'
                  e.target.style.color = 'var(--text-secondary)'
                }}
              >
                {t('hero.getInTouch')}
              </a>
            </div>
          </div>

          {/* Profile Picture - Soft treatment */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-5 order-first lg:order-last">
            <div
              ref={pictureRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="photo-glow relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] cursor-pointer"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px)`,
                transition: `transform ${TRANSITION_SPEED}s ease-out`,
              }}
            >
              {/* Soft gradient border */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, var(--accent-dim), transparent 60%)`,
                  padding: '3px',
                }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <img
                    src="/ProfilePicture.PNG"
                    alt="Yanis Berger"
                    className="w-full h-full object-cover"
                    style={{
                      maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      
    </section>
  )
}
