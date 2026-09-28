import ScrambleText from '../components/anim/ScrambleText.jsx'
import SlideInWords from '../components/anim/SlideInWords.jsx'
import WordReveal from '../components/anim/WordReveal.jsx'
import Container from '../components/Container.jsx'
import { DoodleController, DoodleSparkle, DoodleStar } from '../components/Doodles.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { FINALE } from '../content/copy.js'
import { CLUB } from '../content/site.js'
import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'

const WORD = 'GAMESMITHS'

/** The sign-off: a giant 3D wordmark that stands up as you scroll to it. */
export default function Finale() {
  return (
    <SectionContext value={{ id: 'finale', tone: 'cream' }}>
      <section
        id="finale"
        aria-labelledby="finale-title"
        className="sheet tone-cream relative isolate overflow-x-clip py-28 text-center text-muted sm:py-36"
      >
        <DoodleStar className="absolute left-[8%] top-24 size-8 text-ink" />
        <DoodleSparkle className="absolute right-[10%] top-32 size-9 text-red-bright" />
        <DoodleController className="absolute bottom-16 left-[6%] hidden h-24 w-36 -rotate-12 text-ink/25 md:block" />

        <Container>
          <p className="kicker text-red-bright">
            <ScrambleText text={FINALE.kicker} />
          </p>

          {/* 3D perspective text */}
          <div className="mt-6 [perspective:900px]">
            <h2
              id="finale-title"
              className="stand-up font-serif text-[clamp(2.6rem,12.5vw,11rem)] font-black leading-none tracking-[0.02em] text-ink [text-shadow:0_6px_0_rgb(178_58_42/0.9),0_14px_28px_rgb(0_0_0/0.18)]"
            >
              <span className="sr-only">{CLUB.name}</span>
              <span aria-hidden="true">{WORD}</span>
            </h2>
          </div>
          <p className="mt-4 font-ui text-lg font-bold uppercase tracking-[0.35em] text-muted sm:text-xl">{CLUB.subtitle}</p>

          <p className="mt-14 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 font-marker text-5xl leading-none sm:text-7xl">
            {FINALE.pillars.map((p) => (
              <SlideInWords key={p.text} text={p.text} className={cn('-rotate-3', accent(p.color).text)} />
            ))}
          </p>

          <WordReveal
            text={FINALE.tagline}
            offset={['start 0.95', 'end 0.7']}
            className="mx-auto mt-14 max-w-2xl font-hand text-3xl leading-snug text-ink sm:text-4xl"
          />
        </Container>

        <StickyNote
          color="yellow"
          tilt={7}
          aria-hidden="true"
          className="absolute bottom-14 right-[7%] hidden w-32 text-center text-xl leading-tight sm:block"
        >
          {FINALE.sticky[0]}
          <br />
          {FINALE.sticky[1]}
        </StickyNote>
      </section>
    </SectionContext>
  )
}
