import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=<>/\\?!'

/**
 * Decoder-style text: letters scramble, then lock in left to right.
 * The final text is rendered on the server, so nothing is ever blank.
 *   trigger="view"  → runs once when scrolled into view
 *   trigger="mount" → runs every time the component mounts (use `key` to re-run)
 */
export default function ScrambleText({ text, as: Tag = 'span', trigger = 'view', duration = 800, delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotionSafe()
  const [display, setDisplay] = useState(text)
  const go = trigger === 'mount' || inView

  useEffect(() => {
    if (!go || reduce) return undefined
    let frame = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const progress = Math.min(1, (now - start) / duration)
      const locked = Math.floor(progress * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        out += i < locked || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setDisplay(out)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [go, reduce, text, duration, delay])

  return (
    <Tag ref={ref} className={cn('relative inline-block whitespace-nowrap', className)}>
      <span className="sr-only">{text}</span>
      {/* the invisible copy reserves the final width, so nothing jiggles */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {display}
      </span>
    </Tag>
  )
}
