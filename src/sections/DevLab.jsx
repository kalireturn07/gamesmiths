import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import CodeEditor from '../components/CodeEditor.jsx'
import PixelSprite from '../components/PixelSprite.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { DEV_LAB } from '../content/copy.js'
import { cn } from '../lib/cn.js'
import { useHydrated } from '../lib/useHydrated.js'
import { usePauseOffscreen } from '../lib/usePauseOffscreen.js'

const CONSOLE_TONES = {
  info: 'text-muted-cream',
  warn: 'text-gold-light',
  ok: 'text-green-light',
}

export default function DevLab() {
  const hydrated = useHydrated()
  const [codeDone, setCodeDone] = useState(false)
  const [lines, setLines] = useState(0)
  const onDone = useCallback(() => setCodeDone(true), [])

  // Console output trickles in once the code has finished typing.
  useEffect(() => {
    if (!codeDone) return undefined
    const id = setInterval(() => {
      setLines((n) => {
        if (n >= DEV_LAB.console.length) {
          clearInterval(id)
          return n
        }
        return n + 1
      })
    }, 550)
    return () => clearInterval(id)
  }, [codeDone])

  const shownLines = hydrated ? lines : DEV_LAB.console.length

  return (
    <Section id={DEV_LAB.id} tone="dark">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <Reveal>
          <SectionHeading kicker={DEV_LAB.kicker} title={DEV_LAB.title} intro={DEV_LAB.intro} />
        </Reveal>
        <GitLog />
      </div>

      <div className="mt-20">
        {/* The editor window */}
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-xl border-2 border-cream/10 bg-[#161513] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
            {/* title bar */}
            <div className="flex items-center gap-3 border-b border-cream/10 bg-dark-panel px-4 py-2.5">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-bright" />
                <span className="size-3 rounded-full bg-gold" />
                <span className="size-3 rounded-full bg-green" />
              </span>
              <span className="rounded-md bg-[#161513] px-3 py-1 font-mono text-xs text-cream">{DEV_LAB.file}</span>
              <span className="hidden font-mono text-xs text-muted-cream sm:inline">level_01.tscn</span>
              <span className="ml-auto hidden font-mono text-xs text-muted-cream md:inline">{DEV_LAB.project}</span>
              <span className="flex items-center gap-1.5 rounded-md bg-green px-2 py-0.5 font-ui text-sm font-bold tracking-wide text-cream">
                <span aria-hidden="true">▶</span> Running
              </span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <CodeEditor code={DEV_LAB.code} onDone={onDone} className="px-4 py-5" />
              <GamePreview />
            </div>

            {/* console */}
            <div className="border-t border-cream/10 bg-dark-panel px-4 py-3 font-mono text-[0.78rem] leading-6">
              <p className="font-ui text-sm font-bold uppercase tracking-widest text-muted-cream">Output</p>
              <ul className="min-h-[6rem]" aria-live="off">
                {DEV_LAB.console.slice(0, shownLines).map((line) => (
                  <motion.li
                    key={line.text}
                    initial={hydrated ? { opacity: 0, x: -8 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className={CONSOLE_TONES[line.tone]}
                  >
                    <span aria-hidden="true" className="mr-2 text-muted-cream/70">
                      &gt;
                    </span>
                    {line.text}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/** A looping mini platformer: our pixel knight runs, hops and turns around. */
function GamePreview() {
  const ref = useRef(null)
  usePauseOffscreen(ref)
  return (
    <div ref={ref} className="relative border-t border-cream/10 bg-[#120f1f] p-3 lg:border-l lg:border-t-0">
      <div
        role="img"
        aria-label="Game preview: a pixel-art knight running and jumping across platforms"
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[linear-gradient(#1b1740,#3a1d44_70%,#5a2a3c)] [--run:min(58cqw,260px)] @container"
      >
        {/* stars */}
        {[
          [8, 12],
          [22, 28],
          [40, 8],
          [63, 18],
          [78, 9],
          [90, 30],
          [52, 34],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="twinkle absolute size-1 bg-cream"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.35}s` }}
          />
        ))}
        {/* moon */}
        <span className="absolute right-[10%] top-[10%] size-8 rounded-full bg-note shadow-[0_0_24px_rgb(245_215_110/0.5)]" />
        {/* floating platform + coin */}
        <div className="absolute left-[46%] top-[46%] flex">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="size-5 border-2 border-[#1c1b19] bg-[#6b5f56] shadow-[inset_0_4px_0_#8a7d71]" />
          ))}
        </div>
        <span className="coin-spin absolute left-[53%] top-[35%] size-4 rounded-full border-2 border-[#8f5a0e] bg-gold" />
        {/* ground */}
        <div className="absolute inset-x-0 bottom-0 flex">
          {Array.from({ length: 24 }, (_, i) => (
            <span
              key={i}
              className="h-7 w-7 shrink-0 border-2 border-[#1c1b19] bg-green shadow-[inset_0_6px_0_#3f8f5f]"
            />
          ))}
        </div>
        {/* the knight */}
        <div className="knight-run absolute bottom-7 left-[6%]">
          <div className="knight-hop">
            <div className="knight-face">
              <PixelSprite className="w-10" />
            </div>
          </div>
        </div>
        {/* HUD */}
        <div className="absolute left-2 top-2 flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-3 bg-red-bright shadow-[inset_-2px_-2px_0_#8b2e22]" />
          ))}
        </div>
        <span className="absolute right-2 top-2 font-mono text-[0.65rem] text-cream/80">60 FPS</span>
      </div>
    </div>
  )
}

function GitLog() {
  return (
    <Reveal delay={200} className="relative">
      <div className="paper-shadow-box rotate-1 rounded-xl">
        <div className="rounded-xl border-2 border-cream/10 bg-[#161513] p-5 pb-12 font-mono text-[0.78rem] leading-relaxed">
          <p className="text-green-light">
            <span aria-hidden="true">$ </span>
            {DEV_LAB.logTitle}
          </p>
          <ol className="mt-3 space-y-2">
            {DEV_LAB.commits.map((commit, i) => (
              <Reveal as="li" key={commit.hash} delay={300 + i * 180} from={{ y: '10px' }} className="flex gap-2">
                <span className="shrink-0 text-gold-light">{commit.hash}</span>
                <span className={cn('text-cream', i === 0 && 'font-bold')}>
                  {i === 0 && <span className="text-green-light">(HEAD → main) </span>}
                  {commit.msg}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
      <StickyNote
        color="yellow"
        tilt={-6}
        aria-hidden="true"
        className="absolute -bottom-14 -left-6 w-36 text-center text-lg leading-tight"
      >
        Commit early.
        <br />
        Commit often.
      </StickyNote>
    </Reveal>
  )
}
