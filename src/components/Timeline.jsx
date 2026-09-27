import { PILLARS } from '../content/copy.js'
import { cn } from '../lib/cn.js'
import Reveal from './Reveal.jsx'

/**
 * Events timeline: a vertical list on phones and a horizontal track from
 * tablet up. Handles any number of events. Up to 3 per row on tablets and
 * up to 6 per row on desktops, wrapping after that.
 *
 * events: [{ week_or_date, title, description, pillars? }]
 */
export default function Timeline({ events, className }) {
  const count = events.length
  return (
    <ol
      className={cn(
        'grid gap-6 md:grid-cols-[repeat(var(--cols-md),minmax(0,1fr))] md:gap-x-4 md:gap-y-10 xl:grid-cols-[repeat(var(--cols-xl),minmax(0,1fr))]',
        className,
      )}
      style={{ '--cols-md': Math.min(count, 3), '--cols-xl': Math.min(count, 6) }}
    >
      {events.map((event, i) => (
        <Reveal
          as="li"
          key={`${event.week_or_date}-${event.title}`}
          delay={Math.min(i, 5) * 70}
          className={cn(
            'relative flex flex-col pl-11 md:pl-0 md:pt-12',
            // Connector to the next node: vertical on phones, horizontal from md up.
            'before:absolute before:left-[11px] before:top-7 before:-bottom-6 before:w-0.5 before:bg-cream/15',
            'md:before:left-7 md:before:-right-4 md:before:top-[11px] md:before:bottom-auto md:before:h-0.5 md:before:w-auto',
            'last:before:hidden',
          )}
        >
          {/* Node on the line */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border-2 border-ember bg-dark"
          >
            <span className="size-2 rounded-full bg-ember" />
          </span>

          <p className="kicker text-ember">{event.week_or_date}</p>
          <div className="mt-3 flex-1 rounded-2xl border border-cream/5 bg-dark-panel p-5 shadow-card xl:p-4">
            <h3 className="font-display text-lg font-semibold leading-snug tracking-wide text-cream hyphens-auto break-words xl:text-base">{event.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-cream">{event.description}</p>
            {event.pillars?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tracks">
                {event.pillars.map((key) => {
                  const pillar = PILLARS[key]
                  if (!pillar) return null
                  const Icon = pillar.icon
                  return (
                    <li
                      key={key}
                      className="inline-flex items-center gap-1 rounded-full bg-dark px-2 py-0.5 text-xs font-medium text-muted-cream"
                    >
                      <Icon aria-hidden="true" focusable="false" className="text-ember" />
                      {pillar.label}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
