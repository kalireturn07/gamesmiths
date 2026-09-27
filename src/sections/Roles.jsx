import { LuArrowRight } from 'react-icons/lu'
import ButtonLink from '../components/ButtonLink.jsx'
import Card from '../components/Card.jsx'
import IconBadge from '../components/IconBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { ROLES } from '../content/copy.js'

export default function Roles() {
  return (
    <Section id="roles" tone="cream">
      <Reveal>
        <SectionHeading kicker={ROLES.kicker} title={ROLES.title} align="center" />
      </Reveal>
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.roles.map((role, i) => (
          <Reveal as="li" key={role.title} delay={i * 90}>
            <Card className="h-full">
              <IconBadge icon={role.icon} size="lg" />
              <h3 className="mt-6 font-display text-xl font-bold tracking-wide text-ink">{role.title}</h3>
              <p className="mt-3 leading-relaxed">{role.text}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
        <p className="text-lg text-ink">{ROLES.cta.text}</p>
        <ButtonLink href={ROLES.cta.href} icon={LuArrowRight}>
          {ROLES.cta.label}
        </ButtonLink>
      </Reveal>
    </Section>
  )
}
