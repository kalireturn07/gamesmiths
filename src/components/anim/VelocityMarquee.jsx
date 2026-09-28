import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe.js'

/**
 * An endless ticker that speeds up, and flips direction, with your scrolling.
 * The loop itself is a CSS animation (runs on the compositor); scrolling only
 * nudges its playback rate, and only while it's on screen. Decorative.
 * `speed` is % of its width per second; negative runs it the other way.
 */
export default function VelocityMarquee({ children, speed = 3, className }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const reduce = useReducedMotionSafe()
  const duration = 50 / Math.max(0.1, Math.abs(speed)) // seconds to move one copy's width
  const base = speed < 0 ? -1 : 1

  useEffect(() => {
    const root = rootRef.current
    const anim = trackRef.current?.getAnimations?.()[0]
    if (!root || !anim || reduce) return undefined
    // Start far into the loop: playing backwards (scrolling up) would otherwise
    // reach time 0 and stop.
    anim.currentTime = duration * 1000 * 500
    anim.playbackRate = base

    let direction = 1
    let lastY = window.scrollY
    let lastT = performance.now()
    let rate = base
    let settle = 0
    const setRate = (next) => {
      if (Math.abs(next - rate) < 0.05) return
      rate = next
      anim.updatePlaybackRate(next)
    }
    const onScroll = () => {
      const now = performance.now()
      const dy = window.scrollY - lastY
      const dt = Math.max(1, now - lastT)
      lastY = window.scrollY
      lastT = now
      if (dy !== 0) direction = dy > 0 ? 1 : -1
      const boost = Math.min(4, (Math.abs(dy) / dt) * 2.2) // px/ms → up to 5× speed
      setRate(base * direction * (1 + boost))
      clearTimeout(settle)
      settle = setTimeout(() => setRate(base * direction), 140)
    }
    let listening = false
    const observer = new IntersectionObserver(([entry]) => {
      const on = entry.isIntersecting
      if (on) anim.play()
      else anim.pause()
      if (on !== listening) {
        listening = on
        window[on ? 'addEventListener' : 'removeEventListener']('scroll', onScroll, { passive: true })
      }
    })
    observer.observe(root)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearTimeout(settle)
    }
  }, [reduce, base, duration])

  return (
    <div ref={rootRef} aria-hidden="true" className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <div ref={trackRef} className="marquee-track flex flex-nowrap" style={{ '--marquee-duration': `${duration}s` }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  )
}
