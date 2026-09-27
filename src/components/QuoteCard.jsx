import { cn } from '../lib/cn.js'
import { SectionContext, useSection } from '../lib/section.js'
import IconBadge from './IconBadge.jsx'

/** Dark quote panel with an icon badge. Stays dark on cream sections too. */
export default function QuoteCard({ icon, quote, cite, className }) {
  const section = useSection()
  return (
    <SectionContext value={{ ...section, tone: 'dark' }}>
      <figure
        className={cn(
          'tone-dark relative overflow-hidden rounded-2xl border border-cream/5 bg-dark-panel p-8 shadow-card sm:p-10',
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-10 select-none font-display text-[11rem] leading-none text-cream/[0.04]"
        >
          &rdquo;
        </span>
        <IconBadge icon={icon} size="lg" />
        <blockquote className="mt-7 font-display text-2xl font-semibold leading-snug tracking-wide text-cream sm:text-[1.75rem]">
          <p>&ldquo;{quote}&rdquo;</p>
        </blockquote>
        {cite && <figcaption className="mt-5 text-sm italic text-muted-cream">— {cite}</figcaption>}
      </figure>
    </SectionContext>
  )
}
