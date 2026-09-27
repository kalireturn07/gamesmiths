import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView]. Flips to true the first time the element scrolls
 * into view (and stays true), which is what the reveal animations need.
 */
export function useInView({ rootMargin = '0px 0px -8% 0px', threshold = 0.12 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setInView(true)
                observer.disconnect()
              }
            },
            { rootMargin, threshold },
          )
        : null

    if (!observer) {
      // Very old browser: just show everything.
      queueMicrotask(() => setInView(true))
      return undefined
    }
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView]
}
