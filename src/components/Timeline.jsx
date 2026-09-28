import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { PILLARS } from '../content/copy.js'
import { ACCENT_CYCLE, accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'
import { useSection } from '../lib/section.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'

/**
 * Roadmap timeline: a rainbow line that draws itself as you scroll, with a
 * node that pops up for each event. Vertical on phones, horizontal from
 * tablets up (3 per row on tablets, up to 6 per row on desktop). The event
 * marked `now` gets "You are here".
 */
export default function Timeline({ events, youAreHere, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const count = events.length
  return (
    <ol
      ref={ref}
      className={cn(
        'grid gap-7 md:grid-cols-[repeat(var(--cols-md),minmax(0,1fr))] md:gap-x-5 md:gap-y-12 xl:grid-cols-[repeat(var(--cols-xl),minmax(0,1fr))]',
        className,
      )}
      style={{ '--cols-md': Math.min(count, 3), '--cols-xl': Math.min(count, 6) }}
    >
      {events.map((event, i) => (
        <Stop key={`${event.week_or_date}-${event.title}`} event={event} i={i} count={count} progress={scrollYProgress} youAreHere={youAreHere} />
      ))}
    </ol>
  )
}

function Stop({ event, i, count, progress, youAreHere }) {
  const { tone } = useSection()
  const paper = tone === 'cream'
  const reduce = useReducedMotionSafe()
  const a = accent(ACCENT_CYCLE[i % ACCENT_CYCLE.length])
  const start = i / count
  const end = (i + 1) / count
  const line = useTransform(progress, [start, end], [0, 1])
  const pop = useTransform(progress, [Math.max(0, start - 0.04), start + 0.03], [0.3, 1])
  const fade = useTransform(progress, [Math.max(0, start - 0.04), start + 0.06], [0.25, 1])
  // No connector after the last node of a row (3 per row on tablets, 6 on desktop).
  const rowEndMd = (i + 1) % Math.min(count, 3) === 0
  const rowEndXl = (i + 1) % Math.min(count, 6) === 0

  return (
    <li aria-current={event.now ? 'step' : undefined} className="relative pl-12 md:pl-0 md:pt-14">
      {i < count - 1 && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-[13px] top-8 -bottom-7 w-1 overflow-hidden rounded-full md:left-8 md:-right-5 md:top-[13px] md:bottom-auto md:h-1 md:w-auto',
            paper ? 'bg-ink/10' : 'bg-cream/10',
            rowEndMd && 'md:hidden',
            rowEndMd && !rowEndXl && 'xl:block',
            !rowEndMd && rowEndXl && 'xl:hidden',
          )}
        >
          <motion.span
            data-anim
            className={cn(
              'absolute inset-0 origin-top rounded-full [transform:scaleY(var(--s))] md:origin-left md:[transform:scaleX(var(--s))]',
              a.bg,
            )}
            style={{ '--s': reduce ? 1 : line }}
          />
        </span>
      )}
      <motion.span
        data-anim
        aria-hidden="true"
        className={cn('absolute left-0 top-0 flex size-[30px] items-center justify-center rounded-full ring-4', a.bg, paper ? 'ring-cream' : 'ring-dark')}
        style={reduce ? undefined : { scale: pop }}
      >
        <span className="size-3 rounded-full bg-cream" />
      </motion.span>

      <motion.div data-anim style={reduce ? undefined : { opacity: fade }}>
        <p className={cn('font-ui text-xl font-bold leading-none', paper ? a.text : a.textOnDark)}>{event.week_or_date}</p>
        <h3 className={cn('mt-2 font-ui text-xl font-semibold leading-tight', paper ? 'text-ink' : 'text-cream')}>{event.title}</h3>
        <p className={cn('mt-1.5 text-[0.95rem] leading-snug', paper ? 'text-muted' : 'text-muted-cream')}>{event.description}</p>
        {event.pillars?.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tracks">
            {event.pillars.map((key) => {
              const pillar = PILLARS[key]
              if (!pillar) return null
              const Icon = pillar.icon
              return (
                <li
                  key={key}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
                    paper ? 'border-ink/15 bg-paper-light text-muted' : 'border-cream/15 bg-dark-panel text-muted-cream',
                  )}
                >
                  <Icon aria-hidden="true" focusable="false" className={paper ? accent(pillar.color).text : accent(pillar.color).textOnDark} />
                  {pillar.label}
                </li>
              )
            })}
          </ul>
        )}
        {event.now && (
          <p className={cn('mt-3 -rotate-3 font-hand text-2xl leading-none', paper ? 'text-red-bright' : 'text-ember')}>
            <span aria-hidden="true">↑ </span>
            {youAreHere}
          </p>
        )}
      </motion.div>
    </li>
  )
}
