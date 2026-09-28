import SlideInWords from '../components/anim/SlideInWords.jsx'
import { DoodleArrow, DoodleSparkle, DoodleStar } from '../components/Doodles.jsx'
import PaperCard from '../components/PaperCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Sticker from '../components/Sticker.jsx'
import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'

const TILTS = [-1.2, 0.8, -0.6]

/**
 * One learning track (Game Dev, Digital Arts): heading + CTA, three step
 * cards joined by hand-drawn arrows, and a scribbled quote with a sticker.
 * `mirrored` moves the quote to the left on desktop.
 */
export default function Track({ track, tone, tear, mirrored = false }) {
  const a = accent(track.color)
  const dark = tone === 'dark'
  return (
    <Section id={track.id} tone={tone} tear={tear}>
      <Reveal>
        <SectionHeading kicker={track.kicker} title={<SlideInWords text={track.title} />} intro={track.intro} />
      </Reveal>

      <div
        className={cn(
          'mt-14 grid items-center gap-12',
          mirrored ? 'lg:grid-cols-[17rem_minmax(0,1fr)]' : 'lg:grid-cols-[minmax(0,1fr)_17rem]',
        )}
      >
        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {track.steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal as="li" key={step.title} delay={i * 100} className="relative">
                <PaperCard surface="paper" tilt={TILTS[i % TILTS.length]} className="h-full" innerClassName="h-full">
                  <div className="flex items-center justify-between">
                    <span className={cn('rounded-md px-2.5 py-1 font-ui text-xl font-bold leading-none', a.bg, a.on)}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon aria-hidden="true" focusable="false" className="size-10 text-ink" />
                  </div>
                  <h3 className="mt-5 font-ui text-2xl font-bold uppercase tracking-wide text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </PaperCard>
                {i < track.steps.length - 1 && (
                  <DoodleArrow
                    className={cn(
                      'absolute -right-11 top-1/2 z-10 hidden h-7 w-12 -translate-y-1/2 md:block',
                      dark ? 'text-cream' : 'text-ink',
                    )}
                  />
                )}
              </Reveal>
            )
          })}
        </ol>

        <Reveal delay={250} className={cn('relative text-center', mirrored && 'lg:order-first')}>
          <DoodleStar className={cn('absolute -top-6 left-2 size-8', dark ? 'text-cream' : 'text-ink')} />
          <DoodleSparkle className={cn('absolute right-4 top-10 size-7', a.text, dark && a.textOnDark)} />
          <Sticker icon={track.quote.icon} color={track.color} size="xl" tilt={-8} />
          <blockquote
            className={cn(
              'mx-auto mt-6 max-w-[16rem] -rotate-3 font-hand text-[1.75rem] leading-[1.15]',
              dark ? 'text-cream' : 'text-ink',
            )}
          >
            <p>&ldquo;{track.quote.text}&rdquo;</p>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  )
}
