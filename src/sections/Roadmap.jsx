import { StickBuff, StickLying } from '../components/Characters.jsx'
import { DoodleArrow, DoodleBurst, DoodleStar } from '../components/Doodles.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Timeline from '../components/Timeline.jsx'
import { ROADMAP } from '../content/copy.js'
import { EVENTS } from '../content/events.js'

export default function Roadmap() {
  return (
    <Section id="events" tone="dark">
      <Reveal>
        <SectionHeading kicker={ROADMAP.kicker} title={ROADMAP.title} intro={ROADMAP.intro} />
      </Reveal>

      <Timeline events={EVENTS} youAreHere={ROADMAP.youAreHere} className="mt-14" />

      {/* Doodle corner: "Same servers. Bigger stories." + from this… to this. */}
      <Reveal
        aria-hidden="true"
        className="mt-20 flex flex-col items-center gap-28 text-cream lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        <p className="relative shrink-0 -rotate-6 text-center font-marker text-4xl leading-[1.05] text-ember sm:text-5xl lg:text-left">
          {ROADMAP.slogan[0]}
          <br />
          <span className="lg:pl-10">{ROADMAP.slogan[1]}</span>
          <DoodleBurst className="absolute -right-10 -top-6 size-9 text-cream" />
        </p>

        <div className="flex items-end gap-4 sm:gap-8">
          <div className="text-center">
            <p className="font-hand text-2xl">{ROADMAP.fromThis}</p>
            <StickLying className="mt-2 w-36 sm:w-44" />
          </div>
          <DoodleArrow className="mb-10 h-8 w-14 -rotate-12" />
          <div className="relative text-center">
            <p className="absolute -top-16 right-0 w-32 rotate-6 font-hand text-xl leading-tight">
              {ROADMAP.touchGrass[0]}
              <br />
              {ROADMAP.touchGrass[1]}
            </p>
            <p className="font-hand text-2xl">{ROADMAP.toThis}</p>
            <StickBuff className="mt-2 w-28 sm:w-32" />
            <DoodleStar className="absolute -left-4 top-10 size-6 text-ember" />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
