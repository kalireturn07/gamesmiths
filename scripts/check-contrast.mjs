/*
 * Checks every text/background colour pairing the site uses against WCAG AA.
 * Colours are read from the @theme block in src/styles/index.css, so this
 * stays in sync with the real tokens. Run: npm run check:contrast
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = fs.readFileSync(path.join(root, 'src/styles/index.css'), 'utf8')
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map(([, name, hex]) => [name, hex]),
)

// [text, background, minimum ratio, where it is used]
// 4.5 = normal text, 3 = large text (24px+, or 19px+ bold) and UI parts like focus rings.
const PAIRS = [
  ['cream', 'dark', 4.5, 'headings on dark sections'],
  ['muted-cream', 'dark', 4.5, 'body text on dark sections'],
  ['ember', 'dark', 4.5, 'kickers, timeline dates, YOU DIED on dark'],
  ['cream', 'dark-panel', 4.5, 'card titles on dark panels'],
  ['muted-cream', 'dark-panel', 4.5, 'card body text on dark panels'],
  ['ember', 'dark-panel', 4.5, 'accents inside dark panels'],
  ['ink', 'cream', 4.5, 'headings on cream sections'],
  ['muted', 'cream', 4.5, 'body text on cream sections'],
  ['red', 'cream', 4.5, 'kickers on cream'],
  ['red-bright', 'cream', 4.5, 'hover/link colour on cream'],
  ['ink', 'cream-panel', 4.5, 'card titles on cream panels'],
  ['muted', 'cream-panel', 4.5, 'card body text on cream panels'],
  ['cream', 'red', 4.5, 'button labels, tournament format card'],
  ['cream', 'red-bright', 4.5, 'button labels on hover'],
  ['cream', 'dark', 3, 'icons inside dark badges'],
  ['cream', 'red', 3, 'icons inside red badges'],
  ['ember', 'dark', 3, 'focus ring on dark'],
  ['red', 'cream', 3, 'focus ring on cream'],
]

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

let failed = 0
for (const [fg, bg, min, use] of PAIRS) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`✗ unknown token in pair ${fg} / ${bg}`)
    failed++
    continue
  }
  const r = ratio(tokens[fg], tokens[bg])
  const ok = r >= min
  if (!ok) failed++
  console.log(`${ok ? '✓' : '✗'} ${r.toFixed(2).padStart(5)}:1  (needs ${min})  ${fg} on ${bg}: ${use}`)
}

// For reference: the pairing the site deliberately avoids.
const avoided = ratio(tokens['red-bright'], tokens.dark)
console.log(`\nℹ red-bright on dark is ${avoided.toFixed(2)}:1, so red text on dark uses "ember" instead.`)

if (failed) {
  console.error(`\n${failed} pairing(s) fail WCAG AA.`)
  process.exit(1)
}
console.log('\nAll pairings pass WCAG AA.')
