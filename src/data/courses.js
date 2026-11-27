/**
 * Courses come from courses.csv in this folder. To add a course, add a row there:
 *
 *   highlight   "x" to show the course in ink even if its topic is not crypto or security
 *   course_en   name shown on the site
 *   level       BSc or MSc
 *   semester    HS22, FS23, ... (HS = autumn, FS = spring)
 *   ects        number, e.g. 5 or 4.5
 *   topic       crypto, security, software, maths, philosophy, physics, systems or other
 *   status      empty when finished; otherwise a short label such as "in progress", "planned",
 *               "exam FS27" or "attended" (shown next to the course, not counted as completed)
 *   institution empty for Bern; "ETH" for courses credited from ETH Zurich
 *
 * course_original and note are for your own reference and never shown.
 * Grades are deliberately not part of the file.
 */
import raw from './courses.csv?raw'

// Points marked on the timeline, by semester.
export const MILESTONES = {
  FS25: 'thesis',
  FS26: 'hackathon',
}

// Topics in display order. crypto and security are the focus.
export const TOPICS = ['crypto', 'security', 'software', 'maths', 'philosophy', 'physics', 'systems', 'other']
const FOCUS_TOPICS = new Set(['crypto', 'security'])

// Minimal CSV parser: commas, double-quoted fields, "" as an escaped quote.
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (ch === '"') quoted = false
      else field += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') { row.push(field); field = '' }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.some((f) => f.trim() !== '')) rows.push(row)
      row = []
    } else field += ch
  }
  row.push(field)
  if (row.some((f) => f.trim() !== '')) rows.push(row)
  const [header, ...body] = rows
  return body.map((cells) => Object.fromEntries(header.map((h, i) => [h.trim(), (cells[i] ?? '').trim()])))
}

// HS22 -> 45, FS23 -> 46: a sortable number for a semester.
export const semesterIndex = (sem) => Number(sem.slice(2)) * 2 + (sem.startsWith('HS') ? 1 : 0)

// The semester we are in today. Spring semester runs February to July, autumn August to January.
export function currentSemester(date = new Date()) {
  const m = date.getMonth() + 1
  const y = date.getFullYear() % 100
  if (m >= 2 && m <= 7) return `FS${String(y).padStart(2, '0')}`
  return `HS${String(m === 1 ? y - 1 : y).padStart(2, '0')}`
}

export const courses = parseCsv(raw).map((r) => ({
  name: r.course_en,
  level: r.level,
  semester: r.semester,
  ects: Number(r.ects) || 0,
  topic: TOPICS.includes(r.topic) ? r.topic : 'other',
  status: r.status,
  institution: r.institution,
  focus: r.highlight !== '' || FOCUS_TOPICS.has(r.topic),
}))
