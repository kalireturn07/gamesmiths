import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

// Deterministic "random" numbers, so the server and browser agree.
function seeded(i, salt) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x) // 0..1
}

/**
 * "Text scroll animation": letters start scattered, tilted and faded, and
 * fly into place as the text scrolls up the screen.
 */
export default function ScrollLetters({ lines, className, lineClassName }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.6'] })
  let n = 0

  if (reduce) {
    return (
      <span className={cn('relative block', className)}>
        {lines.map((line, li) => (
          <span key={line} className={cn('block whitespace-nowrap', lineClassName?.[li])}>
            {line}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span ref={ref} className={cn('relative block', className)}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={line} className={cn('block whitespace-nowrap', lineClassName?.[li])}>
            {[...line].map((ch) => {
              const i = n++
              return (
                <Letter key={i} i={i} progress={scrollYProgress} reduce={reduce}>
                  {ch === ' ' ? ' ' : ch}
                </Letter>
              )
            })}
          </span>
        ))}
      </span>
    </span>
  )
}

function Letter({ i, progress, reduce, children }) {
  const range = [0.05 * seeded(i, 5), 0.75 + 0.25 * seeded(i, 6)]
  const x = useTransform(progress, range, [(seeded(i, 1) - 0.5) * 260, 0])
  const y = useTransform(progress, range, [(seeded(i, 2) - 0.5) * 220, 0])
  const rotate = useTransform(progress, range, [(seeded(i, 3) - 0.5) * 120, 0])
  const scale = useTransform(progress, range, [0.4 + seeded(i, 4), 1])
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <motion.span data-anim className="inline-block" style={reduce ? undefined : { x, y, rotate, scale, opacity }}>
      {children}
    </motion.span>
  )
}
