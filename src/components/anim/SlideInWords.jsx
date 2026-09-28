import { Fragment, useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'
import { useScrollSteps } from '../../lib/useScrollProgress.js'

/**
 * "Horizontal text reveal": words slide in from the right with a skew, one
 * after another, as the heading scrolls into view (and back out if you
 * scroll up again).
 */
export default function SlideInWords({ text, as: Tag = 'span', id, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const words = text.split(' ')
  useScrollSteps(ref, ['start 1', 'start 0.55'], !reduce)

  if (reduce) {
    return (
      <Tag ref={ref} id={id} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} id={id} className={cn('relative', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span data-anim data-step={i} className="st-item st-slide is-off">
              {word}
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
