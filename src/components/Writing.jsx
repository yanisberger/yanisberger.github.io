import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import posts from '../data/posts'

const MAX_FEATURED = 3

function PostCard({ post, index, isVisible, featured = false, readLabel }) {
  const delay = `${100 + index * 120}ms`

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group relative flex flex-col rounded-xl border transition-all duration-300 ${
        featured ? 'p-10' : 'p-7'
      }`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'rgba(107, 101, 96, 0.2)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}, border-color 0.3s ease, box-shadow 0.3s ease`,
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
      {/* Meta row */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          {post.date}
        </span>
        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-muted)' }} />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-display font-semibold leading-snug mb-3 transition-colors duration-300 group-hover:opacity-90 ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl'
        }`}
        style={{ color: 'var(--text-primary)' }}
      >
        {post.title}
      </h3>

      {/* Description */}
      <p
        className={`leading-relaxed ${featured ? 'text-base sm:text-lg' : 'text-sm'}`}
        style={{ color: 'var(--text-secondary)' }}
      >
        {post.description}
      </p>

      {/* Read arrow */}
      <div className="mt-5 flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
        <span className="text-xs tracking-widest uppercase">{readLabel}</span>
        <ArrowRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, var(--accent-dim), transparent 60%)',
        }}
      />
    </Link>
  )
}

export default function Writing() {
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

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featured = posts.slice(0, MAX_FEATURED)
  const hasMore = posts.length > MAX_FEATURED
  const single = featured.length === 1

  return (
    <section
      ref={sectionRef}
      id="writing"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {t('writing.label')}
          </p>
          <h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('writing.title')}
          </h2>
          <p
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('writing.subtitle')}
          </p>
        </div>

        {/* Posts */}
        {single ? (
          // Single featured post — full width, more prominent
          <div className="max-w-3xl">
            <PostCard post={featured[0]} index={0} isVisible={isVisible} featured readLabel={t('writing.read')} />
          </div>
        ) : (
          // Grid of cards
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} isVisible={isVisible} readLabel={t('writing.read')} />
            ))}
          </div>
        )}

        {/* All Posts link */}
        {hasMore && (
          <div
            className="mt-10 transition-all duration-700 delay-500"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-300"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {t('writing.allPosts')}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />
    </section>
  )
}
