import { LuArrowRight, LuCalendarDays } from 'react-icons/lu'
import { PILLARS, UPCOMING } from '../content/copy.js'
import { EVENTS } from '../content/events.js'
import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'
import CoverArt from './CoverArt.jsx'
import { DoodleSparkle, ScribbleUnderline } from './Doodles.jsx'
import StickyNote from './StickyNote.jsx'

/** The next few events, starting from the one marked `now` in events.js. */
function upcomingEvents() {
  const start = Math.max(0, EVENTS.findIndex((event) => event.now))
  return EVENTS.slice(start, start + UPCOMING.count)
}

export default function UpcomingPanel({ className }) {
  return (
    <SectionContext value={{ id: null, tone: 'dark' }}>
      <aside aria-labelledby="upcoming-title" className={cn('tone-dark paper-shadow relative', className)}>
        <div className="torn texture-dark h-full px-5 pb-6 pt-9 sm:px-7">
          <h2 id="upcoming-title" className="pr-16 font-marker text-[1.85rem] leading-tight text-cream sm:pr-0">
            {UPCOMING.title}
          </h2>
          <div className="flex items-center gap-3">
            <ScribbleUnderline className="h-3 w-52 text-cream/80" />
            <DoodleSparkle className="size-6 shrink-0 text-cream" />
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {upcomingEvents().map((event) => {
              const color = PILLARS[event.pillars?.[0]]?.color ?? 'red'
              return (
                <li
                  key={event.title}
                  className="group flex items-center gap-3 rounded-xl border border-cream/10 bg-dark/70 p-2.5 transition-colors hover:border-cream/30"
                >
                  <CoverArt
                    icon={event.icon}
                    accent={accent(color).hex}
                    image={event.image}
                    className="h-[4.5rem] w-20 shrink-0 rounded-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className={cn('font-ui text-lg font-semibold leading-tight', accent(color).textOnDark)}>
                      {event.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-muted-cream">
                      <LuCalendarDays aria-hidden="true" className="shrink-0" />
                      {event.week_or_date}
                    </p>
                  </div>
                  <a
                    href={event.register_url ?? '#join'}
                    className="btn btn-red btn-sm shrink-0 !px-3 text-[0.8rem]"
                  >
                    {UPCOMING.registerLabel}
                    <span className="sr-only"> for {event.title}</span>
                    <LuArrowRight aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href={UPCOMING.allLink.href}
            className="mt-5 inline-flex items-center gap-1.5 rounded font-hand text-xl text-ember hover:text-cream"
          >
            {UPCOMING.allLink.label}
            <LuArrowRight aria-hidden="true" />
          </a>
        </div>

        <StickyNote
          color="yellow"
          tilt={7}
          className="absolute -right-2 -top-12 w-24 text-center text-base leading-tight sm:-right-5"
          aria-hidden="true"
        >
          {UPCOMING.note[0]}
          <br />
          {UPCOMING.note[1]}
        </StickyNote>
      </aside>
    </SectionContext>
  )
}
