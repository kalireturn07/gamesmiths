import { LuArrowDown, LuArrowRight } from 'react-icons/lu'
import ButtonLink from '../components/ButtonLink.jsx'
import Container from '../components/Container.jsx'
import { CornerSparks } from '../components/SparkStar.jsx'
import { HERO, PILLARS } from '../content/copy.js'
import { CLUB, LOGO, logoSrc } from '../content/site.js'
import { SectionContext } from '../lib/section.js'

// Fixed positions (not random) so the prerendered HTML and the browser agree.
const SPARKS = [
  { left: '8%', dur: '7.5s', delay: '0s', drift: '30px' },
  { left: '17%', dur: '9s', delay: '2.4s', drift: '-20px' },
  { left: '26%', dur: '6.5s', delay: '4.1s', drift: '16px' },
  { left: '38%', dur: '8.2s', delay: '1.2s', drift: '-34px' },
  { left: '47%', dur: '7s', delay: '5.3s', drift: '22px' },
  { left: '56%', dur: '9.4s', delay: '0.6s', drift: '-12px' },
  { left: '64%', dur: '6.8s', delay: '3.2s', drift: '28px' },
  { left: '72%', dur: '8.6s', delay: '6.1s', drift: '-26px' },
  { left: '81%', dur: '7.3s', delay: '1.8s', drift: '18px' },
  { left: '90%', dur: '9.8s', delay: '4.6s', drift: '-30px' },
  { left: '33%', dur: '10.5s', delay: '7s', drift: '40px' },
  { left: '68%', dur: '10s', delay: '8.2s', drift: '-40px' },
]

export default function Hero() {
  return (
    <SectionContext value={{ id: 'top', tone: 'dark' }}>
      <section
        id="top"
        aria-labelledby="top-title"
        className="tone-dark relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-dark py-16 sm:py-20"
      >
        {/* Forge glow + sparks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-[radial-gradient(ellipse_at_50%_100%,rgb(139_46_34/0.45),rgb(139_46_34/0.12)_45%,transparent_70%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {SPARKS.map((spark) => (
            <span
              key={spark.left}
              className="spark"
              style={{ left: spark.left, '--dur': spark.dur, '--delay': spark.delay, '--drift': spark.drift }}
            />
          ))}
        </div>
        <CornerSparks />

        <Container className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="animate-rise min-w-0 text-center lg:text-left">
            <p className="kicker text-ember">{HERO.eyebrow}</p>
            <h1
              id="top-title"
              className="mt-4 font-display text-[clamp(2rem,10vw,3.75rem)] font-black uppercase leading-none tracking-[0.06em] text-cream lg:text-7xl"
            >
              {CLUB.name}
            </h1>
            <p className="mt-4 font-display text-lg font-semibold uppercase tracking-[0.28em] text-muted-cream sm:text-xl">
              {CLUB.subtitle}
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream sm:text-xl lg:mx-0">{HERO.tagline}</p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonLink href={HERO.primaryCta.href} icon={LuArrowRight} className="w-full sm:w-auto">
                {HERO.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={HERO.secondaryCta.href}
                variant="secondary"
                icon={LuArrowDown}
                className="w-full sm:w-auto"
              >
                {HERO.secondaryCta.label}
              </ButtonLink>
            </div>

            <ul
              aria-label="Our three pillars"
              className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              {Object.values(PILLARS).map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-dark-panel py-1.5 pl-1.5 pr-4 text-sm font-semibold text-cream"
                >
                  <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-red">
                    <Icon focusable="false" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-first flex justify-center lg:order-none lg:justify-end">
            <img
              src={logoSrc}
              alt={LOGO.alt}
              width="512"
              height="512"
              fetchPriority="high"
              className="animate-rise size-44 rounded-3xl shadow-forge ring-1 ring-cream/10 aspect-square sm:size-56 lg:h-auto lg:w-full lg:max-w-md"
            />
          </div>
        </Container>
      </section>
    </SectionContext>
  )
}
