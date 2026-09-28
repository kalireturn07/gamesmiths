import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

/**
 * "Horizontal text reveal": words slide in from the right with a skew as the
 * heading scrolls into view, landing one after another.
 */
export default function SlideInWords({ text, as: Tag = 'span', id, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 1', 'start 0.45'] })
  const words = text.split(' ')

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} id={id} className={cn('relative', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const start = Math.min(0.55, i * (0.55 / Math.max(1, words.length - 1)))
          return (
            <SlidingWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, start + 0.45]} reduce={reduce}>
              {word}
            </SlidingWord>
          )
        })}
      </span>
    </Tag>
  )
}

function SlidingWord({ progress, range, reduce, children }) {
  const x = useTransform(progress, range, ['60%', '0%'])
  const skewX = useTransform(progress, range, [-18, 0])
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <>
      <motion.span data-anim className="inline-block" style={reduce ? undefined : { x, skewX, opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}
