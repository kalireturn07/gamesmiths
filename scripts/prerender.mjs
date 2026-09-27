/*
 * Build step 3 of 3 (see "build" in package.json).
 * Renders the React app to static HTML and writes it into dist/index.html, so
 * the page shows up instantly and search engines / link previews can read it.
 * React then "hydrates" that HTML in the browser.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const indexPath = path.join(distDir, 'index.html')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let html = await fs.readFile(indexPath, 'utf8')
if (!html.includes('<!--app-html-->')) {
  throw new Error('dist/index.html has no <!--app-html--> placeholder. Did index.html change?')
}
html = html.replace('<!--app-html-->', render())

// Preload the Latin subsets of the two web fonts to avoid a late font swap.
const assets = await fs.readdir(path.join(distDir, 'assets'))
const fonts = assets.filter((file) => /^(cinzel|inter)-latin-wght-normal.*\.woff2$/.test(file))
const preloads = fonts
  .map((file) => `<link rel="preload" href="./assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')
html = html.replace('</head>', `  ${preloads}\n  </head>`)

await fs.writeFile(indexPath, html)
await fs.rm(ssrDir, { recursive: true, force: true })
console.log(`Prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB, ${fonts.length} font preloads)`)
