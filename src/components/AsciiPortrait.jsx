import { useEffect, useRef } from 'react'
import { useTheme } from '../i18n/ThemeContext'
import portraitDark from '../data/portrait-dark.json'
import portraitLight from '../data/portrait-light.json'

// Character portrait drawn on a canvas. Regenerate the data with scripts/make-ascii.py.
// Each theme has its own grid so the portrait never reads as a photo negative.
// Moving the pointer over it briefly turns nearby characters into hex digits.

const COLS = 84
const RAMP = ' .:-=+*x#%@'
const HEX = '0123456789abcdef'
const CELL_ASPECT = 1.9 // cell height / width, matches the 0.52 factor in make-ascii.py

export default function AsciiPortrait({ label }) {
  const { theme } = useTheme()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rows = (theme === 'light' ? portraitLight : portraitDark).map((r) => r.padEnd(COLS, ' '))
    const NR = rows.length
    const density = (c) => RAMP.indexOf(c) / (RAMP.length - 1)
    const shown = rows.map((r) => r.split(''))
    const until = new Float32Array(COLS * NR)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let cw = 0
    let ch = 0
    let raf = 0

    function draw() {
      const css = getComputedStyle(document.documentElement)
      const fg = css.getPropertyValue('--fg').trim()
      const muted = css.getPropertyValue('--muted').trim()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `500 ${ch * 0.84}px "IBM Plex Mono", ui-monospace, monospace`
      ctx.textBaseline = 'top'
      const now = performance.now()
      for (let y = 0; y < NR; y++) {
        for (let x = 0; x < COLS; x++) {
          const base = rows[y][x]
          if (base === ' ') continue
          const hot = until[y * COLS + x] > now
          const d = density(base)
          if (theme === 'light') {
            ctx.fillStyle = fg
            ctx.globalAlpha = hot ? 1 : 0.42 + d * 0.58
          } else {
            ctx.fillStyle = hot || d > 0.55 ? fg : muted
            ctx.globalAlpha = hot ? 1 : 0.35 + d * 0.65
          }
          ctx.fillText(hot ? shown[y][x] : base, x * cw, y * ch)
        }
      }
      ctx.globalAlpha = 1
    }

    function resize() {
      const width = canvas.getBoundingClientRect().width
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(width * (NR / COLS) * CELL_ASPECT * dpr)
      canvas.style.aspectRatio = `${canvas.width} / ${canvas.height}`
      cw = canvas.width / COLS
      ch = canvas.height / NR
      draw()
    }

    function tick() {
      const now = performance.now()
      let live = false
      for (let i = 0; i < until.length; i++) {
        if (until[i] > now) {
          live = true
          if (Math.random() < 0.3) shown[(i / COLS) | 0][i % COLS] = HEX[(Math.random() * 16) | 0]
        }
      }
      draw()
      raf = live ? requestAnimationFrame(tick) : 0
    }

    function onMove(e) {
      if (reduce) return
      const r = canvas.getBoundingClientRect()
      const gx = ((e.clientX - r.left) / r.width) * COLS
      const gy = ((e.clientY - r.top) / r.height) * NR
      const RX = 7
      const RY = 4
      const now = performance.now()
      for (let y = Math.max(0, (gy - RY) | 0); y < Math.min(NR, gy + RY + 1); y++) {
        for (let x = Math.max(0, (gx - RX) | 0); x < Math.min(COLS, gx + RX + 1); x++) {
          if (rows[y][x] === ' ') continue
          const dx = (x - gx) / RX
          const dy = (y - gy) / RY
          if (dx * dx + dy * dy < 1) until[y * COLS + x] = now + 350 + Math.random() * 300
        }
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', onMove)
    document.fonts?.ready.then(draw)
    return () => {
      observer.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="ascii" role="img" aria-label={label} />
}
