import { Fragment } from 'react'
import SlideInWords from '../components/anim/SlideInWords.jsx'
import GameCarousel from '../components/GameCarousel.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Sticker from '../components/Sticker.jsx'
import { TOURNAMENTS } from '../content/copy.js'
import { GAMES } from '../content/games.js'

export default function Tournaments() {
  return (
    <Section id="play" tone="dark">
      <Reveal>
        <SectionHeading
          kicker={TOURNAMENTS.kicker}
          title={<SlideInWords text={TOURNAMENTS.title} />}
          note={TOURNAMENTS.note}
          intro={TOURNAMENTS.intro}
          wide
        />
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <GameCarousel games={GAMES} allLabel={TOURNAMENTS.filterAll} />
      </Reveal>

      <Reveal delay={150} className="mt-10">
        <FormatTicket />
      </Reveal>
    </Section>
  )
}

/** "The Format" as a red tournament ticket with punched notches. */
function FormatTicket() {
  const { title, icon, stages } = TOURNAMENTS.format
  return (
    <div className="paper-shadow mx-auto max-w-3xl -rotate-1">
      <div className="relative flex flex-col items-start gap-5 bg-red-bright px-8 py-7 text-cream [mask:radial-gradient(circle_at_0_50%,transparent_14px,#000_15px)_left/51%_100%_no-repeat,radial-gradient(circle_at_100%_50%,transparent_14px,#000_15px)_right/51%_100%_no-repeat] sm:flex-row sm:items-center sm:gap-7 sm:px-12">
        <Sticker icon={icon} color="gold" size="md" tilt={-8} />
        <div className="border-cream/40 sm:border-l-2 sm:border-dashed sm:pl-7">
          <h3 className="font-marker text-3xl leading-none">{title}</h3>
          <p className="mt-2 font-ui text-xl font-semibold leading-snug tracking-wide sm:text-2xl">
            {stages.map((stage, i) => (
              <Fragment key={stage}>
                {i > 0 && (
                  <>
                    {' '}
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">then</span>{' '}
                  </>
                )}
                {stage}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
