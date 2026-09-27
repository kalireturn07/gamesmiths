import QuoteCard from '../components/QuoteCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StepList from '../components/StepList.jsx'
import { cn } from '../lib/cn.js'

/**
 * One learning track (Game Dev, Digital Arts): heading + 3 steps + quote card.
 * `mirrored` puts the quote card on the left on desktop.
 */
export default function Track({ track, tone, mirrored = false }) {
  return (
    <Section
      id={track.id}
      tone={tone}
      containerClassName={cn(
        'grid items-center gap-12 lg:gap-16',
        mirrored ? 'lg:grid-cols-[1fr_1.25fr]' : 'lg:grid-cols-[1.25fr_1fr]',
      )}
    >
      <Reveal>
        <SectionHeading kicker={track.kicker} title={track.title} intro={track.intro} />
        <StepList steps={track.steps} numbers="large" className="mt-10" />
      </Reveal>
      <Reveal delay={150} className={cn(mirrored && 'lg:order-first')}>
        <QuoteCard icon={track.quote.icon} quote={track.quote.text} cite={track.quote.cite} />
      </Reveal>
    </Section>
  )
}
