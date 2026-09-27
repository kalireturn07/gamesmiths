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
  // Paper sheets and cards
  ['ink', 'cream', 4.5, 'headings + text on paper sheets'],
  ['muted', 'cream', 4.5, 'body text on paper sheets'],
  ['ink', 'paper-light', 4.5, 'text on white paper cards, the form'],
  ['muted', 'paper-light', 4.5, 'body text on white paper cards'],
  ['red-bright', 'cream', 4.5, 'kickers, "you.", handwritten accents on paper'],
  ['red-bright', 'paper-light', 4.5, 'red text on paper cards'],
  ['blue', 'cream', 4.5, '"Build" title on paper'],
  ['gold-deep', 'cream', 4.5, '"Create" title on paper'],
  ['purple', 'cream', 4.5, '"Jam" title on paper'],
  ['green', 'cream', 4.5, 'green text on paper'],
  // Sticky notes
  ['ink', 'note', 4.5, 'yellow sticky notes'],
  ['ink', 'note-pink', 4.5, 'pink sticky notes'],
  ['ink', 'note-blue', 4.5, 'blue sticky notes'],
  ['ink', 'note-green', 4.5, 'green sticky notes'],
  // The dark wall and dark panels
  ['cream', 'dark', 4.5, 'headings on the dark wall'],
  ['muted-cream', 'dark', 4.5, 'body text on the dark wall'],
  ['ember', 'dark', 4.5, 'kickers, "You are here", YOU DIED'],
  ['cream', 'dark-panel', 4.5, 'text in dark panels'],
  ['muted-cream', 'dark-panel', 4.5, 'body text in dark panels'],
  ['ember', 'dark-panel', 4.5, 'red event titles in dark panels'],
  ['blue-light', 'dark', 4.5, 'blue labels on dark'],
  ['gold-light', 'dark', 4.5, 'gold labels on dark'],
  ['purple-light', 'dark', 4.5, 'purple labels on dark'],
  ['green-light', 'dark', 4.5, 'green labels on dark'],
  ['blue-light', 'dark-panel', 4.5, 'blue event titles in dark panels'],
  ['gold-light', 'dark-panel', 4.5, 'gold event titles in dark panels'],
  // Buttons and filled shapes
  ['cream', 'red-bright', 4.5, 'red buttons'],
  ['cream', 'red', 4.5, 'red buttons on hover'],
  ['cream', 'blue', 4.5, 'blue buttons'],
  ['ink', 'gold', 4.5, 'gold buttons'],
  ['cream', 'purple', 4.5, 'purple buttons'],
  ['cream', 'green', 4.5, 'green buttons'],
  ['cream', 'dark', 4.5, 'dark buttons'],
  // Non-text (3:1)
  ['ember', 'dark', 3, 'focus ring on dark'],
  ['red', 'cream', 3, 'focus ring on paper'],
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
