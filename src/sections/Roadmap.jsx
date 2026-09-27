import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { SparkDivider } from '../components/SparkStar.jsx'
import Timeline from '../components/Timeline.jsx'
import { ROADMAP } from '../content/copy.js'
import { EVENTS } from '../content/events.js'

export default function Roadmap() {
  return (
    <Section id="events" tone="dark" className="pt-0 sm:pt-0 lg:pt-0">
      {/* House Rules is dark too, so a spark rule separates the two. */}
      <SparkDivider className="mb-20 sm:mb-24 lg:mb-28" />
      <Reveal>
        <SectionHeading kicker={ROADMAP.kicker} title={ROADMAP.title} intro={ROADMAP.intro} />
      </Reveal>
      <Timeline events={EVENTS} className="mt-14" />
    </Section>
  )
}
