import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../i18n/LanguageContext'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const EMAIL = 'yanis.berger@bluewin.ch'
export const GITHUB = 'https://github.com/yanisberger'
export const LINKEDIN = 'https://www.linkedin.com/in/yanis-berger-7b4771235'

export default function Contact() {
  const { t } = useLanguage()
  const formRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById('email-address'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="head"><h2 id="contact-h">{t('contact.title')}</h2></div>
        <p className="intro">{t('contact.intro')}</p>
        <div className="mail">
          <a id="email-address" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button type="button" className="chip" onClick={copyEmail} aria-live="polite">
            {copied ? t('contact.copied') : t('contact.copy')}
          </button>
        </div>
        <div className="elsewhere">
          <a className="tlink" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="tlink" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <form ref={formRef} className="form" onSubmit={handleSubmit}>
          <h3>{t('contact.formTitle')}</h3>
          <label htmlFor="from_name">
            {t('contact.name')}
            <input id="from_name" name="from_name" type="text" autoComplete="name" required />
          </label>
          <label htmlFor="from_email">
            {t('contact.email')}
            <input id="from_email" name="from_email" type="email" autoComplete="email" required />
          </label>
          <label htmlFor="message">
            {t('contact.message')}
            <textarea id="message" name="message" rows={5} required />
          </label>
          <div className="actions" style={{ marginTop: 4 }}>
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
            <p className="status" role="status">
              {status === 'success' && t('contact.success')}
              {status === 'error' && t('contact.error')}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
