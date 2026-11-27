import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { sortedPosts } from '../data/posts'

const LATEST = 3

export default function Writing() {
  const { t } = useLanguage()
  const latest = sortedPosts.slice(0, LATEST)

  return (
    <section className="block" id="writing" aria-labelledby="writing-h">
      <div className="wrap">
        <div className="head">
          <h2 id="writing-h">{t('writing.title')}</h2>
          <Link to="/blog">{t('writing.allPosts')}</Link>
        </div>
        <ul className="rows posts">
          {latest.map((post) => (
            <li key={post.slug}>
              <div className="row">
                <h3><Link to={`/blog/${post.slug}`}><span>{post.title}</span></Link></h3>
                <span className="meta">{post.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
