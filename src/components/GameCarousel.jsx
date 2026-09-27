import { useCallback, useEffect, useRef, useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { cn } from '../lib/cn.js'
import CoverArt from './CoverArt.jsx'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * "Choose your poison": genre filter chips + a swipeable row of game cards
 * with previous/next buttons. Chips are built from the games' `genre`s.
 */
export default function GameCarousel({ games, allLabel = 'All' }) {
  const genres = [allLabel, ...new Set(games.map((game) => game.genre))]
  const [filter, setFilter] = useState(allLabel)
  const shown = filter === allLabel ? games : games.filter((game) => game.genre === filter)

  const trackRef = useRef(null)
  const [scroll, setScroll] = useState({ prev: false, next: false })

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScroll({ prev: el.scrollLeft > 4, next: el.scrollLeft < max - 4 })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined
    update()
    el.addEventListener('scroll', update, { passive: true })
    const observer = 'ResizeObserver' in window ? new ResizeObserver(update) : null
    observer?.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer?.disconnect()
    }
  }, [update])

  // Back to the start whenever the filter changes.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    update()
  }, [filter, update])

  const page = (direction) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const overflowing = scroll.prev || scroll.next

  return (
    <div>
      <div role="group" aria-label="Filter games by genre" className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            aria-pressed={filter === genre}
            onClick={() => setFilter(genre)}
            className={cn(
              'rounded-lg border px-4 py-2 font-ui text-base font-semibold tracking-wide transition-colors',
              filter === genre
                ? 'border-red-bright bg-red-bright text-cream shadow-[0_3px_0_0_rgb(0_0_0/0.35)]'
                : 'border-cream/20 bg-dark-panel text-cream hover:border-cream/50',
            )}
          >
            {genre}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {filter === allLabel ? `Showing all ${shown.length} games` : `Showing ${shown.length} ${filter} games`}
      </p>

      <div className="relative mt-7">
        <div
          ref={trackRef}
          role="region"
          aria-label="Games"
          // A scrollable region must be keyboard-focusable when it overflows,
          // so arrow keys can scroll it (WCAG 2.1.1).
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={overflowing ? 0 : -1}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-5 pt-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex gap-4">
            {shown.map((game) => (
              <li key={game.name} className="w-[13.5rem] shrink-0 snap-start sm:w-[14.5rem]">
                <article className="group relative overflow-hidden rounded-xl border-2 border-cream/10 bg-dark-panel shadow-paper transition duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:border-cream/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0">
                  <CoverArt icon={game.icon} accent={game.accent} image={game.cover} className="aspect-[4/3.6] w-full" />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-dark via-dark/90 to-transparent px-4 pb-3.5 pt-12">
                    <h3 className="font-ui text-[1.6rem] font-bold uppercase leading-none tracking-wide text-cream">
                      {game.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-cream">{game.meta}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {overflowing && (
          <>
            <CarouselButton side="left" disabled={!scroll.prev} onClick={() => page(-1)} />
            <CarouselButton side="right" disabled={!scroll.next} onClick={() => page(1)} />
          </>
        )}
      </div>
    </div>
  )
}

function CarouselButton({ side, disabled, onClick }) {
  const Icon = side === 'left' ? LuChevronLeft : LuChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === 'left' ? 'Previous games' : 'More games'}
      className={cn(
        'absolute top-[42%] z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-2xl text-ink shadow-paper transition hover:scale-110 disabled:pointer-events-none disabled:opacity-0 sm:flex',
        side === 'left' ? '-left-3 lg:-left-5' : '-right-3 lg:-right-5',
      )}
    >
      <Icon aria-hidden="true" />
    </button>
  )
}
