import { FaGamepad } from 'react-icons/fa6'
import { LuArrowDown, LuArrowRight } from 'react-icons/lu'
import ButtonLink from '../components/ButtonLink.jsx'
import Container from '../components/Container.jsx'
import { DoodleCrown, DoodleCursor, DoodlePlane, DoodleSparkle, DoodleStar } from '../components/Doodles.jsx'
import HeroBoard from '../components/HeroBoard.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import StickyNote from '../components/StickyNote.jsx'
import UpcomingPanel from '../components/UpcomingPanel.jsx'
import { HERO } from '../content/copy.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'

// The headline steps to the right, line by line, on desktop.
const INDENTS = ['', 'lg:ps-[0.32em]', 'lg:ps-[0.64em]']

export default function Hero() {
  return (
    <SectionContext value={{ id: 'top', tone: 'cream' }}>
      <section
        id="top"
        aria-labelledby="top-title"
        className="sheet sheet-flat-top tone-cream relative isolate overflow-x-clip pb-20 pt-10 text-muted sm:pt-12"
      >
        <Container className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-10">
          <div className="min-w-0">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-8">
              <Headline />
              <HeroBoard className="animate-rise [animation-delay:150ms]" />
            </div>

            <StatsStrip className="mt-12">
              <StickyNote
                color="yellow"
                tilt={8}
                aria-hidden="true"
                className="absolute -right-3 -top-14 hidden w-24 text-center text-base leading-tight xl:block"
              >
                {HERO.board.sticky[0]}
                <br />
                {HERO.board.sticky[1]}
              </StickyNote>
            </StatsStrip>
          </div>

          <UpcomingPanel className="animate-rise [animation-delay:300ms] xl:mt-2" />
        </Container>
      </section>
    </SectionContext>
  )
}

function Headline() {
  return (
    <div className="@container animate-rise relative text-center lg:text-left">
      <DoodlePlane className="absolute -top-2 right-[4%] hidden h-12 w-14 rotate-6 text-ink sm:block" />
      <DoodleSparkle className="absolute right-[26%] top-[46%] hidden size-7 text-ink lg:block" />

      <p className="kicker text-red-bright">{HERO.eyebrow}</p>

      <h1
        id="top-title"
        className="relative mt-5 font-marker text-[clamp(2.5rem,13cqw,5.25rem)] uppercase leading-[0.92] text-ink lg:origin-left lg:-rotate-[4deg]"
      >
        {HERO.headline.map((line, i) => (
          <span key={line} className={cn('block', INDENTS[i])}>
            {line}
          </span>
        ))}
        <span className="relative block text-[1.3em] leading-[0.9] text-red-bright lg:ps-[1.35em]">
          {HERO.headlineAccent}
          <DoodleCrown
            className="absolute -left-[0.1em] top-[0.05em] hidden h-[0.5em] w-[0.66em] -rotate-12 text-ink lg:block"
          />
          <DoodleStar className="absolute -right-[0.05em] top-0 hidden size-[0.32em] text-ink sm:block lg:right-auto lg:left-[4.1em]" />
        </span>
      </h1>

      <p className="mx-auto mt-8 max-w-md text-lg leading-snug text-ink lg:mx-0">
        {HERO.tagline}
        <span className="mt-1 block font-hand text-[1.75rem] leading-none text-red-bright">{HERO.taglineAccent}</span>
      </p>

      <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
        <ButtonLink href={HERO.primaryCta.href} iconLeft={FaGamepad} icon={LuArrowRight} className="w-full sm:w-auto">
          {HERO.primaryCta.label}
        </ButtonLink>
        <ButtonLink
          href={HERO.secondaryCta.href}
          variant="outline"
          icon={LuArrowDown}
          className="w-full sm:w-auto"
        >
          {HERO.secondaryCta.label}
        </ButtonLink>
        <DoodleCursor className="absolute -bottom-8 left-[58%] hidden h-9 w-8 -rotate-12 text-ink lg:block" />
      </div>
    </div>
  )
}
