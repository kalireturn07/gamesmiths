import { cn } from '../lib/cn.js'

/** The sword that stands in for the "I" in GAMESMITHS. */
function Sword({ className }) {
  return (
    <svg viewBox="0 0 20 70" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <circle cx="10" cy="4.5" r="3.5" />
      <rect x="8.2" y="7.5" width="3.6" height="10" rx="1.2" />
      <rect x="1" y="17" width="18" height="3.6" rx="1.8" />
      <path d="M7.4 21h5.2v39.5L10 69l-2.6-8.5Z" />
    </svg>
  )
}

/**
 * Text wordmark echoing the club logo: GAMESM(sword)THS in a forged serif,
 * with the club line underneath. Screen readers just hear the name.
 */
export default function Wordmark({ subtitle = 'BEC Digital Arts Club', className, size = 'md' }) {
  const big = size === 'lg'
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className="sr-only">Gamesmiths</span>
      <span
        aria-hidden="true"
        className={cn(
          'flex items-end font-serif font-black uppercase tracking-[0.04em]',
          big ? 'text-5xl sm:text-6xl' : 'text-[1.35rem]',
        )}
      >
        GAMESM
        <Sword className={cn('mx-[0.02em] w-[0.34em]', big ? 'mb-[-0.18em] h-[1.3em]' : 'mb-[-0.16em] h-[1.28em]')} />
        THS
      </span>
      {subtitle && (
        <span
          aria-hidden="true"
          className={cn(
            'font-ui font-semibold uppercase tracking-[0.28em] opacity-80',
            big ? 'mt-3 text-sm sm:text-base' : 'mt-1 text-[0.6rem]',
          )}
        >
          {subtitle}
        </span>
      )}
    </span>
  )
}
