import { Fragment } from 'react'
import Card from '../components/Card.jsx'
import IconBadge from '../components/IconBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { TOURNAMENTS } from '../content/copy.js'
import { SectionContext, useSection } from '../lib/section.js'

export default function Tournaments() {
  return (
    <Section id="play" tone="cream">
      <Reveal>
        <SectionHeading kicker={TOURNAMENTS.kicker} title={TOURNAMENTS.title} intro={TOURNAMENTS.intro} />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <ul aria-label="Games we run" className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
          {TOURNAMENTS.games.map((game, i) => (
            <Reveal as="li" key={game.name} delay={i * 60}>
              <Card className="flex h-full items-center gap-4 p-4 sm:p-5">
                <IconBadge icon={game.icon} />
                <span className="font-display text-lg font-semibold leading-snug tracking-wide text-ink">{game.name}</span>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <FormatCallout />
        </Reveal>
      </div>
    </Section>
  )
}

function FormatCallout() {
  const section = useSection()
  const { title, icon, stages } = TOURNAMENTS.format
  return (
    <SectionContext value={{ ...section, tone: 'red' }}>
      <Card className="flex h-full flex-col justify-center p-7 sm:p-8">
        <IconBadge icon={icon} size="lg" />
        <h3 className="mt-6 font-display text-2xl font-bold tracking-wide text-cream">{title}</h3>
        <p className="mt-3 text-lg font-medium leading-relaxed text-cream">
          {stages.map((stage, i) => (
            <Fragment key={stage}>
              {i > 0 && (
                <>
                  {' '}
                  <span aria-hidden="true" className="font-bold">
                    →
                  </span>
                  <span className="sr-only">then</span>{' '}
                </>
              )}
              {stage}
            </Fragment>
          ))}
        </p>
      </Card>
    </SectionContext>
  )
}
