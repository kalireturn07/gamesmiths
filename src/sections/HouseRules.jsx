import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { HOUSE_RULES } from '../content/copy.js'

const TILTS = [-2.5, 1.8, -1.2, 2.4]

export default function HouseRules() {
  const { kicker, callout, meme, rules } = HOUSE_RULES
  return (
    <Section id="rules" tone="dark">
      <h2 id="rules-title" className="kicker text-center text-ember">
        {kicker}
      </h2>

      {/* The Dark Souls death screen: a black band, and the words fade in slowly. */}
      <Reveal className="relative mx-[calc(50%-50vw)] mt-8 py-14 text-center sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-black/60 to-transparent"
        />
        <p className="died font-serif text-5xl font-bold text-ember sm:text-7xl lg:text-8xl">{callout.headline}</p>
        <p className="mt-6 px-4 font-hand text-2xl text-muted-cream sm:text-[1.7rem]">{callout.aside}</p>
        <p className="mt-2 px-4 font-marker text-2xl text-cream sm:text-3xl">{callout.respawn}</p>
      </Reveal>

      {/* The club meme, taped up like a printout */}
      <Reveal as="figure" spring from={{ y: '40px', r: '-4deg' }} className="relative mx-auto mt-14 max-w-3xl">
        <figcaption className="mb-7 text-center font-marker text-3xl text-cream sm:text-4xl">{meme.title}</figcaption>
        <div className="relative -rotate-1 rounded-md bg-paper-light p-2 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] sm:p-3">
          <span aria-hidden="true" className="tape -top-6 left-4 -rotate-6 sm:left-8" />
          <span aria-hidden="true" className="tape -top-6 right-4 rotate-6 sm:right-8" />
          <img
            src={meme.file}
            alt={meme.alt}
            width="992"
            height="446"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full rounded-sm"
          />
        </div>
      </Reveal>

      <ul className="stagger mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {rules.map((rule, i) => {
          const Icon = rule.icon
          return (
            <Reveal as="li" key={rule.text} delay={i * 120} spring from={{ y: '-70px', r: `${TILTS[i % TILTS.length] * 4}deg` }}>
              <StickyNote color={rule.note} tilt={TILTS[i % TILTS.length]} fix="pin" className="h-full px-6 pb-7 pt-8">
                <div className="flex items-center justify-between">
                  <span className="font-marker text-xl">Rule #{i + 1}</span>
                  <Icon aria-hidden="true" focusable="false" className="size-9" />
                </div>
                <p className="mt-3 text-[1.45rem] leading-[1.2]">{rule.text}</p>
              </StickyNote>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
