import { Fragment } from 'react'
import FlipWords from '../components/anim/FlipWords.jsx'
import ScrambleText from '../components/anim/ScrambleText.jsx'
import Container from '../components/Container.jsx'
import { DoodleCrown, DoodleCursor, DoodlePlane, DoodleSparkle, DoodleStar } from '../components/Doodles.jsx'
import HeroBoard from '../components/HeroBoard.jsx'
import StatsStrip from '../components/StatsStrip.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { HERO } from '../content/copy.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'

// The headline steps to the right, line by line, on desktop.
const INDENTS = ['', 'lg:ps-[0.32em]', 'lg:ps-[0.64em]']

// Per-letter tilt for the "slapped on" entrance (fixed, so SSR matches).
const tiltFor = (i) => `${((i * 37) % 29) - 14}deg`

export default function Hero() {
  let n = 0
  // Words stay unbreakable; the spaces between them sit outside so they don't collapse.
  const letters = (text) =>
    text.split(' ').map((word, w, words) => (
      <Fragment key={`${word}-${w}`}>
        <span className="inline-block whitespace-nowrap">
          {[...word].map((ch) => {
            const i = n++
            return (
              <span key={i} className="pop-letter" style={{ '--d': `${i * 32}ms`, '--r': tiltFor(i) }}>
                {ch}
              </span>
            )
          })}
        </span>
        {w < words.length - 1 && ' '}
      </Fragment>
    ))

  return (
    <SectionContext value={{ id: 'top', tone: 'cream' }}>
      <section
        id="top"
        aria-labelledby="top-title"
        className="sheet sheet-flat-top tone-cream relative isolate overflow-x-clip pb-24 pt-10 text-muted sm:pt-12"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-8">
          <div className="@container relative text-center lg:text-left">
            <DoodlePlane className="intro-rise absolute -top-2 right-[4%] hidden h-12 w-14 rotate-6 text-ink [--d:900ms] sm:block" />
            <DoodleSparkle className="intro-rise absolute right-[26%] top-[46%] hidden size-7 text-ink [--d:1100ms] lg:block" />

            <p className="kicker text-red-bright">
              <ScrambleText text={HERO.eyebrow} trigger="mount" delay={2100} duration={900} />
            </p>

            <h1
              id="top-title"
              className="relative mt-5 font-marker text-[clamp(2.5rem,13cqw,5.25rem)] uppercase leading-[0.92] text-ink lg:origin-left lg:-rotate-[4deg]"
            >
              <span className="sr-only">
                {HERO.headline.join(' ')} {HERO.headlineAccent}
              </span>
              <span aria-hidden="true">
                {HERO.headline.map((line, i) => (
                  <span key={line} className={cn('block', INDENTS[i])}>
                    {letters(line)}
                  </span>
                ))}
                <span className="relative block text-[1.3em] leading-[0.9] text-red-bright lg:ps-[1.35em]">
                  {letters(HERO.headlineAccent)}
                  <DoodleCrown className="intro-rise absolute -left-[0.1em] top-[0.05em] hidden h-[0.5em] w-[0.66em] -rotate-12 text-ink [--d:1300ms] lg:block" />
                  <DoodleStar className="intro-rise absolute -right-[0.05em] top-0 hidden size-[0.32em] text-ink [--d:1400ms] sm:block lg:left-[4.1em] lg:right-auto" />
                </span>
              </span>
            </h1>

            <p className="intro-rise mx-auto mt-8 max-w-md text-lg leading-snug text-ink [--d:900ms] lg:mx-0">
              <span className="sr-only">{HERO.srTagline}</span>
              <span aria-hidden="true">
                {HERO.taglineStart}{' '}
                <FlipWords words={HERO.flipWords} startDelay={2600} className="font-semibold text-red-bright" />
                <span className="mt-1 block font-hand text-[1.75rem] leading-none text-red-bright">{HERO.taglineAccent}</span>
              </span>
            </p>

            {/* No buttons: just a nudge to keep scrolling. */}
            <div aria-hidden="true" className="intro-rise mt-10 flex items-center justify-center gap-3 text-ink [--d:1200ms] lg:justify-start">
              <span className="flex h-11 w-7 justify-center rounded-full border-[2.5px] border-ink pt-2">
                <span className="scroll-dot block size-1.5 rounded-full bg-red-bright" />
              </span>
              <span className="font-hand text-2xl">{HERO.scrollHint}</span>
              <DoodleCursor className="hidden h-8 w-7 -rotate-12 lg:block" />
            </div>
          </div>

          <HeroBoard className="intro-rise [--d:400ms]" />
        </Container>

        <Container className="mt-14">
          <StatsStrip countDelay={2.3} className="intro-rise [--d:700ms]">
            <StickyNote
              color="yellow"
              tilt={8}
              aria-hidden="true"
              className="absolute -right-3 -top-12 hidden w-24 text-center text-base leading-tight lg:block"
            >
              {HERO.board.sticky[0]}
              <br />
              {HERO.board.sticky[1]}
            </StickyNote>
          </StatsStrip>
        </Container>
      </section>
    </SectionContext>
  )
}
