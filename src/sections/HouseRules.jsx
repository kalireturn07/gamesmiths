import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { HOUSE_RULES } from '../content/copy.js'

const TILTS = [-2.5, 1.8, -1.2, 2.4]

export default function HouseRules() {
  const { kicker, callout, rules } = HOUSE_RULES
  return (
    <Section id="rules" tone="cream">
      <h2 id="rules-title" className="kicker text-center text-red-bright">
        {kicker}
      </h2>

      {/* The Dark Souls death screen, torn out and taped to the page. */}
      <Reveal className="relative mx-[calc(50%-50vw)] mt-8">
        <div className="paper-shadow -rotate-1">
          <div className="torn texture-dark px-4 py-12 text-center sm:py-16">
            <p className="died font-serif text-5xl font-bold text-ember sm:text-7xl lg:text-8xl">{callout.headline}</p>
            <p className="mt-6 font-hand text-2xl text-muted-cream sm:text-[1.7rem]">{callout.aside}</p>
            <p className="mt-2 font-marker text-2xl text-cream sm:text-3xl">{callout.respawn}</p>
          </div>
        </div>
      </Reveal>

      <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {rules.map((rule, i) => {
          const Icon = rule.icon
          return (
            <Reveal as="li" key={rule.text} delay={i * 90}>
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
