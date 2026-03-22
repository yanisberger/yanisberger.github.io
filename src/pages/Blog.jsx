import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import posts from '../data/posts'

function parseDate(str) {
  const d = new Date(str)
  return isNaN(d) ? 0 : d.getTime()
}

const sorted = [...posts].sort((a, b) => parseDate(b.date) - parseDate(a.date))

export default function Blog() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <div className="px-6 sm:px-8 lg:px-12 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-300"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          
          <ArrowLeft size={14} />
          Back Home {/* Button inside the overview */}
        </button>
      </div>

      <div className="px-6 sm:px-8 lg:px-12 pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--accent)' }}
            >
              All writing
            </p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Writing
            </h1>
          </div>

          {/* Post list */}
          <div className="flex flex-col">
            {sorted.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-6 py-7 transition-colors duration-200"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(107, 101, 96, 0.2)' : undefined,
                  borderBottom: '1px solid rgba(107, 101, 96, 0.2)',
                }}
              >
                <div className="flex-1 min-w-0">
                  <h2
                    className="font-display font-semibold text-lg leading-snug mb-1 transition-colors duration-200 group-hover:opacity-80"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: 'var(--accent)' }}
                    >
                      {post.date}
                    </span>
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: 'var(--text-muted)' }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
