import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

/**
 * "Text reveal": each word goes from faint to solid as the paragraph scrolls
 * through the viewport, so the sentence reads itself out as you scroll.
 */
export default function WordReveal({ text, as: Tag = 'p', className, offset = ['start 0.85', 'end 0.5'] }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const words = text.split(' ')

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag ref={ref} className={cn('relative', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={reduce}>
            {word}
          </Word>
        ))}
      </span>
    </Tag>
  )
}

function Word({ progress, range, reduce, children }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <>
      <motion.span data-anim className="inline-block" style={reduce ? undefined : { opacity, y }}>
        {children}
      </motion.span>{' '}
    </>
  )
}
