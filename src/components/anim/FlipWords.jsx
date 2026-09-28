import { AnimatePresence, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

/**
 * Cycles through `words`, flipping each one in with a blur. Decorative:
 * give screen readers the full sentence separately.
 */
export default function FlipWords({ words, interval = 2300, startDelay = 0, className }) {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotionSafe()
  const visible = useInView(ref)

  // Only flip while it's on screen.
  useEffect(() => {
    if (reduce || !visible) return undefined
    let id
    const timer = setTimeout(() => {
      id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    }, startDelay)
    return () => {
      clearTimeout(timer)
      clearInterval(id)
    }
  }, [reduce, visible, words.length, interval, startDelay])

  return (
    <span ref={ref} aria-hidden="true" className={cn('relative inline-block [perspective:600px]', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '55%', opacity: 0, rotateX: -80, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
          exit={{ y: '-55%', opacity: 0, rotateX: 80, filter: 'blur(8px)' }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="inline-block origin-bottom whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
