import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import posts from '../data/posts'

// External links open in a new tab; links inside the site stay in place.
const mdComponents = {
  a: ({ href = '', children }) =>
    /^https?:/.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
      <a href={href}>{children}</a>
    ),
}

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const post = posts.find((p) => p.slug === slug)

  return (
    <>
      <a className="skip" href="#main">{t('nav.skip')}</a>
      <Navbar home={false} />
      <main id="main" className="wrap">
        {post ? (
          <article className="article">
            <Link className="tlink" to="/blog">{t('writing.allPosts')}</Link>
            <h1>{post.title}</h1>
            <p className="meta">{post.date}, {post.readTime}</p>
            <p className="lede" style={{ marginTop: 20 }}>{post.description}</p>
            <div className="md">
              <ReactMarkdown components={mdComponents}>{post.content}</ReactMarkdown>
            </div>
          </article>
        ) : (
          <div className="article">
            <h1>{t('writing.notFound')}</h1>
            <Link className="btn" to="/blog">{t('writing.allPosts')}</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
