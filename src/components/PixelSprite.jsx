import { cn } from '../lib/cn.js'

// A tiny knight, 12 × 12 pixels. Each character is a palette key; "." is empty.
const KNIGHT = [
  '....1111....',
  '...122221...',
  '..12222221..',
  '..13343341..',
  '..12222221..',
  '...111111...',
  '..55566555..',
  '.5555665555.',
  '.7.555555.7.',
  '...555555...',
  '...88..88...',
  '...88..88...',
]

const PALETTE = {
  1: '#2a211d',
  2: '#c9beb0',
  3: '#1c1b19',
  4: '#e06a52',
  5: '#b23a2a',
  6: '#e3a33b',
  7: '#f2c9a0',
  8: '#2a211d',
}

/** The sprite's squares as an SVG group, for use inside another <svg>. */
export function PixelRects({ map = KNIGHT, palette = PALETTE, transform }) {
  return (
    <g transform={transform} shapeRendering="crispEdges">
      {map.flatMap((row, y) =>
        [...row].map((key, x) =>
          key === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={palette[key]} />,
        ),
      )}
    </g>
  )
}

/** Pixel-art sprite drawn with crisp SVG squares. Decorative. */
export default function PixelSprite({ map = KNIGHT, palette = PALETTE, className }) {
  return (
    <svg
      viewBox={`0 0 ${map[0].length} ${map.length}`}
      aria-hidden="true"
      focusable="false"
      className={cn('overflow-visible', className)}
    >
      <PixelRects map={map} palette={palette} />
    </svg>
  )
}
