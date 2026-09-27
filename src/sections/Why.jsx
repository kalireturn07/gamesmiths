import QuoteCard from '../components/QuoteCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StepList from '../components/StepList.jsx'
import { WHY } from '../content/copy.js'

export default function Why() {
  return (
    <Section id="about" tone="cream" containerClassName="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <Reveal>
        <SectionHeading kicker={WHY.kicker} title={WHY.title} intro={WHY.intro} />
        <StepList steps={WHY.items} className="mt-10" />
      </Reveal>
      <Reveal delay={150}>
        <QuoteCard icon={WHY.quote.icon} quote={WHY.quote.text} cite={WHY.quote.cite} />
      </Reveal>
    </Section>
  )
}
