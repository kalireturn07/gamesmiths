import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/cinzel'
import '@fontsource/permanent-marker'
import '@fontsource/gochi-hand'
import '@fontsource/barlow-condensed/700.css'
import './styles/index.css'
import App from './App.jsx'
import { SIGNUP_FORM, SOCIAL_LINKS, isPlaceholder } from './content/links.js'

// Enables the scroll-reveal styles. Set here, not in index.html, so content
// can never get stuck hidden if the script fails to load.
document.documentElement.classList.add('js')

if (import.meta.env.DEV) {
  const todo = SOCIAL_LINKS.filter((link) => isPlaceholder(link.href)).map((link) => link.label)
  const endpoint = SIGNUP_FORM.provider === 'google-form' ? SIGNUP_FORM.googleFormEmbedUrl : SIGNUP_FORM.endpoint
  if (isPlaceholder(endpoint)) todo.push('Sign-up form')
  if (todo.length) console.warn(`[Gamesmiths] Still placeholders: ${todo.join(', ')}. See src/content/links.js.`)
}

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (see scripts/prerender.mjs), so hydrate it.
// The dev server serves an empty root, so render from scratch there.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
