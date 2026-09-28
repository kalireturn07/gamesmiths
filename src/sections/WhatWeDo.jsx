import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import RollText from '../components/anim/RollText.jsx'
import VelocityMarquee from '../components/anim/VelocityMarquee.jsx'
import { DoodleSparkle, ScribbleUnderline } from '../components/Doodles.jsx'
import PaperCard from '../components/PaperCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Sticker from '../components/Sticker.jsx'
import { MARQUEE, WHAT_WE_DO } from '../content/copy.js'
import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'

const TILTS = [-1.2, 1, -0.8, 1.3]

export default function WhatWeDo() {
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })
  const cards = WHAT_WE_DO.cards

  return (
    <Section id="pillars" tone="dark" className="pt-8 sm:pt-10">
      <TapeMarquees />

      <Reveal className="mt-20">
        <SectionHeading kicker={WHAT_WE_DO.kicker} title={WHAT_WE_DO.title} align="center" />
      </Reveal>

      {/* Card stack: each pillar pins under the last and they pile up as you scroll. */}
      <ol ref={stackRef} className="relative mx-auto mt-16 max-w-4xl">
        {cards.map((card, i) => (
          <StackCard key={card.title} card={card} i={i} total={cards.length} progress={scrollYProgress} />
        ))}
      </ol>
    </Section>
  )
}

function StackCard({ card, i, total, progress }) {
  const reduce = useReducedMotionSafe()
  const a = accent(card.color)
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.045])
  const Icon = card.icon
  return (
    <li
      className={cn('sticky', i < total - 1 && 'mb-[28vh]')}
      style={{ top: `calc(6.5rem + ${i * 1.6}rem)` }}
    >
      <motion.div style={reduce ? undefined : { scale }} className="origin-top">
        <PaperCard
          surface="cream"
          tilt={TILTS[i % TILTS.length]}
          className="group"
          innerClassName="grid items-center gap-5 px-6 py-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10 sm:px-12 sm:py-12"
        >
          <div className="relative mx-auto w-fit sm:mx-0">
            <Sticker icon={Icon} color={card.color} size="lg-xl" tilt={-6} />
            <Sticker
              icon={card.badge}
              color="gold"
              size="md"
              tilt={10}
              className={cn('absolute -bottom-3 -right-4', card.color === 'gold' && 'bg-dark text-cream')}
            />
          </div>
          <div>
            <p className="flex items-center gap-3 font-ui text-lg font-bold uppercase tracking-[0.2em] text-muted">
              <span className={a.text}>0{i + 1}</span>
              <span className={cn('rounded-full px-3 py-0.5 text-sm tracking-wider', a.bg, a.on)}>{card.tag}</span>
            </p>
            <h3 className={cn('mt-2 w-fit -rotate-2 font-marker text-5xl leading-none sm:text-6xl', a.text)}>
              <RollText text={card.title} />
            </h3>
            <ScribbleUnderline className={cn('mt-1 h-3 w-36', a.text)} />
            <p className="mt-4 max-w-xl leading-relaxed text-muted sm:mt-5 sm:text-lg">{card.text}</p>
          </div>
        </PaperCard>
      </motion.div>
    </li>
  )
}

/** Two strips of "tape" crossing, each scrolling words the opposite way. */
function TapeMarquees() {
  const strip = (words, dotClass) =>
    words.map((word) => (
      <span key={word} className="flex items-center gap-6 pr-6 font-marker text-2xl uppercase sm:text-3xl">
        {word}
        <DoodleSparkle className={cn('size-5', dotClass)} />
      </span>
    ))
  return (
    <div aria-hidden="true" className="relative mx-[calc(50%-50vw)] h-36 sm:h-40">
      <div className="absolute inset-x-[-4%] top-6 -rotate-3 bg-red-bright py-3 text-cream shadow-paper">
        <VelocityMarquee speed={2.4}>{strip(MARQUEE.pillars, 'text-note')}</VelocityMarquee>
      </div>
      <div className="absolute inset-x-[-4%] top-[4.6rem] rotate-2 bg-cream py-3 text-ink shadow-paper sm:top-20">
        <VelocityMarquee speed={-2}>{strip(MARQUEE.tools, 'text-red-bright')}</VelocityMarquee>
      </div>
    </div>
  )
}
