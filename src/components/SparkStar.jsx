import { cn } from '../lib/cn.js'

/** The club's four-point spark/rune glyph. Purely decorative. */
export default function SparkStar({ className }) {
  return (
    <svg viewBox="-10 -10 20 20" aria-hidden="true" focusable="false" className={cn('fill-current', className)}>
      <path d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10Z" />
    </svg>
  )
}

/** Four sparks tucked into the corners of a section, at low opacity. */
export function CornerSparks({ className }) {
  const base = 'pointer-events-none absolute size-5 text-red-bright/45 sm:size-7'
  return (
    <div aria-hidden="true" className={className}>
      <SparkStar className={cn(base, 'left-4 top-6 sm:left-8 sm:top-10')} />
      <SparkStar className={cn(base, 'right-4 top-6 size-3 sm:right-8 sm:top-10 sm:size-4')} />
      <SparkStar className={cn(base, 'bottom-6 left-4 size-3 sm:bottom-10 sm:left-8 sm:size-4')} />
      <SparkStar className={cn(base, 'bottom-6 right-4 sm:bottom-10 sm:right-8')} />
    </div>
  )
}

/** Thin rule with a spark in the middle, used between two dark sections. */
export function SparkDivider({ className }) {
  return (
    <div aria-hidden="true" className={cn('flex items-center gap-4 text-red-bright/70', className)}>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-cream/15" />
      <SparkStar className="size-4" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-cream/15" />
    </div>
  )
}
