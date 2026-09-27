/*
 * Generates the torn-paper edge masks in src/assets/torn/.
 * Seeded, so re-running produces identical files. Only needed if you want to
 * change how the tears look: `node scripts/generate-torn-edges.mjs`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/torn')

function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Points along a torn edge: x from 0..length, depth between 0..amp (0 = outermost). */
function edge(seed, length, amp, step = [5, 16]) {
  const r = rng(seed)
  const pts = []
  let x = 0
  let depth = amp * 0.4
  while (x < length) {
    pts.push([x, depth])
    x += step[0] + r() * (step[1] - step[0])
    // mostly small wobble, occasionally a deeper bite
    const jump = r() < 0.12 ? (r() - 0.3) * amp * 1.2 : (r() - 0.5) * amp * 0.55
    depth = Math.min(amp, Math.max(0, depth + jump))
  }
  pts.push([length, depth])
  return pts
}

const f = (n) => Math.round(n * 10) / 10

/** A horizontal strip, W x H, opaque below the tear (for the TOP edge of a sheet). */
function topStrip(seed, W, H, amp) {
  const pts = edge(seed, W, amp)
  const d = `M0 ${H} ` + pts.map(([x, y]) => `L${f(x)} ${f(y)}`).join(' ') + ` L${W} ${H}Z`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${d}"/></svg>\n`
}

/** Vertical strip, W x H, opaque to the right of the tear (for the LEFT edge of a card). */
function leftStrip(seed, W, H, amp) {
  const pts = edge(seed, H, amp)
  const d = `M${W} 0 ` + pts.map(([y, x]) => `L${f(x)} ${f(y)}`).join(' ') + ` L${W} ${H}Z`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${d}"/></svg>\n`
}

function flipY(svg, H) {
  return svg.replace('<path ', `<path transform="matrix(1 0 0 -1 0 ${H})" `)
}
function flipX(svg, W) {
  return svg.replace('<path ', `<path transform="matrix(-1 0 0 1 ${W} 0)" `)
}

const files = {
  // Big section sheets (1600 wide strips, stretched to the section width)
  'sheet-top-a.svg': topStrip(11, 1600, 26, 20),
  'sheet-top-b.svg': topStrip(29, 1600, 26, 20),
  'sheet-bottom-a.svg': flipY(topStrip(47, 1600, 26, 20), 26),
  'sheet-bottom-b.svg': flipY(topStrip(83, 1600, 26, 20), 26),
  // Cards: smaller, finer tears on all four sides
  'card-top.svg': topStrip(5, 600, 10, 7),
  'card-bottom.svg': flipY(topStrip(17, 600, 10, 7), 10),
  'card-left.svg': leftStrip(23, 10, 600, 6),
  'card-right.svg': flipX(leftStrip(31, 10, 600, 6), 10),
}

for (const [name, svg] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, name), svg)
  console.log(`${name.padEnd(20)} ${svg.length} bytes`)
}
