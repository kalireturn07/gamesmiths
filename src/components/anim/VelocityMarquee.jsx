import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * An endless ticker that speeds up — and flips direction — with your scroll.
 * Decorative (aria-hidden). `speed` is % of its width per second.
 */
export default function VelocityMarquee({ children, speed = 3, className }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduce = useReducedMotionSafe()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return
    const b = boost.get()
    if (b < 0) direction.current = -1
    else if (b > 0) direction.current = 1
    let move = direction.current * speed * (delta / 1000)
    move += move * Math.abs(b)
    baseX.set(baseX.get() - move)
  })

  return (
    <div ref={ref} aria-hidden="true" className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="flex flex-nowrap" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  )
}
