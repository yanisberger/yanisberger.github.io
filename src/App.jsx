import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './i18n/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Philosophy from './components/Philosophy'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Contact from './components/Contact'

function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Philosophy />
          <Skills />
          <Projects />
          <Writing />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
