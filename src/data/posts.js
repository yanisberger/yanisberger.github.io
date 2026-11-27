/**
 * Posts are defined as Markdown files in src/posts/.
 * To add a new post, create a new .md file there with this frontmatter:
 *
 *   ---
 *   title: "Your Post Title"
 *   description: "One-sentence summary shown on the card."
 *   date: "April 2026"
 *   ---
 *
 * The read time is computed from the word count.
 *
 * No changes to this file or any component are needed.
 */

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) return { data: {}, content: raw }
  const data = Object.fromEntries(
    match[1].split('\n').map((line) => {
      const [key, ...rest] = line.split(':')
      return [key.trim(), rest.join(':').trim().replace(/^"|"$/g, '')]
    })
  )
  return { data, content: match[2] }
}

const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

const posts = Object.entries(modules).map(([path, raw]) => {
  const slug = path.split('/').pop().replace('.md', '')
  const { data, content } = parseFrontmatter(raw)
  const words = content.split(/\s+/).filter(Boolean).length
  const readTime = `${Math.max(1, Math.round(words / 220))} min read`
  return { slug, content, ...data, readTime }
})

const time = (date) => {
  const t = new Date(date).getTime()
  return Number.isNaN(t) ? 0 : t
}

export const sortedPosts = [...posts].sort((a, b) => time(b.date) - time(a.date))

export default posts
