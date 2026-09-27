import Card from '../components/Card.jsx'
import IconBadge from '../components/IconBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { WHAT_WE_DO } from '../content/copy.js'

export default function WhatWeDo() {
  return (
    <Section id="pillars" tone="dark">
      <Reveal>
        <SectionHeading kicker={WHAT_WE_DO.kicker} title={WHAT_WE_DO.title} align="center" />
      </Reveal>
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHAT_WE_DO.cards.map((card, i) => (
          <Reveal as="li" key={card.title} delay={i * 90}>
            <Card className="h-full">
              <IconBadge icon={card.icon} size="lg" />
              <h3 className="mt-6 font-display text-2xl font-bold tracking-wide text-cream">{card.title}</h3>
              <p className="mt-3 leading-relaxed">{card.text}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
