import { useEffect } from 'react'

const KEYWORDS = { start: 0, center: 0.5, end: 1 }

// 'start 0.85' → the element's top edge at 85% of the viewport height.
// 'end end'    → the element's bottom edge at the bottom of the viewport.
function parsePoint(point) {
  const [edge, at] = point.split(' ')
  return { edge: KEYWORDS[edge] ?? 0, at: KEYWORDS[at] ?? Number(at) }
}

/**
 * How far (0..1) `el` has scrolled between two points, e.g.
 * ['start 0.85', 'end 0.5'] = from "top edge at 85% of the viewport" to
 * "bottom edge at 50% of the viewport".
 */
export function scrollProgress(el, [from, to]) {
  const a = parsePoint(from)
  const b = parsePoint(to)
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const span = (b.edge - a.edge) * rect.height - (b.at - a.at) * vh
  const p = (a.at * vh - rect.top - a.edge * rect.height) / span
  return Math.min(1, Math.max(0, p))
}

/**
 * Calls `onProgress(p)` with the scroll progress of `el` between `points`,
 * at most once per frame, and only while `el` is on screen (plus once as it
 * leaves, to settle at 0 or 1). Returns a cleanup function.
 */
function trackScroll(el, points, onProgress) {
  let frame = 0
  let listening = false
  const update = () => {
    frame = 0
    onProgress(scrollProgress(el, points))
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  const listen = (yes) => {
    if (yes === listening) return
    listening = yes
    const method = yes ? 'addEventListener' : 'removeEventListener'
    window[method]('scroll', onScroll, { passive: true })
    window[method]('resize', onScroll)
  }
  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          listen(entry.isIntersecting)
          update()
        })
      : null
  if (observer) observer.observe(el)
  else listen(true)
  // A jump straight past the element (dragging the scrollbar, the End key)
  // never makes it "visible", so settle once whenever scrolling stops.
  const settle = () => {
    cancelAnimationFrame(frame)
    update()
  }
  window.addEventListener('scrollend', settle, { passive: true })
  update()
  return () => {
    observer?.disconnect()
    listen(false)
    window.removeEventListener('scrollend', settle)
    cancelAnimationFrame(frame)
  }
}

/**
 * Calls `onProgress(p)` with the scroll progress (0..1) of `ref` between the
 * two `offset` points. Nothing runs while you scroll past other parts of
 * the page.
 */
export function useScrollProgress(ref, offset, onProgress) {
  const range = offset.join('|')
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    return trackScroll(el, range.split('|'), onProgress)
  }, [ref, range, onProgress])
}

/**
 * Scroll-stepped reveals. As `ref` scrolls between the two `offset` points,
 * its `[data-step]` descendants switch on in step order (0, 1, 2…) by losing
 * their `is-off` class, and back off if you scroll up again. The movement
 * itself is a CSS transition.
 *
 * The classes are set directly rather than through React state, so a step
 * costs one class change instead of a re-render of every word or letter.
 * Render the steps with `is-off` to begin with.
 */
export function useScrollSteps(ref, offset, enabled = true) {
  const range = offset.join('|')
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return undefined
    const steps = [...el.querySelectorAll('[data-step]')].map((node) => [node, Number(node.dataset.step)])
    const count = steps.reduce((max, [, step]) => Math.max(max, step + 1), 0)
    let shown = -1
    return trackScroll(el, range.split('|'), (p) => {
      const on = Math.round(p * count)
      if (on === shown) return
      shown = on
      for (const [node, step] of steps) node.classList.toggle('is-off', step >= on)
    })
  }, [ref, range, enabled])
}
