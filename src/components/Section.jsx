import { cn } from '../lib/cn.js'
import { SectionContext, TONES } from '../lib/section.js'
import Container from './Container.jsx'

/**
 * A full-width page section.
 *   tone="cream" → a torn paper sheet pinned to the wall
 *   tone="dark"  → the dark wall itself
 * Alternate them. `tear` ("a" or "b") picks a different torn edge so
 * neighbouring sheets don't look copy-pasted. The <SectionHeading> inside
 * gets the id `${id}-title`, which labels the section for screen readers.
 */
export default function Section({ id, tone = 'cream', tear = 'a', className, containerClassName, children }) {
  const t = TONES[tone]
  const paper = tone === 'cream'
  return (
    <SectionContext value={{ id, tone }}>
      <section
        id={id}
        aria-labelledby={id ? `${id}-title` : undefined}
        className={cn(
          'relative isolate overflow-x-clip',
          paper ? 'sheet py-24 sm:py-28' : 'py-20 sm:py-24',
          paper && tear === 'b' && 'sheet-b',
          t.body,
          t.ring,
          className,
        )}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    </SectionContext>
  )
}
