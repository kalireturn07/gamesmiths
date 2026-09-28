import { motion } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { HOUSE_RULES } from '../content/copy.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'

const TILTS = [-2.5, 1.8, -1.2, 2.4]

export default function HouseRules() {
  const { kicker, callout, rules } = HOUSE_RULES
  const reduce = useReducedMotionSafe()
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

      <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {rules.map((rule, i) => {
          const Icon = rule.icon
          return (
            <motion.li
              key={rule.text}
              data-anim
              initial={reduce ? false : { opacity: 0, y: -70, rotate: TILTS[i] * 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 150, damping: 13, delay: i * 0.12 }}
            >
              <StickyNote color={rule.note} tilt={TILTS[i % TILTS.length]} fix="pin" className="h-full px-6 pb-7 pt-8">
                <div className="flex items-center justify-between">
                  <span className="font-marker text-xl">Rule #{i + 1}</span>
                  <Icon aria-hidden="true" focusable="false" className="size-9" />
                </div>
                <p className="mt-3 text-[1.45rem] leading-[1.2]">{rule.text}</p>
              </StickyNote>
            </motion.li>
          )
        })}
      </ul>
    </Section>
  )
}
