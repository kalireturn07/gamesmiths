import { cn } from '../lib/cn.js'

/*
 * The hero's 3 a.m. desk, in ink line-art: an "EAT GAME REPEAT" mug, a
 * sticker-bombed laptop, a controller, a mana potion and a couple of
 * crumpled first drafts. Decorative only.
 */
export default function DeskScene({ className }) {
  const ink = {
    stroke: 'currentColor',
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  return (
    <svg viewBox="0 0 520 200" aria-hidden="true" focusable="false" className={cn('overflow-visible text-ink', className)}>
      {/* desk */}
      <path d="M2 171c130-3 330-3 516-1" {...ink} fill="none" />
      <path
        d="M24 184l12-9M70 186l12-10M150 185l12-10M232 186l12-10M318 185l12-10M404 186l12-10M478 184l12-9"
        {...ink}
        strokeWidth="2"
        fill="none"
        opacity=".45"
      />

      {/* crumpled first drafts */}
      <g {...ink} strokeWidth="2.4">
        <path d="M128 168c-9-1-14-8-10-15 3-7 13-9 19-4 7 5 5 15-2 18-2 1-5 1-7 1Z" className="fill-paper-light" />
        <path d="M123 157l6 3 4-5M127 163l5-2" fill="none" />
        <path d="M152 170c-6 0-10-5-8-10 2-5 9-7 13-3 4 3 3 10-1 12Z" className="fill-paper-light" />
        <path d="M148 163l4 1 3-3" fill="none" />
      </g>

      {/* mug */}
      <g {...ink}>
        <path d="M60 94c-6-10 6-14 0-26M78 92c-6-10 6-14 0-26" fill="none" strokeWidth="2.2" opacity=".7" />
        <path d="M104 118c20-2 22 30 1 32" fill="none" strokeWidth="5" />
        <path d="M40 108l3 56c0 5 4 7 9 7h40c5 0 9-2 9-7l3-56Z" className="fill-paper-light" />
        <path d="M40 108c10-8 54-8 64 0-10 7-54 7-64 0Z" className="fill-cream-panel" />
      </g>
      <g className="font-ui" fontWeight="700" fontSize="13" textAnchor="middle" fill="currentColor" letterSpacing=".5">
        <text x="72" y="132">EAT</text>
        <text x="72" y="146">GAME</text>
        <text x="72" y="160">REPEAT</text>
      </g>

      {/* laptop, seen from the back, covered in stickers */}
      <g {...ink}>
        <path d="M174 158h204l10 13H164Z" className="fill-muted" />
        <rect x="186" y="34" width="180" height="126" rx="9" className="fill-dark-panel" />
      </g>
      {/* sticker: the club spark */}
      <g transform="translate(228 76) rotate(-10)">
        <circle r="22" className="fill-paper-light" />
        <path d="M0-15Q1.6-1.6 15 0 1.6 1.6 0 15-1.6 1.6-15 0-1.6-1.6 0-15Z" className="fill-red-bright" />
      </g>
      {/* sticker: pixel invader */}
      <g transform="translate(296 58) rotate(8)">
        <rect x="-4" y="-4" width="52" height="40" rx="6" className="fill-green-light" />
        <g className="fill-dark">
          {[
            [8, 0], [32, 0], [12, 4], [28, 4], [8, 8], [12, 8], [16, 8], [20, 8], [24, 8], [28, 8], [32, 8],
            [4, 12], [8, 12], [16, 12], [20, 12], [24, 12], [32, 12], [36, 12], [0, 16], [4, 16], [8, 16],
            [12, 16], [16, 16], [20, 16], [24, 16], [28, 16], [32, 16], [36, 16], [40, 16], [0, 20], [8, 20],
            [32, 20], [40, 20], [12, 24], [28, 24],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x + 1} y={y + 2} width="4" height="4" />
          ))}
        </g>
      </g>
      {/* sticker: GG */}
      <g transform="translate(268 124) rotate(-6)">
        <rect x="-26" y="-15" width="52" height="30" rx="8" className="fill-gold" stroke="currentColor" strokeWidth="2.4" />
        <text y="7" textAnchor="middle" className="font-marker fill-ink" fontSize="19">
          GG
        </text>
      </g>
      {/* sticker: tiny sword */}
      <g transform="translate(336 118) rotate(28)" {...ink} strokeWidth="2.4">
        <path d="M0-24v34" className="stroke-cream" strokeWidth="5" />
        <path d="M-8 10h16M0 10v8" className="stroke-cream" />
        <circle cy="21" r="2.6" className="fill-cream stroke-cream" />
      </g>

      {/* controller */}
      <g transform="translate(386 128) rotate(-8)" {...ink}>
        <path
          d="M18 9C7 9 3 24 4 36c1 13 12 17 18 9l6-8.6h28l6 8.6c6 8 17 4 18-9 1-12-3-27-14-27-6 0-9 3.5-14 3.5H32C27 12.5 24 9 18 9Z"
          className="fill-cream-panel"
        />
        <path d="M21 19v12M15 25h12" fill="none" />
        <g fill="currentColor" stroke="none">
          <circle cx="61" cy="19" r="3" className="fill-red-bright" />
          <circle cx="67.5" cy="25" r="3" className="fill-blue" />
          <circle cx="61" cy="31" r="3" className="fill-green" />
          <circle cx="54.5" cy="25" r="3" className="fill-gold" />
        </g>
      </g>

      {/* mana potion */}
      <g {...ink}>
        <rect x="482" y="86" width="18" height="11" rx="3" className="fill-gold-deep" />
        <path d="M485 97h12v14c14 5 22 17 20 31-2 17-14 27-26 27s-24-10-26-27c-2-14 6-26 20-31Z" className="fill-paper-light" />
        <path
          d="M468 138c8-5 16 4 24 0s15-5 23 0c1 13-8 30-24 30s-25-15-23-30Z"
          className="fill-blue-light"
          strokeWidth="0"
        />
        <path d="M485 97h12v14c14 5 22 17 20 31-2 17-14 27-26 27s-24-10-26-27c-2-14 6-26 20-31Z" fill="none" />
      </g>
      <text x="491" y="156" textAnchor="middle" className="font-ui fill-ink" fontWeight="700" fontSize="11" letterSpacing="1">
        MANA
      </text>
    </svg>
  )
}
