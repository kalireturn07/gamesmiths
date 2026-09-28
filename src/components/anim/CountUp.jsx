import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

/**
 * Counts up to the number in `value` ("48h" counts to 48, keeps the "h")
 * when it scrolls into view. Non-numbers ("∞") are shown as they are.
 */
export default function CountUp({ value, delay = 0, className }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduce = useReducedMotionSafe()
  const count = useMotionValue(target ?? 0)
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`)

  // Start from zero once we're in the browser (the server renders the final number).
  useEffect(() => {
    if (target !== null && !reduce) count.set(0)
  }, [count, target, reduce])

  useEffect(() => {
    if (!inView || target === null || reduce) return undefined
    const controls = animate(count, target, { duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay })
    return () => controls.stop()
  }, [inView, target, reduce, count, delay])

  if (target === null) return <span className={className}>{value}</span>
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true">{rounded}</motion.span>
    </span>
  )
}
