import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import posts from '../data/posts'

const mdComponents = {
  h2: ({ children }) => (
    <h2
      className="font-display font-semibold text-2xl sm:text-3xl mt-14 mb-5"
      style={{ color: 'var(--text-primary)' }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className="font-display font-semibold text-xl mt-10 mb-4"
      style={{ color: 'var(--text-primary)' }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 transition-colors duration-200"
      style={{ color: 'var(--accent)' }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 space-y-2 pl-5" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 space-y-2 pl-5 list-decimal" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base sm:text-lg leading-relaxed" style={{ listStyleType: 'disc' }}>
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: 'var(--text-secondary)' }}>{children}</em>
  ),
  hr: () => (
    <hr
      className="my-12 border-0 h-px"
      style={{ backgroundColor: 'rgba(107, 101, 96, 0.25)' }}
    />
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="pl-6 my-8"
      style={{ borderLeft: '2px solid var(--accent-dim)' }}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-xl my-8 w-full"
      style={{ maxWidth: '100%' }}
    />
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code
        className="px-1.5 py-0.5 rounded text-sm font-mono"
        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}
      >
        {children}
      </code>
    ) : (
      <pre
        className="rounded-xl p-6 mb-6 overflow-x-auto text-sm font-mono"
        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
      >
        <code>{children}</code>
      </pre>
    ),
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = posts.find((p) => p.slug === slug)
  const goBack = () => navigate(-1)

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <p className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>
          Post not found.
        </p>
        <button
          onClick={goBack}
          className="text-sm tracking-widest uppercase transition-colors duration-300"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ← Back home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <div className="px-6 sm:px-8 lg:px-12 py-8">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-300"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={14} />
          Back {/* Button in the Blog itself */}
        </button>
      </div>

      {/* Article */}
      <article className="px-6 sm:px-8 lg:px-12 pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-muted)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {post.title}
          </h1>

          {/* Lede */}
          <p className="text-lg leading-relaxed mb-16" style={{ color: 'var(--text-secondary)' }}>
            {post.description}
          </p>

          {/* Divider */}
          <div className="w-16 h-px mb-16" style={{ backgroundColor: 'var(--accent-dim)' }} />

          {/* Body */}
          <ReactMarkdown components={mdComponents}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
