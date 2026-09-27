import { cn } from '../lib/cn.js'

/*
 * Hand-drawn doodles. They're all decorative (aria-hidden) and draw in
 * `currentColor`, so set a text colour on them: text-ink on paper,
 * text-cream on the dark wall, text-red-bright for accents.
 */

function Svg({ viewBox, className, children, strokeWidth = 2.6, style, preserveAspectRatio }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none overflow-visible', className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export function DoodleStar({ className, style, filled = false }) {
  return (
    <Svg viewBox="0 0 40 40" className={className} style={style}>
      <path
        d="M19 4.5 24.4 15.2 36.4 16 27.2 23.8 30.6 35.8 20.2 29 9.6 36.2 12.8 24 3.4 16.4 15.4 15.4 19.4 3.6"
        fill={filled ? 'currentColor' : 'none'}
      />
    </Svg>
  )
}

export function DoodleSparkle({ className }) {
  return (
    <Svg viewBox="0 0 40 40" className={className}>
      <path d="M20 5Q21.5 18 35 20 21.5 22 20 35 18.5 22 5 20 18.5 18 20 5Z" />
      <path d="M31 7l2.5-2.5M9 7 6.5 4.5M31 33l2.5 2.5" strokeWidth="2" />
    </Svg>
  )
}

export function DoodleCrown({ className }) {
  return (
    <Svg viewBox="0 0 64 48" className={className}>
      <path d="M8 38 5.5 13l13.8 12.6L31.6 6.8 44 25.4 58.6 12.2 55.6 38.4Z" />
      <path d="M7.5 43.5c16-1.6 32-1.8 48.6-.2" />
      <circle cx="5.5" cy="10" r="2.4" />
      <circle cx="31.8" cy="3.8" r="2.4" />
      <circle cx="58.8" cy="9.2" r="2.4" />
    </Svg>
  )
}

/** Curvy arrow pointing right. Rotate/flip it with classes as needed. */
export function DoodleArrow({ className }) {
  return (
    <Svg viewBox="0 0 84 40" className={className}>
      <path d="M4 30C18 8 46 3 74 17" />
      <path d="M62.5 8.5 75.5 17.6 62 24.8" />
    </Svg>
  )
}

export function DoodleArrowDown({ className }) {
  return (
    <Svg viewBox="0 0 32 48" className={className}>
      <path d="M16.5 4c-2.6 12-1.6 24 .4 38" />
      <path d="M7.5 32.5 17 43.5 25.5 31.5" />
    </Svg>
  )
}

export function DoodlePlane({ className }) {
  return (
    <Svg viewBox="0 0 64 52" className={className}>
      <path d="M4 22.5 59 4 43 47 29.6 31.4Z" />
      <path d="M29.6 31.4 59 4M29.6 31.4 28.4 43.5 36.4 36.8" />
      <path d="M2 48c5-3.4 9 1.8 14-1.6" strokeDasharray="3 4" strokeWidth="2" />
    </Svg>
  )
}

export function DoodleCursor({ className }) {
  return (
    <Svg viewBox="0 0 36 44" className={className}>
      <path d="M6 4.5 6.8 34l7.6-7.4 6.2 13.6 6-2.8-6-13.2 10.6-.6Z" />
    </Svg>
  )
}

/** A rough loop drawn around a word. Stretch it over the word's box. */
export function ScribbleCircle({ className }) {
  return (
    <Svg
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      className={cn('draw', className)}
      strokeWidth="3.2"
      style={{ '--len': 1400 }}
    >
      <path
        d="M168 13C118-1 32 3 12 30-4 55 58 76 122 71c56-4 78-27 67-45-8-14-38-18-62-15"
        vectorEffect="non-scaling-stroke"
      />
    </Svg>
  )
}

/** Brush-y double underline. */
export function ScribbleUnderline({ className }) {
  return (
    <Svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={cn('draw', className)}
      strokeWidth="4"
      style={{ '--len': 1400 }}
    >
      <path d="M4 15C70 7 170 5 296 9" vectorEffect="non-scaling-stroke" />
      <path d="M26 20c80-5 160-6 240-3" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
    </Svg>
  )
}

/** Hand-drawn checkbox. `checked` adds a tick in the accent colour. */
export function HandCheck({ className, checked = true, tickClassName = 'text-red-bright' }) {
  return (
    <Svg viewBox="0 0 30 30" className={className} strokeWidth="2.4">
      <path d="M4.5 7.2 22.6 5.6l.8 18.4-18.6.8Z" />
      {checked && <path d="M8.5 14.5l5.2 5.6L28 3" className={tickClassName} stroke="currentColor" strokeWidth="3.2" />}
    </Svg>
  )
}

export function DoodleController({ className, filled = false }) {
  return (
    <Svg viewBox="0 0 84 56" className={className}>
      <path
        d="M18 9C7 9 3 24 4 36c1 13 12 17 18 9l6-8.6h28l6 8.6c6 8 17 4 18-9 1-12-3-27-14-27-6 0-9 3.5-14 3.5H32C27 12.5 24 9 18 9Z"
        fill={filled ? 'currentColor' : 'none'}
      />
      <path d="M21 19v12M15 25h12" className={filled ? 'text-dark' : undefined} stroke="currentColor" />
      <g className={filled ? 'text-dark' : undefined} fill="currentColor" stroke="none">
        <circle cx="61" cy="19" r="2.8" />
        <circle cx="67.5" cy="25" r="2.8" />
        <circle cx="61" cy="31" r="2.8" />
        <circle cx="54.5" cy="25" r="2.8" />
      </g>
    </Svg>
  )
}

/** Little burst of motion lines, for "impact" moments. */
export function DoodleBurst({ className }) {
  return (
    <Svg viewBox="0 0 40 40" className={className} strokeWidth="2.4">
      <path d="M20 3v8M20 29v8M3 20h8M29 20h8M8 8l5 5M27 27l5 5M32 8l-5 5M13 27l-5 5" />
    </Svg>
  )
}

export function DoodleSwirl({ className, style }) {
  return (
    <Svg viewBox="0 0 40 40" className={className} style={style} strokeWidth="2.2">
      <path d="M21 20c0-2-3-2.6-4.4-.8-2 2.6.6 6.4 4 6.2 4.6-.4 6.8-5.8 4.4-9.6C22 11 14.6 11 11.6 16c-3.4 5.6.2 13.8 7.8 14.4 7 .6 12.8-4 13.8-11.6" />
    </Svg>
  )
}
