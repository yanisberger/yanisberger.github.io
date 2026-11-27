import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { sortedPosts } from '../data/posts'

export default function Blog() {
  const { t } = useLanguage()

  return (
    <>
      <a className="skip" href="#main">{t('nav.skip')}</a>
      <Navbar home={false} />
      <main id="main" className="wrap">
        <div className="article">
          <h1>{t('writing.title')}</h1>
          <p className="lede">{t('writing.subtitle')}</p>
          <ul className="rows posts">
            {sortedPosts.map((post) => (
              <li key={post.slug}>
                <div className="row">
                  <div>
                    <h3><Link to={`/blog/${post.slug}`}><span>{post.title}</span></Link></h3>
                    <p>{post.description}</p>
                  </div>
                  <span className="meta">{post.date}<br />{post.readTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
