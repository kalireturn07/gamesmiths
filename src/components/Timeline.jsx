import { PILLARS } from '../content/copy.js'
import { ACCENT_CYCLE, accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'
import Reveal from './Reveal.jsx'

/**
 * Roadmap timeline on the dark wall: a rainbow line with a node per event.
 * Vertical on phones, horizontal from tablets up (3 per row on tablets, up
 * to 6 per row on desktop). The event marked `now` gets "You are here".
 *
 * events: [{ week_or_date, title, description, pillars?, now? }]
 */
export default function Timeline({ events, youAreHere, className }) {
  const count = events.length
  return (
    <ol
      className={cn(
        'grid gap-7 md:grid-cols-[repeat(var(--cols-md),minmax(0,1fr))] md:gap-x-5 md:gap-y-12 xl:grid-cols-[repeat(var(--cols-xl),minmax(0,1fr))]',
        className,
      )}
      style={{ '--cols-md': Math.min(count, 3), '--cols-xl': Math.min(count, 6) }}
    >
      {events.map((event, i) => {
        const a = accent(ACCENT_CYCLE[i % ACCENT_CYCLE.length])
        // No connector after the last node of a row (3 per row on tablets, 6 on desktop).
        const rowEndMd = (i + 1) % Math.min(count, 3) === 0
        const rowEndXl = (i + 1) % Math.min(count, 6) === 0
        return (
          <Reveal
            as="li"
            key={`${event.week_or_date}-${event.title}`}
            delay={Math.min(i, 5) * 80}
            aria-current={event.now ? 'step' : undefined}
            className="relative pl-12 md:pl-0 md:pt-14"
          >
            {/* line to the next node: vertical on phones, horizontal from md */}
            {i < count - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-[13px] top-8 -bottom-7 w-1 rounded-full md:left-8 md:-right-5 md:top-[13px] md:bottom-auto md:h-1 md:w-auto',
                  rowEndMd && 'md:hidden',
                  rowEndMd && !rowEndXl && 'xl:block',
                  !rowEndMd && rowEndXl && 'xl:hidden',
                  a.bg,
                )}
              />
            )}
            {/* node */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-0 top-0 flex size-[30px] items-center justify-center rounded-full ring-4 ring-dark',
                a.bg,
              )}
            >
              <span className="size-3 rounded-full bg-cream" />
            </span>

            <p className={cn('font-ui text-xl font-bold leading-none', a.textOnDark)}>{event.week_or_date}</p>
            <h3 className="mt-2 font-ui text-xl font-semibold leading-tight text-cream">{event.title}</h3>
            <p className="mt-1.5 text-[0.95rem] leading-snug text-muted-cream">{event.description}</p>
            {event.pillars?.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tracks">
                {event.pillars.map((key) => {
                  const pillar = PILLARS[key]
                  if (!pillar) return null
                  const Icon = pillar.icon
                  return (
                    <li
                      key={key}
                      className="inline-flex items-center gap-1 rounded-full border border-cream/15 bg-dark-panel px-2 py-0.5 text-xs font-medium text-muted-cream"
                    >
                      <Icon aria-hidden="true" focusable="false" className={accent(pillar.color).textOnDark} />
                      {pillar.label}
                    </li>
                  )
                })}
              </ul>
            )}
            {event.now && (
              <p className="mt-3 -rotate-3 font-hand text-2xl leading-none text-ember">
                <span aria-hidden="true">↑ </span>
                {youAreHere}
              </p>
            )}
          </Reveal>
        )
      })}
    </ol>
  )
}
