import { cn } from '../lib/cn.js'
import { useSection, useTone } from '../lib/section.js'
import ScrambleText from './anim/ScrambleText.jsx'
import { DoodleArrowDown, ScribbleUnderline } from './Doodles.jsx'

/**
 * Kicker + brush-lettered h2 + optional handwritten note + intro.
 * `title` can be a string or JSX (e.g. a circled word).
 */
export default function SectionHeading({
  kicker,
  title,
  note,
  intro,
  align = 'left',
  underline = true,
  wide = false,
  className,
  children,
}) {
  const { id, tone } = useSection()
  const t = useTone()
  const center = align === 'center'
  return (
    <div className={cn(wide ? 'max-w-5xl' : 'max-w-3xl', center && 'mx-auto text-center', className)}>
      {kicker && (
        <p className={cn('kicker', t.kicker)}>
          <ScrambleText text={kicker} />
        </p>
      )}
      <div className={cn('mt-2 flex flex-wrap items-end gap-x-6 gap-y-1', center && 'justify-center')}>
        <h2
          id={id ? `${id}-title` : undefined}
          className={cn('text-balance font-marker text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.25rem]', t.heading)}
        >
          {title}
        </h2>
        {note && (
          <p
            className={cn(
              'flex -rotate-3 items-center gap-1 pb-1 font-hand text-2xl sm:text-[1.7rem]',
              tone === 'cream' ? 'text-ink' : 'text-cream',
            )}
          >
            {note}
            <DoodleArrowDown className="h-9 w-6" />
          </p>
        )}
      </div>
      {underline && (
        <ScribbleUnderline
          className={cn('mt-1 h-3.5 w-44 sm:w-60', tone === 'cream' ? 'text-red-bright' : 'text-ember', center && 'mx-auto')}
        />
      )}
      {intro && <p className={cn('mt-5 max-w-3xl text-lg leading-relaxed', t.body, center && 'mx-auto')}>{intro}</p>}
      {children}
    </div>
  )
}
