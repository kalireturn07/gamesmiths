import { createContext, useContext } from 'react'

/*
 * Every <Section> tells its children which surface they sit on: paper
 * ("cream") or the dark wall ("dark"). Headings, cards, doodles and badges
 * read this and pick colours that pass WCAG AA on that surface, so nobody
 * has to remember the pairings. Check them with `npm run check:contrast`.
 */
export const TONES = {
  dark: {
    heading: 'text-cream',
    body: 'text-muted-cream',
    kicker: 'text-ember',
    doodle: 'text-cream',
    panel: 'bg-dark-panel',
    badge: 'red',
    ring: 'tone-dark',
  },
  cream: {
    heading: 'text-ink',
    body: 'text-muted',
    kicker: 'text-red-bright',
    doodle: 'text-ink',
    panel: 'bg-paper-light',
    badge: 'dark',
    ring: 'tone-cream',
  },
}

export const SectionContext = createContext({ id: null, tone: 'dark' })

export function useSection() {
  return useContext(SectionContext)
}

export function useTone() {
  return TONES[useContext(SectionContext).tone]
}
