import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { courses, TOPICS, MILESTONES, semesterIndex, currentSemester } from '../data/courses'

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1))
const isEth = (c) => c.institution === 'ETH'

// "in progress" is implied for the current semester, so its label is hidden there.
const NOW = currentSemester()
const shownStatus = (c) => (c.status === 'in progress' && c.semester === NOW ? '' : c.status)

function Tags({ course }) {
  return (
    <>
      {course.institution && <span className="tag">{course.institution}</span>}
      {shownStatus(course) && <span className="tag">{shownStatus(course)}</span>}
    </>
  )
}

function GroupedList({ showAll }) {
  const { t } = useLanguage()

  return (
    <div className="groups">
      {TOPICS.map((topic) => {
        const list = courses
          .filter((c) => c.topic === topic && (showAll || c.focus))
          .sort((a, b) => semesterIndex(b.semester) - semesterIndex(a.semester))
        if (!list.length) return null
        const ects = list.reduce((sum, c) => sum + c.ects, 0)
        const quiet = topic !== 'crypto' && topic !== 'security'
        return (
          <div key={topic} className={`group${quiet ? ' quiet' : ''}`}>
            <div>
              <h3>{t(`courses.topics.${topic}`)}</h3>
              <p className="count">{t(list.length === 1 ? 'courses.countOne' : 'courses.count').replace('{n}', list.length).replace('{ects}', fmt(ects))}</p>
            </div>
            <ul>
              {list.map((c) => (
                <li key={`${c.name}-${c.semester}-${c.level}`}>
                  <span>{c.name}<Tags course={c} /></span>
                  <span className="meta">{c.level} {c.semester}</span>
                  <span className="meta">{fmt(c.ects)} ECTS</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function Timeline() {
  const { t } = useLanguage()
  const now = NOW
  const semesters = [...new Set(courses.filter((c) => !isEth(c)).map((c) => c.semester))]
    .sort((a, b) => semesterIndex(a) - semesterIndex(b))
  const hasEth = courses.some(isEth)
  const columns = hasEth ? ['ETH', ...semesters] : semesters

  const inColumn = (col) =>
    col === 'ETH'
      ? courses.filter(isEth).sort((a, b) => semesterIndex(a.semester) - semesterIndex(b.semester))
      : courses.filter((c) => c.semester === col && !isEth(c)).sort((a, b) => a.focus - b.focus)
  const hasLevel = (col, level) => inColumn(col).some((c) => c.level === level)
  const lastBsc = columns.reduce((last, col, i) => (hasLevel(col, 'BSc') ? i : last), 0)
  const firstMsc = columns.findIndex((col) => hasLevel(col, 'MSc'))
  const overlap = firstMsc !== -1 && firstMsc <= lastBsc

  const milestone = (col) => {
    if (col === 'ETH') return t('courses.credited')
    if (col === now) return t('courses.now')
    return MILESTONES[col] ? t(`courses.milestones.${MILESTONES[col]}`) : null
  }
  const axisClass = (col) =>
    col === 'ETH' ? ' eth' : semesterIndex(col) > semesterIndex(now) ? ' future' : col === now ? ' now' : ''

  return (
    <>
      <div className="tl" tabIndex={0} aria-label={t('courses.timelineLabel')}>
        <div className="tl-cols" style={{ '--n': columns.length }}>
          {columns.map((col) => (
            <div className="sem" key={col}>
              <ul>
                {inColumn(col).map((c) => (
                  <li key={`${c.name}-${c.semester}-${c.level}`} className={c.focus ? 'focus' : undefined}>
                    {c.name}
                    {col === 'ETH' && <span className="when">{c.semester}</span>}
                    {shownStatus(c) && <><br /><span className="tag">{shownStatus(c)}</span></>}
                  </li>
                ))}
              </ul>
              <div className={`axis${axisClass(col)}`}>
                <span className="meta">{col === 'ETH' ? 'ETH Zurich' : col}</span>
                {milestone(col) && <b>{milestone(col)}</b>}
              </div>
            </div>
          ))}
        </div>
        <div className="phase" style={{ '--n': columns.length }}>
          <span style={{ gridColumn: `1 / ${lastBsc + 2}`, gridRow: 1 }}>{t('courses.bsc')}</span>
          {firstMsc !== -1 && (
            <span className="ms" style={{ gridColumn: `${firstMsc + 1} / -1`, gridRow: overlap ? 2 : 1, marginTop: overlap ? 14 : 0 }}>
              {t('courses.msc')}
            </span>
          )}
        </div>
      </div>
      <div className="key">
        <span><b>{t('courses.keyInk')}</b> {t('courses.keyInkText')}</span>
        <span>{t('courses.keyGrey')}</span>
        <span>{t('courses.keyDashed')}</span>
      </div>
    </>
  )
}

// One button that opens a small menu with the three views.
function ViewPicker({ views, value, onChange, label }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const buttonRef = useRef(null)
  const itemRefs = useRef([])
  const current = views.find(([id]) => id === value)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    itemRefs.current[views.findIndex(([id]) => id === value)]?.focus()
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open, value, views])

  const close = (focusButton = true) => { setOpen(false); if (focusButton) buttonRef.current?.focus() }
  const choose = (id) => { onChange(id); close() }

  const onMenuKey = (e) => {
    const i = itemRefs.current.indexOf(document.activeElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); itemRefs.current[(i + 1) % views.length]?.focus() }
    else if (e.key === 'ArrowUp') { e.preventDefault(); itemRefs.current[(i - 1 + views.length) % views.length]?.focus() }
    else if (e.key === 'Home') { e.preventDefault(); itemRefs.current[0]?.focus() }
    else if (e.key === 'End') { e.preventDefault(); itemRefs.current[views.length - 1]?.focus() }
    else if (e.key === 'Escape') { e.preventDefault(); close() }
    else if (e.key === 'Tab') close(false)
  }

  return (
    <div className="picker" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="chip picker-button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${label}: ${current[1]}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true) } }}
      >
        {current[1]}
        <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="picker-menu" role="menu" aria-label={label} onKeyDown={onMenuKey}>
          {views.map(([id, text], i) => (
            <button
              key={id}
              ref={(el) => { itemRefs.current[i] = el }}
              type="button"
              role="menuitemradio"
              aria-checked={id === value}
              tabIndex={-1}
              onClick={() => choose(id)}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Courses() {
  const { t } = useLanguage()
  const [view, setView] = useState('focus') // focus | all | timeline
  const done = courses.filter((c) => !c.status).reduce((sum, c) => sum + c.ects, 0)

  const views = [
    ['focus', t('courses.viewFocus')],
    ['all', t('courses.viewAll').replace('{n}', courses.length)],
    ['timeline', t('courses.viewTimeline')],
  ]

  return (
    <section className="block" id="courses" aria-labelledby="courses-h">
      <div className="wrap">
        <div className="head">
          <h2 id="courses-h">{t('courses.title')}</h2>
          <ViewPicker views={views} value={view} onChange={setView} label={t('courses.viewLabel')} />
        </div>
        <p className="sub">{t('courses.subtitle')}</p>
        {view === 'timeline' ? <Timeline /> : <GroupedList showAll={view === 'all'} />}
        <p className="courses-sum">
          {t('courses.summary').replace('{n}', courses.length).replace('{ects}', fmt(done))}
        </p>
      </div>
    </section>
  )
}
