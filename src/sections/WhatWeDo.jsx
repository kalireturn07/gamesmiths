import { LuArrowRight } from 'react-icons/lu'
import ButtonLink from '../components/ButtonLink.jsx'
import { ScribbleUnderline } from '../components/Doodles.jsx'
import PaperCard from '../components/PaperCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Sticker from '../components/Sticker.jsx'
import { WHAT_WE_DO } from '../content/copy.js'
import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'

const TILTS = [-1.6, 1.2, -0.8, 1.6]

export default function WhatWeDo() {
  return (
    <Section id="pillars" tone="dark">
      <Reveal>
        <SectionHeading kicker={WHAT_WE_DO.kicker} title={WHAT_WE_DO.title} align="center" />
      </Reveal>

      <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {WHAT_WE_DO.cards.map((card, i) => {
          const a = accent(card.color)
          return (
            <Reveal as="li" key={card.title} delay={i * 90}>
              <PaperCard
                surface="cream"
                tilt={TILTS[i % TILTS.length]}
                className="group h-full"
                innerClassName="flex h-full flex-col pt-7"
                extra={
                  <div aria-hidden="true" className="absolute -top-7 right-6">
                    <Sticker icon={card.icon} color={card.color} size="lg" tilt={8} />
                    <Sticker
                      icon={card.badge}
                      color="gold"
                      size="sm"
                      tilt={-10}
                      className={cn('absolute -bottom-3 -right-3', card.color === 'gold' && 'bg-dark text-cream')}
                    />
                  </div>
                }
              >
                <h3 className={cn('w-fit -rotate-3 font-marker text-[2.6rem] leading-none', a.text)}>{card.title}</h3>
                <ScribbleUnderline className={cn('mt-1 h-3 w-28', a.text)} />
                <p className="mt-5 leading-relaxed text-muted">{card.text}</p>
                <div className="mt-auto pt-7">
                  <ButtonLink href={card.cta.href} variant={card.color} size="sm" icon={LuArrowRight}>
                    {card.cta.label}
                  </ButtonLink>
                </div>
              </PaperCard>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
