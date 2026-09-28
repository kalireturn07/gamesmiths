import { motion } from 'motion/react'
import VelocityMarquee from '../components/anim/VelocityMarquee.jsx'
import { DoodleSparkle } from '../components/Doodles.jsx'
import MiniArt from '../components/MiniArt.jsx'
import PaperCard from '../components/PaperCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { ART_STYLES } from '../content/copy.js'
import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'

const TILTS = [-1.4, 1, -0.6, 1.3, -1, 0.7]

export default function ArtStyles() {
  return (
    <Section id={ART_STYLES.id} tone="cream" tear="b">
      <Reveal>
        <SectionHeading kicker={ART_STYLES.kicker} title={ART_STYLES.title} intro={ART_STYLES.intro} />
      </Reveal>

      <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {ART_STYLES.styles.map((style, i) => (
          <Reveal as="li" key={style.title} delay={(i % 3) * 100}>
            <PaperCard
              surface="paper"
              torn={false}
              tilt={TILTS[i % TILTS.length]}
              className="group h-full"
              innerClassName="h-full p-4 sm:p-4"
              extra={<span aria-hidden="true" className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />}
            >
              {/* "Scroll images reveal": the artwork wipes up into view. The in-view
                  trigger sits on the unclipped wrapper, because browsers treat an
                  element hidden by its own clip-path as never on screen. */}
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
                <motion.div
                  data-anim
                  variants={{
                    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                    show: { clipPath: 'inset(0% 0% 0% 0%)' },
                  }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: (i % 3) * 0.1 }}
                  className="overflow-hidden rounded-sm"
                >
                  <MiniArt
                    kind={style.art}
                    className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </motion.div>
              </motion.div>
              <div className="px-2 pb-2 pt-4">
                <h3 className="flex items-center gap-2 font-ui text-2xl font-bold uppercase tracking-wide text-ink">
                  <span aria-hidden="true" className={cn('size-3 rounded-full', accent(style.color).bg)} />
                  {style.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-muted">{style.text}</p>
              </div>
            </PaperCard>
          </Reveal>
        ))}
      </ul>

      {/* the toolbox, on a strip of tape that runs with your scroll */}
      <div className="mt-20">
        <p className="kicker text-center text-red-bright">{ART_STYLES.toolsTitle}</p>
        <p className="sr-only">{ART_STYLES.tools.join(', ')}</p>
        <div className="relative mx-[calc(50%-50vw)] mt-5 -rotate-2 bg-ink py-4 shadow-paper">
          <VelocityMarquee speed={2.2}>
            {ART_STYLES.tools.map((tool) => (
              <span key={tool} className="flex items-center gap-6 pr-6 font-marker text-3xl text-cream sm:text-4xl">
                {tool}
                <DoodleSparkle className="size-6 text-gold" />
              </span>
            ))}
          </VelocityMarquee>
        </div>
      </div>
    </Section>
  )
}
