// Full-page screenshots of the site at several widths, in dark and light theme.
//
//   npm run shots                     -> screenshots/latest/
//   npm run shots -- --label before   -> screenshots/before/
//   npm run shots -- --widths 1440,390 --themes dark --path /blog
//
// Starts its own Vite dev server on a free port and stops it when done.

import { createServer } from 'vite'
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

const { values: args } = parseArgs({
  options: {
    label: { type: 'string', default: 'latest' },
    widths: { type: 'string', default: '1440,1024,768,390' },
    themes: { type: 'string', default: 'dark,light' },
    path: { type: 'string', default: '/' },
  },
})

const HEIGHTS = { 1440: 900, 1024: 768, 768: 1024, 390: 844 }
const widths = args.widths.split(',').map(Number)
const themes = args.themes.split(',')
const outDir = join('screenshots', args.label)
const slug = args.path === '/' ? 'home' : args.path.replace(/^\/|\/$/g, '').replace(/\//g, '-')

await mkdir(outDir, { recursive: true })

const server = await createServer({ server: { port: 0 }, logLevel: 'error' })
await server.listen()
const base = server.resolvedUrls.local[0].replace(/\/$/, '')

const browser = await chromium.launch()
try {
  for (const theme of themes) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: HEIGHTS[width] ?? 900 },
        deviceScaleFactor: 1,
        isMobile: width < 768,
        hasTouch: width < 768,
        colorScheme: theme,
        reducedMotion: 'reduce',
      })
      // The site reads its theme from localStorage before the first render.
      await context.addInitScript((t) => localStorage.setItem('theme', t), theme)
      const page = await context.newPage()
      await page.goto(base + args.path, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      // Scroll through once so lazy images and in-view reveals have fired.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
          scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 60))
        }
        scrollTo(0, 0)
      })
      await page.waitForTimeout(1200) // let fade-in animations settle
      const file = join(outDir, `${slug}-${theme}-${width}.png`)
      await page.screenshot({ path: file, fullPage: true, animations: 'disabled' })
      console.log('saved', file)
      await context.close()
    }
  }
} finally {
  await browser.close()
  await server.close()
}
