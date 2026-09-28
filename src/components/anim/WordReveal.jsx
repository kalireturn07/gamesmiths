import { Fragment, useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'
import { useScrollSteps } from '../../lib/useScrollProgress.js'

/**
 * "Text reveal": words go from faint to solid, one after another, as the
 * paragraph scrolls through the viewport, so the sentence reads itself out.
 * Only the colour changes (see .st-word), so no word needs its own layer.
 */
export default function WordReveal({ text, as: Tag = 'p', className, offset = ['start 0.85', 'end 0.5'] }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const words = text.split(' ')
  useScrollSteps(ref, offset, !reduce)

  if (reduce) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={cn('relative', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span data-step={i} className="st-word is-off">
              {word}
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
