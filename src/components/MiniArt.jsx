import { PixelRects } from './PixelSprite.jsx'

/*
 * Small original artworks for the "What our artists make" gallery, one per
 * kind of art. All decorative: the card's title and text describe them.
 */

function CharacterTurnaround() {
  // front · three-quarter · back, the classic character-sheet row
  const figure = (x, flip, back) => (
    <g transform={`translate(${x} 0) scale(${flip ? -1 : 1} 1)`}>
      <path d="M-22 150c2-26 10-40 22-40s20 14 22 40Z" fill="#b23a2a" stroke="#2a211d" strokeWidth="2.5" />
      <path d="M-14 118c8 6 20 6 28 0v8c-8 5-20 5-28 0Z" fill="#e3a33b" stroke="#2a211d" strokeWidth="2" />
      <circle cy="84" r="26" fill={back ? '#3a2a22' : '#f2c9a0'} stroke="#2a211d" strokeWidth="2.5" />
      <path d="M-27 82c-2-22 10-34 27-34s29 12 27 34l-7-10-5 9-6-12-6 11-7-12-5 10Z" fill="#3a2a22" stroke="#2a211d" strokeWidth="2.5" strokeLinejoin="round" />
      {!back && (
        <>
          <ellipse cx="-9" cy="90" rx="3.5" ry="5" fill="#2a211d" />
          <ellipse cx="9" cy="90" rx="3.5" ry="5" fill="#2a211d" />
          <path d="M-5 101q5 5 10 0" fill="none" stroke="#2a211d" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      <path d="M-12 150v14M12 150v14" stroke="#2a211d" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <rect width="240" height="180" fill="#faf6ee" />
      <path d="M10 168H230" stroke="#6b5f56" strokeWidth="1" strokeDasharray="4 4" />
      {figure(48, false, false)}
      {figure(120, true, false)}
      {figure(192, false, true)}
      <g fontFamily="Barlow Condensed, sans-serif" fontSize="11" fontWeight="700" fill="#6b5f56" textAnchor="middle" letterSpacing="1.5">
        <text x="48" y="24">FRONT</text>
        <text x="120" y="24">3/4</text>
        <text x="192" y="24">BACK</text>
      </g>
    </svg>
  )
}

function ConceptArt() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <defs>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b1f4d" />
          <stop offset="0.6" stopColor="#8b3a52" />
          <stop offset="1" stopColor="#e3a33b" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#dusk)" />
      <circle cx="176" cy="52" r="20" fill="#f5d76e" opacity="0.9" />
      <path d="M0 120L40 78 70 104 110 60 150 100 190 70 240 110V180H0Z" fill="#4a2f5e" />
      <path d="M0 140L50 112 90 130 140 104 190 128 240 118V180H0Z" fill="#2b1f3a" />
      {/* castle */}
      <path d="M92 132V96h8v-8h6v8h8V80l7-10 7 10v16h8v-8h6v8h8v36Z" fill="#1c1b19" />
      <rect x="116" y="100" width="4" height="6" fill="#f5d76e" />
      <rect x="132" y="104" width="4" height="6" fill="#f5d76e" />
      <path d="M0 160c40-10 80-6 120 0s80 6 120-4V180H0Z" fill="#1c1b19" />
      {/* loose brush marks, it's concept art after all */}
      <path d="M20 40c20-6 40-4 58 2M30 52c14-4 30-3 42 1" stroke="#f2ece1" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
    </svg>
  )
}

function PixelArt() {
  const tiles = Array.from({ length: 10 }, (_, i) => i)
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" shapeRendering="crispEdges">
      <defs>
        <pattern id="checker" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#e7decd" />
          <rect width="8" height="8" fill="#f2ece1" />
          <rect x="8" y="8" width="8" height="8" fill="#f2ece1" />
        </pattern>
      </defs>
      <rect width="240" height="180" fill="url(#checker)" />
      {tiles.map((i) => (
        <g key={i} transform={`translate(${i * 24} 144)`}>
          <rect width="24" height="36" fill="#6b4a2f" />
          <rect width="24" height="8" fill="#23703f" />
          <rect y="8" width="24" height="3" fill="#3f8f5f" />
          <rect x="6" y="18" width="4" height="4" fill="#5a3a2a" />
          <rect x="15" y="26" width="4" height="4" fill="#5a3a2a" />
        </g>
      ))}
      <rect x="150" y="72" width="16" height="16" fill="#e3a33b" />
      <rect x="154" y="76" width="8" height="8" fill="#f5d76e" />
      <PixelRects transform="translate(70 72) scale(6)" />
    </svg>
  )
}

function Poster() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <rect width="240" height="180" fill="#2a211d" />
      <g transform="rotate(-3 120 90)">
        <path d="M52 14h136l-2 6 3 5-2 6 2 7v112l-3 6 2 5-3 5H54l-3-6 2-5-2-6V33l2-6-2-6Z" fill="#b23a2a" />
        <text x="120" y="48" textAnchor="middle" fontFamily="Permanent Marker, cursive" fontSize="17" fill="#f2ece1">
          GAMESMITHS
        </text>
        <text x="120" y="72" textAnchor="middle" fontFamily="Permanent Marker, cursive" fontSize="24" fill="#f5d76e">
          CUP
        </text>
        <path d="M104 86h32v10c0 12-8 20-16 20s-16-8-16-20Z" fill="#e3a33b" />
        <path d="M104 90c-10 0-10 14 2 14M136 90c10 0 10 14-2 14" fill="none" stroke="#e3a33b" strokeWidth="4" />
        <path d="M116 116h8v10h-8ZM108 126h24v6h-24Z" fill="#e3a33b" />
        <text x="120" y="150" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="12" letterSpacing="2" fill="#f2ece1">
          INTER-COLLEGE · WEEK 14
        </text>
      </g>
      <rect x="96" y="6" width="48" height="14" fill="#ece0c4" opacity="0.8" transform="rotate(4 120 13)" />
    </svg>
  )
}

function GameUI() {
  const bar = (y, label, fill, width) => (
    <g transform={`translate(24 ${y})`}>
      <text y="-4" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.5" fill="#c9beb0">
        {label}
      </text>
      <rect width="120" height="12" rx="3" fill="#1c1b19" stroke="#6b5f56" strokeWidth="1.5" />
      <rect x="2" y="2" width={width} height="8" rx="2" fill={fill} />
    </g>
  )
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <rect width="240" height="180" fill="#252320" />
      {bar(34, 'HP', '#e06a52', 92)}
      {bar(64, 'MANA', '#86a8ff', 60)}
      {bar(94, 'XP', '#f0b54a', 104)}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={24 + i * 40} y="118" width="34" height="34" rx="5" fill="#1c1b19" stroke={i === 0 ? '#f0b54a' : '#6b5f56'} strokeWidth="2" />
      ))}
      <path d="M33 145l16-16m-4-2 6 6M36 138l4 4" stroke="#c9beb0" strokeWidth="3" strokeLinecap="round" />
      <path d="M81 129h8v4c5 2 8 6 8 10 0 6-5 9-12 9s-12-3-12-9c0-4 3-8 8-10Z" fill="#86a8ff" stroke="#c9beb0" strokeWidth="1.5" />
      <path d="M131 124l10 10-10 12-10-12Z" fill="#6ccb93" stroke="#c9beb0" strokeWidth="1.5" />
      <g transform="translate(166 40)">
        <rect width="54" height="22" rx="4" fill="#b23a2a" />
        <text x="27" y="15" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="11" letterSpacing="1" fill="#f2ece1">
          START
        </text>
        <rect y="32" width="54" height="22" rx="4" fill="#1c1b19" stroke="#6b5f56" strokeWidth="1.5" />
        <text x="27" y="47" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="11" letterSpacing="1" fill="#c9beb0">
          OPTIONS
        </text>
      </g>
    </svg>
  )
}

function StyleStudy() {
  const swatches = ['#1c1b19', '#b23a2a', '#e06a52', '#e3a33b', '#2b52c4', '#6437c8']
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <rect width="240" height="180" fill="#faf6ee" />
      <path d="M22 120C60 88 110 140 150 104s60-24 72-14" fill="none" stroke="#b23a2a" strokeWidth="18" strokeLinecap="round" opacity="0.85" />
      <path d="M26 132C64 104 112 150 152 118s56-22 68-14" fill="none" stroke="#e3a33b" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      {swatches.map((c, i) => (
        <g key={c}>
          <circle cx={30 + i * 36} cy="46" r="14" fill={c} stroke="#2a211d" strokeWidth="1.5" />
        </g>
      ))}
      <text x="120" y="164" textAnchor="middle" fontFamily="Gochi Hand, cursive" fontSize="15" fill="#2a211d">
        study #27 — warm light, cool shadows
      </text>
    </svg>
  )
}

const ARTS = {
  character: CharacterTurnaround,
  concept: ConceptArt,
  pixel: PixelArt,
  poster: Poster,
  ui: GameUI,
  palette: StyleStudy,
}

export default function MiniArt({ kind, className }) {
  const Art = ARTS[kind] ?? StyleStudy
  return (
    <div aria-hidden="true" className={className}>
      <Art />
    </div>
  )
}
