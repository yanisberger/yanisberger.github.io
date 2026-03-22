import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Github, Linkedin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const { t } = useLanguage()
  const formRef = useRef()
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ from_name: '', from_email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const contactLinks = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'yanis.berger@bluewin.ch',
      href: 'mailto:yanis.berger@bluewin.ch',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/yanisberger',
      href: 'https://github.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/yanis-berger',
      href: 'https://www.linkedin.com/in/yanis-berger-7b4771235',
    },
  ]

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {t('contact.title')}
          </p>
          <h2
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('contact.titleHighlight')}
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3
              className="font-display font-semibold text-xl mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('contact.info')}
            </h3>

            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-5 rounded-xl border transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'rgba(107, 101, 96, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(107, 101, 96, 0.2)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--accent-dim)' }}
                  >
                    <link.icon size={22} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {link.label}
                    </p>
                    <p
                      className="font-medium transition-colors duration-300"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {link.value}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ color: 'var(--accent)' }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3
              className="font-display font-semibold text-xl mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('contact.sendMessage')}
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="from_name"
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'rgba(107, 101, 96, 0.2)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(107, 101, 96, 0.2)'}
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="from_email"
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'rgba(107, 101, 96, 0.2)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(107, 101, 96, 0.2)'}
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'rgba(107, 101, 96, 0.2)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(107, 101, 96, 0.2)'}
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-display font-semibold text-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-primary)',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== 'sending') {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 10px 30px rgba(232, 168, 56, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                {status === 'sending' ? (
                  <>
                    <div
                      className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                      style={{ borderColor: 'var(--bg-primary)', borderTopColor: 'transparent' }}
                    />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.send')}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div
                  className="flex items-center gap-2 justify-center py-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}
                >
                  <CheckCircle size={18} />
                  {t('contact.success')}
                </div>
              )}

              {status === 'error' && (
                <div
                  className="flex items-center gap-2 justify-center py-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                >
                  <AlertCircle size={18} />
                  {t('contact.error')}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(107, 101, 96, 0.2)' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>
            {t('contact.copyright').replace('{year}', new Date().getFullYear())}
          </p>
        </div>
      </div>
    </section>
  )
}
