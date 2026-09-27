import { cn } from '../lib/cn.js'
import { SectionContext, TONES } from '../lib/section.js'
import Container from './Container.jsx'

/**
 * A full-width page section. `tone` is "dark" or "cream" (alternate them
 * like a sandwich). The <SectionHeading> inside it gets the id
 * `${id}-title`, which labels the section for screen readers.
 */
export default function Section({ id, tone = 'cream', className, containerClassName, children }) {
  const t = TONES[tone]
  return (
    <SectionContext value={{ id, tone }}>
      <section
        id={id}
        aria-labelledby={id ? `${id}-title` : undefined}
        className={cn('relative isolate overflow-clip py-20 sm:py-24 lg:py-28', t.surface, t.body, t.ring, className)}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    </SectionContext>
  )
}
