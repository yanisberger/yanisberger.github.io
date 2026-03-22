/**
 * Posts are defined as Markdown files in src/posts/.
 * To add a new post, create a new .md file there with this frontmatter:
 *
 *   ---
 *   title: "Your Post Title"
 *   description: "One-sentence summary shown on the card."
 *   date: "April 2026"
 *   readTime: "5 min read"
 *   ---
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
  return { slug, content, ...data }
})

export default posts
