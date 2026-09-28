import WordReveal from '../components/anim/WordReveal.jsx'
import { SeniorDoodle } from '../components/Characters.jsx'
import { DoodleBurst, DoodleSparkle, ScribbleCircle } from '../components/Doodles.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { WHY } from '../content/copy.js'

export default function Why() {
  return (
    <Section id="about" tone="cream" tear="b">
      <Reveal>
        <SectionHeading
          underline={false}
          title={
            <>
              {WHY.titleStart}{' '}
              <span className="relative inline-block px-1">
                {WHY.titleCircled}
                <ScribbleCircle className="absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)] text-red-bright" />
              </span>
            </>
          }
        />
      </Reveal>

      <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
        <div>
          {/* The statement reads itself out as you scroll. */}
          <WordReveal
            text={WHY.intro}
            className="text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl lg:text-[2.1rem]"
          />

          <ul className="stagger mt-12 grid gap-7 sm:grid-cols-3 sm:gap-5">
            {WHY.items.map(({ title, text, icon: Icon }, i) => (
              <Reveal as="li" key={title} delay={i * 120} spring from={{ y: '24px', r: '-2deg' }}>
                <Icon aria-hidden="true" focusable="false" className="size-11 text-red-bright" />
                <h3 className="mt-3 font-ui text-xl font-bold uppercase tracking-wide text-ink">{title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={150} className="relative mx-auto w-full max-w-md">
          <figure className="relative ml-auto w-[88%] -rotate-2">
            <div className="paper-shadow-box rounded-[1.75rem]">
              <div className="rounded-[1.75rem] border-[3px] border-ink bg-paper-light px-7 pb-6 pt-7">
                <blockquote className="font-hand text-[1.9rem] leading-[1.15] text-ink">
                  <p>&ldquo;{WHY.quote.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-3 text-sm italic text-muted">— {WHY.quote.cite}</figcaption>
              </div>
            </div>
            <svg viewBox="0 0 60 40" aria-hidden="true" className="absolute -bottom-[2.1rem] left-[18%] h-10 w-14 text-ink" fill="none">
              <path d="M4 1 30 38 44 1Z" className="fill-paper-light" />
              <path d="M4 3 30 38 44 3" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            </svg>
          </figure>
          <div className="relative -mt-2 flex items-end">
            <SeniorDoodle className="w-40 text-ink sm:w-44" />
            <DoodleSparkle className="mb-24 ml-2 size-8 text-ink" />
            <DoodleBurst className="mb-40 -ml-2 size-8 text-red-bright" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
