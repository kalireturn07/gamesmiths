import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * Thin bar that fills as you scroll down the page. Pure CSS where the browser
 * supports scroll-driven animations (see .scroll-progress in index.css);
 * elsewhere a tiny scroll listener sets --p. Decorative.
 */
export default function ScrollProgress({ className }) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.CSS?.supports?.('animation-timeline: scroll()')) return undefined
    const el = ref.current
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.setProperty('--p', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0')
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className={cn('scroll-progress', className)} />
}
