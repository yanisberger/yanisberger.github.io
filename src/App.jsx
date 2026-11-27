import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Writing from './components/Writing'
import About from './components/About'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLanguage } from './i18n/LanguageContext'

export default function App() {
  const { t } = useLanguage()

  return (
    <>
      <a className="skip" href="#main">{t('nav.skip')}</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <Writing />
        <About />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
