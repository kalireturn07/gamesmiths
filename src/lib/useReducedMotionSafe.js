import { useReducedMotion } from 'motion/react'
import { useHydrated } from './useHydrated.js'

/**
 * The user's reduced-motion preference, but only once hydration is done.
 * The server (and the first browser render) always assume motion is fine, so
 * the HTML matches; components then swap to their static version.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion()
  const hydrated = useHydrated()
  return hydrated && Boolean(reduce)
}
