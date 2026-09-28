import { useEffect } from 'react'

/**
 * Adds `is-offscreen` to the element while it's off screen, which pauses every
 * CSS animation inside it (see index.css). Looping decorations shouldn't keep
 * the browser busy when nobody can see them.
 */
export function usePauseOffscreen(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-offscreen', !entry.isIntersecting)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}
