import { motion, useScroll, useSpring } from 'motion/react'
import { cn } from '../../lib/cn.js'

/** Thin bar that fills as you scroll down the page. Decorative. */
export default function ScrollProgress({ className }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div aria-hidden="true" className={cn('origin-left', className)} style={{ scaleX }} />
}
