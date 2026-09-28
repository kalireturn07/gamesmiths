import { cn } from '../../lib/cn.js'

/**
 * "Rolling text": on hover of the nearest `.group`, every letter rolls up
 * and a fresh copy rolls in, one after another. CSS only.
 */
export default function RollText({ text, className }) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="roll-text">
        {[...text].map((ch, i) => {
          const c = ch === ' ' ? ' ' : ch
          return (
            <span key={i} className="roll-char" style={{ '--i': i }}>
              <span>{c}</span>
              <span className="roll-copy">{c}</span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
