import { useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'
import { useScrollSteps } from '../../lib/useScrollProgress.js'

// Deterministic "random" numbers, so the server and browser agree.
function seeded(i, salt) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x) // 0..1
}

/**
 * "Text scroll animation": letters start scattered, tilted and faded, and
 * fly into place in a jumbled order as the text scrolls up the screen.
 */
export default function ScrollLetters({ lines, className, lineClassName }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const total = lines.join('').length
  useScrollSteps(ref, ['start 0.95', 'start 0.6'], !reduce)

  // The order letters land in: a fixed shuffle of their positions.
  const rank = Array.from({ length: total }, (_, i) => i)
    .sort((a, b) => seeded(a, 9) - seeded(b, 9))
    .reduce((acc, letter, order) => {
      acc[letter] = order
      return acc
    }, [])

  if (reduce) {
    return (
      <span ref={ref} className={cn('relative block', className)}>
        {lines.map((line, li) => (
          <span key={line} className={cn('block whitespace-nowrap', lineClassName?.[li])}>
            {line}
          </span>
        ))}
      </span>
    )
  }

  let n = 0
  return (
    <span ref={ref} className={cn('relative block', className)}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={line} className={cn('block whitespace-nowrap', lineClassName?.[li])}>
            {[...line].map((ch) => {
              const i = n++
              return (
                <span
                  key={i}
                  data-anim
                  data-step={rank[i]}
                  className="st-item st-letter is-off"
                  style={{
                    '--x': `${Math.round((seeded(i, 1) - 0.5) * 260)}px`,
                    '--y': `${Math.round((seeded(i, 2) - 0.5) * 220)}px`,
                    '--r': `${Math.round((seeded(i, 3) - 0.5) * 120)}deg`,
                    '--s': (0.4 + seeded(i, 4)).toFixed(2),
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </span>
  )
}
