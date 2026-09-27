/*
 * The accent colours used for the pillars, events and games.
 * `text` works on paper, `textOnDark` on the dark wall, `bg` + `on` is a
 * filled shape with its readable foreground, `btn` is a button variant.
 */
export const ACCENTS = {
  red: {
    text: 'text-red-bright',
    textOnDark: 'text-ember',
    bg: 'bg-red-bright',
    on: 'text-cream',
    btn: 'btn-red',
    hex: '#b23a2a',
  },
  blue: {
    text: 'text-blue',
    textOnDark: 'text-blue-light',
    bg: 'bg-blue',
    on: 'text-cream',
    btn: 'btn-blue',
    hex: '#2b52c4',
  },
  gold: {
    text: 'text-gold-deep',
    textOnDark: 'text-gold-light',
    bg: 'bg-gold',
    on: 'text-ink',
    btn: 'btn-gold',
    hex: '#e3a33b',
  },
  purple: {
    text: 'text-purple',
    textOnDark: 'text-purple-light',
    bg: 'bg-purple',
    on: 'text-cream',
    btn: 'btn-purple',
    hex: '#6437c8',
  },
  green: {
    text: 'text-green',
    textOnDark: 'text-green-light',
    bg: 'bg-green',
    on: 'text-cream',
    btn: 'btn-green',
    hex: '#23703f',
  },
}

export const ACCENT_CYCLE = ['red', 'gold', 'green', 'blue', 'purple']

export function accent(name) {
  return ACCENTS[name] ?? ACCENTS.red
}
