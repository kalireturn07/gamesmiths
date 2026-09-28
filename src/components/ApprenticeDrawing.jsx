import { motion, useTransform } from 'motion/react'

/*
 * "The forge apprentice": an original chibi character holding a giant
 * paintbrush, drawn in the same layers a digital artist would use. Each
 * layer is driven by a 0..1 motion value, so the drawing can build itself
 * as the page scrolls (see ArtProcess). Pass motion values set to 1 to show
 * it finished.
 */

// ---------- Layer 1: rough sketch (blue construction lines) ----------
const SKETCH = [
  'M162 60C210 62 230 100 226 136C222 176 192 196 158 194C120 192 92 166 94 128C96 90 122 58 164 62',
  'M158 56C208 58 232 98 228 134C224 174 196 198 156 196',
  'M161 64C164 110 163 160 160 190',
  'M98 144C140 150 180 150 224 142',
  'M90 140C80 96 104 48 160 44C220 46 246 96 234 146',
  'M104 120L118 104L128 120L142 98L154 118L166 96L180 120L192 100L204 124L214 108',
  'M124 84C124 70 152 70 152 84C152 98 124 98 124 84M168 84C168 70 196 70 196 84C196 98 168 98 168 84',
  'M160 196C158 230 156 260 160 292',
  'M120 212C140 204 180 204 200 212M128 292L192 292',
  'M122 214C104 232 98 254 104 268M198 212C220 214 232 200 240 194',
  'M140 292L142 330M178 292L176 330',
  'M218 244L276 96M270 100C268 84 280 66 296 58C296 80 288 96 278 104',
]

// ---------- Layer 2: line art ----------
const LINES = [
  'M104 182C90 176 82 162 84 148C72 100 96 44 160 40C224 44 248 100 236 148C238 162 230 176 216 182',
  'M160 58C205 58 226 92 226 130C226 168 198 192 160 192C122 192 94 168 94 130C94 92 115 58 160 58Z',
  'M96 126C94 86 118 58 160 56C202 58 226 86 224 126L212 108L204 124L192 100L180 120L166 96L154 118L142 98L130 120L120 104L108 124Z',
  'M98 94C130 76 190 76 222 94',
  'M123 84a15 15 0 1 0 30 0a15 15 0 1 0-30 0M167 84a15 15 0 1 0 30 0a15 15 0 1 0-30 0',
  'M125 146a11 14 0 1 0 22 0a11 14 0 1 0-22 0M173 146a11 14 0 1 0 22 0a11 14 0 1 0-22 0',
  'M148 168Q160 184 172 168Z',
  'M158 157l3 3',
  'M126 198C140 190 180 190 194 198C196 208 190 214 160 214C130 214 124 208 126 198Z',
  'M186 206C206 214 222 212 236 204C232 216 222 228 204 230C196 226 190 218 186 206Z',
  'M124 206C110 218 104 250 106 292H214C216 250 210 218 196 206',
  'M134 236H186L190 292H130Z',
  'M146 258h28v18h-28Z',
  'M118 214C100 226 92 250 100 266C104 274 114 272 116 266C110 252 114 236 124 226',
  'M97 268a9 9 0 1 0 18 0a9 9 0 1 0-18 0',
  'M132 292V322M154 292V322M166 292V322M188 292V322',
  'M124 322h34v16h-34ZM164 322h34v16h-34Z',
  'M226.7 241.8L272.7 119.8M217.3 238.2L263.3 116.2',
  'M263.3 116.2L272.7 119.8L278.3 104.8L268.9 101.2Z',
  'M268.9 101.2C262 88 272 66 294 56C296 78 290 94 278.3 104.8Z',
  'M198 212C214 214 226 206 232 196C238 190 248 194 244 202C238 214 222 228 204 232',
  'M230 196a10 10 0 1 0 20 0a10 10 0 1 0-20 0',
]

const SKIN = '#f2c9a0'
const HAIR = '#3a2a22'
const LEATHER = '#5a3a2a'

function DrawPath({ d, progress, range, className, strokeWidth = 3 }) {
  const pathLength = useTransform(progress, range, [0, 1])
  // Round caps would leave a dot where an undrawn stroke starts, so hide it until it begins.
  const opacity = useTransform(pathLength, (v) => (v > 0.002 ? 1 : 0))
  return (
    <motion.path
      data-anim
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ pathLength, opacity }}
    />
  )
}

/**
 * sketch / lines / flats / shade / final: MotionValues from 0 to 1.
 * sketchFade: opacity of the sketch layer (it's faded out as the line art goes on).
 */
export default function ApprenticeDrawing({ sketch, sketchFade, lines, flats, shade, final, className }) {
  const bgScale = useTransform(final, [0, 1], [0.4, 1])
  const shadeClip = useTransform(shade, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])

  return (
    <svg viewBox="0 0 320 380" aria-hidden="true" focusable="false" className={className}>
      {/* Background (final stage) */}
      <motion.g data-anim style={{ opacity: final }}>
        <motion.circle cx="160" cy="190" r="150" fill="#f5d76e" opacity="0.55" style={{ scale: bgScale }} />
        <ellipse cx="160" cy="342" rx="84" ry="10" fill="#2a211d" opacity="0.18" />
        {[
          [62, 92, 11, '#e06a52'],
          [262, 262, 9, '#2b52c4'],
          [54, 250, 7, '#a0550e'],
          [118, 26, 6, '#6437c8'],
        ].map(([x, y, r, fill]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`}
            fill={fill}
          />
        ))}
        <circle cx="302" cy="50" r="3.5" fill="#e06a52" />
        <circle cx="308" cy="66" r="2.2" fill="#e06a52" />
        <circle cx="288" cy="42" r="2" fill="#e06a52" />
      </motion.g>

      {/* Flat colours */}
      <motion.g data-anim style={{ opacity: flats }}>
        <path d="M104 182C90 176 82 162 84 148C72 100 96 44 160 40C224 44 248 100 236 148C238 162 230 176 216 182Z" fill={HAIR} />
        <path d="M148 186h24v20h-24Z" fill={SKIN} />
        <path d="M132 290h22v34h-22ZM166 290h22v34h-22Z" fill="#2a211d" />
        <path d="M124 322h34v16h-34ZM164 322h34v16h-34Z" fill={LEATHER} />
        <path d="M124 206C110 218 104 250 106 292H214C216 250 210 218 196 206C186 212 134 212 124 206Z" fill="#b23a2a" />
        <path d="M134 236H186L190 292H130Z" fill={LEATHER} />
        <path d="M146 258h28v18h-28Z" fill="none" stroke="#e3a33b" strokeWidth="2" />
        <path d="M118 214C100 226 92 250 100 266C104 274 114 272 116 266C110 252 114 236 124 226Z" fill="#b23a2a" />
        <circle cx="106" cy="268" r="9" fill={SKIN} />
        <path d="M126 198C140 190 180 190 194 198C196 208 190 214 160 214C130 214 124 208 126 198Z" fill="#e3a33b" />
        <path d="M186 206C206 214 222 212 236 204C232 216 222 228 204 230C196 226 190 218 186 206Z" fill="#e3a33b" />
        <path d="M160 58C205 58 226 92 226 130C226 168 198 192 160 192C122 192 94 168 94 130C94 92 115 58 160 58Z" fill={SKIN} />
        <path d="M96 126C94 86 118 58 160 56C202 58 226 86 224 126L212 108L204 124L192 100L180 120L166 96L154 118L142 98L130 120L120 104L108 124Z" fill={HAIR} />
        <path d="M98 94C130 76 190 76 222 94" fill="none" stroke={LEATHER} strokeWidth="8" strokeLinecap="round" />
        <circle cx="138" cy="84" r="15" fill="#86a8ff" stroke="#e3a33b" strokeWidth="5" />
        <circle cx="182" cy="84" r="15" fill="#86a8ff" stroke="#e3a33b" strokeWidth="5" />
        <ellipse cx="136" cy="146" rx="11" ry="14" fill="#2a211d" />
        <ellipse cx="184" cy="146" rx="11" ry="14" fill="#2a211d" />
        <path d="M148 168Q160 184 172 168Z" fill="#8b2e22" />
        <ellipse cx="116" cy="166" rx="9" ry="5" fill="#e8a0a0" opacity="0.8" />
        <ellipse cx="204" cy="166" rx="9" ry="5" fill="#e8a0a0" opacity="0.8" />
        <path d="M222 240L268 118" stroke="#a0550e" strokeWidth="10" strokeLinecap="round" />
        <path d="M263.3 116.2L272.7 119.8L278.3 104.8L268.9 101.2Z" fill="#c9beb0" />
        <path d="M268.9 101.2C262 88 272 66 294 56C296 78 290 94 278.3 104.8Z" fill="#faf6ee" />
        <path d="M294 56C293 70 289 80 284 88C279 80 282 66 294 56Z" fill="#e06a52" />
        <path d="M198 212C214 214 226 206 232 196C238 190 248 194 244 202C238 214 222 228 204 232Z" fill="#b23a2a" />
        <circle cx="240" cy="196" r="10" fill={SKIN} />
      </motion.g>

      {/* Shading + highlights, wiped on left to right */}
      <motion.g data-anim style={{ opacity: shade, clipPath: shadeClip }}>
        <g fill="#2a211d" opacity="0.22">
          <path d="M214 60C240 90 244 130 236 150C230 168 224 176 216 182L214 140C222 116 224 88 214 60Z" />
          <path d="M206 78C232 108 230 164 190 188C214 160 216 110 206 78Z" />
          <path d="M100 124L108 124L120 104L130 120L142 98L154 118L166 96L180 120L192 100L204 124L212 108L222 126C210 134 180 138 160 138C140 138 112 134 100 124Z" />
          <path d="M196 210C210 224 214 256 212 292H192C196 262 196 232 186 212Z" />
          <path d="M126 212C150 222 172 222 194 212V222C172 230 150 230 126 222Z" />
          <path d="M176 292h12v30h-12Z" />
          <path d="M204 230C214 228 226 222 236 204C232 216 222 228 204 230Z" />
        </g>
        <path d="M128 64C144 56 164 54 182 60" fill="none" stroke="#faf6ee" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
        <g fill="#faf6ee">
          <circle cx="132" cy="140" r="3.6" />
          <circle cx="140" cy="152" r="1.8" />
          <circle cx="180" cy="140" r="3.6" />
          <circle cx="188" cy="152" r="1.8" />
        </g>
        <path d="M130 78a9 9 0 0 1 8-4M174 78a9 9 0 0 1 8-4" fill="none" stroke="#faf6ee" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* Line art (ink), drawn stroke by stroke */}
      <g className="text-ink">
        {LINES.map((d, i) => {
          const start = (i / LINES.length) * 0.75
          return <DrawPath key={i} d={d} progress={lines} range={[start, start + 0.25]} />
        })}
      </g>

      {/* Rough sketch (blue pencil), on top and fading away */}
      <motion.g data-anim className="nojs-hide text-blue" style={{ opacity: sketchFade }}>
        {SKETCH.map((d, i) => {
          const start = (i / SKETCH.length) * 0.7
          return <DrawPath key={i} d={d} progress={sketch} range={[start, start + 0.3]} strokeWidth={1.6} className="opacity-60" />
        })}
      </motion.g>
    </svg>
  )
}
