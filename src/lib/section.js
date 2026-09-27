import { createContext, useContext } from 'react'

/*
 * Every <Section> tells its children which surface they sit on, so cards,
 * headings and icon badges pick the right colours on their own. That means
 * nobody has to remember "muted text on cream, muted-cream text on dark".
 *
 * Each pairing below passes WCAG AA; run `npm run check:contrast`.
 */
export const TONES = {
  dark: {
    surface: 'bg-dark',
    panel: 'bg-dark-panel border border-cream/5 shadow-card',
    panelHover: 'hover:shadow-card-lift hover:border-cream/10',
    heading: 'text-cream',
    body: 'text-muted-cream',
    kicker: 'text-ember',
    badge: 'red',
    ring: 'tone-dark',
  },
  cream: {
    surface: 'bg-cream',
    panel: 'bg-cream-panel border border-ink/5 shadow-card-cream',
    panelHover: 'hover:shadow-card-cream-lift hover:border-ink/10',
    heading: 'text-ink',
    body: 'text-muted',
    kicker: 'text-red',
    badge: 'dark',
    ring: 'tone-cream',
  },
  red: {
    surface: 'bg-red',
    panel: 'bg-red shadow-card-cream',
    panelHover: 'hover:shadow-card-cream-lift',
    heading: 'text-cream',
    body: 'text-cream',
    kicker: 'text-cream',
    badge: 'dark',
    ring: 'tone-red',
  },
}

export const SectionContext = createContext({ id: null, tone: 'dark' })

export function useSection() {
  return useContext(SectionContext)
}

export function useTone() {
  return TONES[useContext(SectionContext).tone]
}
