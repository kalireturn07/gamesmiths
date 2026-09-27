import { LuArrowRight } from 'react-icons/lu'
import ButtonLink from '../components/ButtonLink.jsx'
import PaperCard from '../components/PaperCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Sticker from '../components/Sticker.jsx'
import { ROLES } from '../content/copy.js'

const TILTS = [1.4, -1.2, 1, -1.6]

export default function Roles() {
  return (
    <Section id="roles" tone="cream" tear="b">
      <Reveal>
        <SectionHeading kicker={ROLES.kicker} title={ROLES.title} align="center" />
      </Reveal>

      <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.roles.map((role, i) => (
          <Reveal as="li" key={role.title} delay={i * 90}>
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

      <Reveal className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
        <p className="font-hand text-2xl text-ink">{ROLES.cta.text}</p>
        <ButtonLink href={ROLES.cta.href} icon={LuArrowRight}>
          {ROLES.cta.label}
        </ButtonLink>
      </Reveal>
    </Section>
  )
}
