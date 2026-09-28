import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

/**
 * Moves its children at a different speed from the page while they're on
 * screen. `speed` in px of drift each way (negative = moves up faster).
 */
export default function Parallax({ speed = 60, rotate = 0, className, style, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y, rotate: r }}>
      {children}
    </motion.div>
  )
}
