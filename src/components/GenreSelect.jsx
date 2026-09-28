import { useInView } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { LuPause, LuPlay } from 'react-icons/lu'
import { GENRE_STATS } from '../content/games.js'
import { cn } from '../lib/cn.js'
import { useHydrated } from '../lib/useHydrated.js'
import { usePauseOffscreen } from '../lib/usePauseOffscreen.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'

const COLUMNS = 5 // tiles per row, at every screen size (see .gs-grid)
const AUTO_MS = 2600

/**
 * "Select your genre": a game-style character-select screen. A cursor
 * roams the genre tiles on its own (attract mode) while it's on screen;
 * hovering, clicking or the arrow keys take over. The selected genre
 * slams into the preview with its own animated emblem (see "GENRE SELECT"
 * in index.css).
 *
 * Built as tabs for assistive tech: the tiles are the tabs, the preview is
 * the tab panel. The Pause button stops auto-play and every loop, and all
 * of it is off for reduced motion.
 */
export default function GenreSelect({ genres, labels }) {
  const rootRef = useRef(null)
  const tabRefs = useRef([])
  const id = useId()
  const reduce = useReducedMotionSafe()
  const hydrated = useHydrated() // the Pause button needs JavaScript
  const visible = useInView(rootRef, { amount: 0.35 })
  usePauseOffscreen(rootRef)

  const [selected, setSelected] = useState(0)
  const [playing, setPlaying] = useState(true) // the Pause/Play button: auto-play and loops
  const [auto, setAuto] = useState(true) // off once you pick a genre yourself
  const [hold, setHold] = useState(false) // pointer over it, or focus inside it

  useEffect(() => {
    if (!playing || !auto || hold || !visible || reduce) return undefined
    const timer = setInterval(() => setSelected((i) => (i + 1) % genres.length), AUTO_MS)
    return () => clearInterval(timer)
  }, [playing, auto, hold, visible, reduce, genres.length])

  const togglePlaying = () => {
    setPlaying((on) => !on)
    setAuto(true)
  }

  // Picking a genre yourself stops auto-play.
  const pick = (i) => {
    setAuto(false)
    setSelected(i)
  }

  // Arrow keys move from the tile that has focus (roving tabindex).
  const onKeyDown = (event, from) => {
    const moves = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: COLUMNS,
      ArrowUp: -COLUMNS,
    }
    let next
    if (event.key in moves) next = from + moves[event.key]
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = genres.length - 1
    else return
    event.preventDefault()
    next = Math.min(genres.length - 1, Math.max(0, next))
    pick(next)
    tabRefs.current[next]?.focus()
  }

  const genre = genres[selected]
  const tabId = (i) => `${id}-tab-${i}`
  const panelId = `${id}-panel`

  return (
    <div
      ref={rootRef}
      className={cn(
        'overflow-hidden rounded-xl border-2 border-cream/10 bg-[#161513] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]',
        !playing && 'is-paused',
      )}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHold(false)}
      // Focus on a tile or the preview holds auto-play; focus on the Play button doesn't.
      onFocus={(event) => setHold(!event.target.closest('[data-no-hold]'))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHold(false)
      }}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-cream/10 bg-dark-panel px-4 py-2.5">
        <span aria-hidden="true" className="font-ui text-sm font-bold tracking-widest text-ember">
          {labels.player}
        </span>
        <p className="font-ui text-sm font-bold uppercase tracking-[0.25em] text-cream">{labels.title}</p>
        {hydrated && !reduce && (
          <button
            type="button"
            data-no-hold
            onClick={togglePlaying}
            className="ml-auto flex items-center gap-1.5 rounded-md border border-cream/20 px-2 py-1 font-ui text-xs font-bold uppercase tracking-widest text-muted-cream transition-colors hover:border-cream/50 hover:text-cream"
          >
            {playing ? <LuPause aria-hidden="true" /> : <LuPlay aria-hidden="true" />}
            {playing ? labels.pause : labels.play}
            <span className="sr-only"> {labels.what}</span>
          </button>
        )}
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
        {/* the preview (tab panel) */}
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(selected)}
          // The panel has nothing focusable inside, so it takes focus itself.
          tabIndex={0}
          className="rounded-lg"
        >
          <Preview key={genre.name} genre={genre} index={selected} total={genres.length} />
        </div>

        {/* the tiles (tabs) */}
        <div role="tablist" aria-label={labels.title} className="gs-grid">
          <span
            aria-hidden="true"
            className="gs-cursor"
            style={{ '--col': selected % COLUMNS, '--row': Math.floor(selected / COLUMNS) }}
          >
            <span className="gs-cursor-tag">{labels.player}</span>
          </span>
          {genres.map((g, i) => {
            const Icon = g.icon
            const on = i === selected
            return (
              <button
                key={g.name}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={panelId}
                aria-label={g.name}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
                onPointerEnter={(event) => event.pointerType === 'mouse' && setSelected(i)}
                className={cn('gs-tile', on && 'is-on')}
                style={{ '--accent': g.accent }}
              >
                <Icon aria-hidden="true" focusable="false" className="relative size-[40%]" />
                <span aria-hidden="true" className="relative mt-1 font-ui text-[0.62rem] font-bold uppercase leading-none tracking-wider sm:text-xs">
                  {g.short}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * The selected genre: portrait with its animated emblem and the name beside
 * it, then the blurb and stats underneath. Every genre fills the same
 * height (the blurb always gets two lines), so nothing below it jumps.
 */
function Preview({ genre, index, total }) {
  const Icon = genre.icon
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-x-6 xl:grid-cols-[11.5rem_minmax(0,1fr)]">
      <div
        aria-hidden="true"
        className={`gs-portrait gs-a-${genre.anim} relative isolate aspect-square overflow-hidden rounded-lg border-2 border-cream/15`}
        style={{
          background: `radial-gradient(120% 100% at 70% 15%, ${genre.accent} 0%, color-mix(in oklab, ${genre.accent}, #000 55%) 55%, #110e0c 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgb(255_255_255/0.7)_1px,transparent_1.7px)] [background-size:7px_7px]" />
        <Icon className="absolute -bottom-[16%] -right-[18%] size-[85%] -rotate-12 text-black/30" />
        <span className="gs-fx" />
        <span className="gs-emblem">
          <Icon className="size-full" />
        </span>
        <span className="gs-fx2" />
        <span className="gs-slash" />
      </div>

      <div>
        <p className="gs-in font-ui text-sm font-bold tracking-widest text-ember">
          {String(index + 1).padStart(2, '0')} <span className="text-muted-cream">/ {total}</span>
        </p>
        <h3 className="gs-name mt-1 font-marker text-[1.6rem] leading-[1.05] text-cream sm:text-4xl">{genre.name}</h3>
        <p className="gs-in mt-2 font-ui text-sm font-semibold uppercase leading-tight tracking-wide text-muted-cream sm:text-base [--d:60ms]">
          {genre.meta}
        </p>
      </div>

      <div className="col-span-2">
        <p className="gs-in min-h-[2lh] text-[0.95rem] leading-snug text-muted-cream [--d:100ms]">{genre.blurb}</p>
        <dl className="mt-3 grid gap-1.5">
          {GENRE_STATS.map((stat, k) => (
            <div key={stat} className="flex items-center gap-3">
              <dt className="w-[4.5rem] font-ui text-xs font-bold uppercase tracking-widest text-muted-cream">{stat}</dt>
              <dd className="flex gap-1">
                <span className="sr-only">{genre.stats[k]} out of 5</span>
                {[0, 1, 2, 3, 4].map((p) => (
                  <span
                    key={p}
                    aria-hidden="true"
                    className={cn('gs-pip h-2.5 w-4 rounded-[2px]', p < genre.stats[k] ? 'is-on bg-gold' : 'bg-cream/15')}
                    style={{ '--k': k * 5 + p }}
                  />
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
