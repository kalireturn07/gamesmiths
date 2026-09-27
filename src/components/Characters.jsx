import { cn } from '../lib/cn.js'

/*
 * Original doodle characters (decorative, aria-hidden). They draw their
 * outlines in `currentColor`, so they work in ink on paper or chalk on the
 * dark wall.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/** "Probably a senior": headphones, glasses, hoodie, seen-it-all smirk. */
export function SeniorDoodle({ className }) {
  return (
    <svg viewBox="0 0 180 200" aria-hidden="true" focusable="false" className={cn('overflow-visible', className)}>
      <g {...stroke}>
        {/* hoodie */}
        <path
          d="M18 198c3-44 34-68 72-68s69 24 72 68"
          className="fill-ink"
        />
        <path d="M70 132c4 14 16 20 20 20s16-6 20-20" className="stroke-muted-cream" strokeWidth="2.4" />
        <path d="M80 150v22M100 150v22" className="stroke-muted-cream" strokeWidth="2.2" />
        {/* neck */}
        <path d="M78 116v16M102 116v16" />
        {/* head */}
        <path
          d="M90 24c35 0 47 27 45 56-2 31-22 45-45 45s-43-14-45-45c-2-29 10-56 45-56Z"
          className="fill-paper-light"
        />
        {/* hair */}
        <path d="M58 46c6-14 14-8 18 0 3-12 13-12 16-1 4-10 14-8 16 3 5-6 12-2 14 6" />
        {/* glasses */}
        <circle cx="75" cy="80" r="11.5" className="fill-paper-light" />
        <circle cx="105" cy="80" r="11.5" className="fill-paper-light" />
        <path d="M86.5 80h7M46 76l17 2M134 76l-17 2" />
        {/* tired eyes */}
        <path d="M70 81c3-2.6 7-2.6 10 0M100 81c3-2.6 7-2.6 10 0" strokeWidth="2.6" />
        <path d="M69 95c3 1.4 7 1.4 10 0M101 95c3 1.4 7 1.4 10 0" strokeWidth="1.8" />
        {/* smirk */}
        <path d="M80 106c7 4 15 3 22-3" />
        {/* headphones */}
        <path d="M44 88C38 18 142 18 136 88" strokeWidth="6" />
        <rect x="32" y="70" width="18" height="34" rx="7" className="fill-red-bright" />
        <rect x="130" y="70" width="18" height="34" rx="7" className="fill-red-bright" />
      </g>
    </svg>
  )
}

/** "From this…": a stick figure horizontal on the floor. */
export function StickLying({ className }) {
  return (
    <svg viewBox="0 0 170 80" aria-hidden="true" focusable="false" className={cn('overflow-visible', className)}>
      <g {...stroke}>
        <circle cx="26" cy="46" r="12" />
        <path d="M38 50c20 1 40 2 62 1" />
        <path d="M44 50 32 34l-14 2" />
        <path d="M62 51l8 14 10-1" />
        <path d="M100 51l30-9 22 5M100 51l28 7 24-2" />
        <path d="M20 44l3 2M29 44l3 2" strokeWidth="2" />
      </g>
      <g {...stroke} strokeWidth="2.4">
        <path d="M44 18h7l-7 8h7" />
        <path d="M56 6h9l-9 10h9" />
        <path d="M70-8h11L70 5h11" />
      </g>
    </svg>
  )
}

/** "…to this.": the same stick figure after a semester at the forge. */
export function StickBuff({ className }) {
  return (
    <svg viewBox="0 0 140 190" aria-hidden="true" focusable="false" className={cn('overflow-visible', className)}>
      <g {...stroke}>
        {/* head + headphones */}
        <circle cx="70" cy="30" r="15" />
        <path d="M53 32C50 4 90 4 87 32" strokeWidth="5" />
        <rect x="47" y="24" width="9" height="16" rx="4" className="fill-red-bright" />
        <rect x="84" y="24" width="9" height="16" rx="4" className="fill-red-bright" />
        <path d="M64 36c4 3 8 3 12 0" strokeWidth="2.4" />
        {/* torso */}
        <path d="M70 45v6M30 58c26-9 54-9 80 0l-16 60c-16 6-32 6-48 0Z" />
        <path d="M47 72c8 8 16 8 23 0 7 8 15 8 23 0" strokeWidth="2.4" />
        <path d="M59 106h22M61 114h18" strokeWidth="2.2" />
        {/* flexing arms */}
        <path d="M31 59c-20 6-26-8-20-24 4-8 12-10 14-4" />
        <path d="M15 42c6 4 12 3 16-2" strokeWidth="2.2" />
        <circle cx="22" cy="27" r="6.5" />
        <path d="M109 59c20 6 26-8 20-24-4-8-12-10-14-4" />
        <path d="M125 42c-6 4-12 3-16-2" strokeWidth="2.2" />
        <circle cx="118" cy="27" r="6.5" />
        {/* legs */}
        <path d="M58 120l-8 58h-12M84 120l8 58h12" />
      </g>
      {/* controller on the chest */}
      <g transform="translate(55 81) scale(.36)">
        <path
          d="M18 9C7 9 3 24 4 36c1 13 12 17 18 9l6-8.6h28l6 8.6c6 8 17 4 18-9 1-12-3-27-14-27-6 0-9 3.5-14 3.5H32C27 12.5 24 9 18 9Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
