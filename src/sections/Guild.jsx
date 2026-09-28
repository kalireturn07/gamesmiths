import PaperCard from '../components/PaperCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Sticker from '../components/Sticker.jsx'
import { GUILD } from '../content/copy.js'

const TILTS = [1.4, -1.2, 1, -1.6]

export default function Guild() {
  return (
    <Section id="guild" tone="dark">
      <Reveal>
        <SectionHeading kicker={GUILD.kicker} title={GUILD.title} intro={GUILD.intro} align="center" />
      </Reveal>

      {/* The cards deal out like a hand of trading cards. */}
      <ul className="stagger mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {GUILD.roles.map((role, i) => (
          <Reveal
            as="li"
            key={role.title}
            delay={(i % 4) * 130}
            spring
            from={{ y: '90px', r: `${(i - 1.5) * 12}deg`, s: 0.85 }}
          >
            <PaperCard
              surface="paper"
              tilt={TILTS[i % TILTS.length]}
              className="group h-full"
              innerClassName="h-full pt-9"
              extra={<span aria-hidden="true" className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />}
            >
              <Sticker icon={role.icon} color={role.color} size="md" tilt={i % 2 ? 6 : -6} />
              <h3 className="mt-5 font-ui text-2xl font-bold uppercase tracking-wide text-ink">{role.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{role.text}</p>
            </PaperCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
