import Card from '../components/Card.jsx'
import IconBadge from '../components/IconBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import { HOUSE_RULES } from '../content/copy.js'

export default function HouseRules() {
  const { kicker, callout, rules } = HOUSE_RULES
  return (
    <Section id="rules" tone="dark">
      <h2 id="rules-title" className="kicker text-center text-ember">
        {kicker}
      </h2>

      {/* The Dark Souls death screen, more or less. */}
      <Reveal className="relative mx-[calc(50%-50vw)] mt-8 py-12 text-center sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-dark-panel to-transparent"
        />
        <p className="died font-display text-5xl font-bold text-ember sm:text-7xl lg:text-8xl">
          {callout.headline}
        </p>
        <div>
          <p className="mt-6 px-4 text-lg italic text-muted-cream sm:text-xl">{callout.aside}</p>
          <p className="mt-2 px-4 font-display text-xl font-semibold tracking-wide text-cream sm:text-2xl">
            {callout.respawn}
          </p>
        </div>
      </Reveal>

      <ul className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        {rules.map((rule, i) => (
          <Reveal as="li" key={rule.text} delay={i * 90}>
            <Card className="flex h-full items-start gap-5">
              <IconBadge icon={rule.icon} />
              <p className="pt-1 text-lg leading-relaxed text-cream">{rule.text}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
