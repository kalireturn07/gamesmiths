import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * false on the server and during hydration, true afterwards. Lets a
 * component render its "finished" state in the prerendered HTML and switch
 * to an animated start state in the browser without a hydration mismatch.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
