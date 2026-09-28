import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/cinzel'
import '@fontsource/permanent-marker'
import '@fontsource/gochi-hand'
import '@fontsource/barlow-condensed/700.css'
import './styles/index.css'
import App from './App.jsx'

// Enables the scroll-reveal styles. Set here, not in index.html, so content
// can never get stuck hidden if the script fails to load.
document.documentElement.classList.add('js')

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// After the first full layout (with the final fonts), let the browser skip
// rendering off-screen sections (see "OFF-SCREEN SECTIONS" in index.css).
const whenFontsReady = document.fonts?.ready ?? Promise.resolve()
whenFontsReady.then(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.documentElement.classList.add('cv-ready'))
  })
})

// Production HTML is prerendered (see scripts/prerender.mjs), so hydrate it.
// The dev server serves an empty root, so render from scratch there.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
