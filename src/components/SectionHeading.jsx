import { cn } from '../lib/cn.js'
import { useSection, useTone } from '../lib/section.js'

/** Kicker (eyebrow) + h2 title + optional intro paragraph. */
export default function SectionHeading({ kicker, title, intro, align = 'left', className }) {
  const { id } = useSection()
  const t = useTone()
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {kicker && <p className={cn('kicker', t.kicker)}>{kicker}</p>}
      <h2
        id={id ? `${id}-title` : undefined}
        className={cn('mt-3 font-display text-3xl font-bold leading-tight tracking-wide sm:text-4xl lg:text-[2.5rem]', t.heading)}
      >
        {title}
      </h2>
      {intro && <p className={cn('mt-5 text-lg leading-relaxed', t.body)}>{intro}</p>}
    </div>
  )
}
