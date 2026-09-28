import { motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import {
  LuBrush,
  LuEraser,
  LuEye,
  LuEyeOff,
  LuLayers,
  LuPaintBucket,
  LuPipette,
  LuUndo2,
  LuZoomIn,
} from 'react-icons/lu'
import ApprenticeDrawing from '../components/ApprenticeDrawing.jsx'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { ART_PROCESS } from '../content/copy.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'
import { useScrollProgress } from '../lib/useScrollProgress.js'

// Layers panel, top to bottom, and the first stage each one is visible in.
const LAYERS = [
  { name: 'Sketch', from: 0, until: 1, swatch: 'bg-blue-light' },
  { name: 'Line art', from: 1, swatch: 'bg-ink' },
  { name: 'Shading', from: 3, swatch: 'bg-muted' },
  { name: 'Flats', from: 2, swatch: 'bg-red-bright' },
  { name: 'Background', from: 4, swatch: 'bg-note' },
]
const ACTIVE_LAYER = ['Sketch', 'Line art', 'Flats', 'Shading', 'Background']

/**
 * "Sketch to ship": the section pins to the screen and, as you keep
 * scrolling, an original character is drawn stage by stage inside a
 * drawing-app window. With reduced motion it's a static, finished piece.
 */
export default function ArtProcess() {
  const reduce = useReducedMotionSafe()
  return (
    <SectionContext value={{ id: ART_PROCESS.id, tone: 'dark' }}>
      <section
        id={ART_PROCESS.id}
        aria-labelledby={`${ART_PROCESS.id}-title`}
        className="tone-dark relative pt-20 text-muted-cream sm:pt-24"
      >
        <Container>
          <Reveal>
            <SectionHeading kicker={ART_PROCESS.kicker} title={ART_PROCESS.title} intro={ART_PROCESS.intro} />
          </Reveal>
        </Container>
        {reduce ? <StaticProcess /> : <PinnedProcess />}
      </section>
    </SectionContext>
  )
}

function PinnedProcess() {
  const ref = useRef(null)
  // Scroll progress through the pinned stretch, tracked only while it's on screen.
  const p = useMotionValue(0)
  const setProgress = useCallback((v) => p.set(v), [p])
  useScrollProgress(ref, ['start start', 'end end'], setProgress)
  const layers = {
    sketch: useTransform(p, [0.02, 0.19], [0, 1]),
    sketchFade: useTransform(p, [0.2, 0.36, 0.46], [1, 0.45, 0]),
    lines: useTransform(p, [0.2, 0.39], [0, 1]),
    flats: useTransform(p, [0.41, 0.56], [0, 1]),
    shade: useTransform(p, [0.61, 0.77], [0, 1]),
    final: useTransform(p, [0.81, 0.95], [0, 1]),
  }
  const [stage, setStage] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setStage(Math.min(4, Math.max(0, Math.floor(v * 5)))))

  return (
    <div ref={ref} className="relative h-[460vh]">
      <div className="sticky top-[4.75rem] flex h-[calc(100svh-4.75rem)] items-center overflow-hidden py-6">
        <Container className="grid h-full items-center gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12">
          <StageList stage={stage} progress={p} className="order-2 lg:order-1" />
          <AppWindow stage={stage} className="order-1 min-h-0 lg:order-2">
            <ApprenticeDrawing {...layers} className="h-full w-full will-change-transform" />
          </AppWindow>
        </Container>
      </div>
    </div>
  )
}

function StaticProcess() {
  const one = useMotionValue(1)
  const zero = useMotionValue(0)
  return (
    <Container className="grid items-center gap-10 py-14 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12">
      <StageList stage={4} showAll />
      <AppWindow stage={4} className="h-[34rem]">
        <ApprenticeDrawing sketch={one} sketchFade={zero} lines={one} flats={one} shade={one} final={one} className="h-full w-full" />
      </AppWindow>
    </Container>
  )
}

function StageList({ stage, progress, showAll = false, className }) {
  const full = useMotionValue(1)
  const fill = progress ?? full
  const current = ART_PROCESS.stages[stage]
  return (
    <div className={className}>
      {/* phones: just the current stage */}
      <div className="lg:hidden">
        <div className="flex items-center gap-2">
          {ART_PROCESS.stages.map((s, i) => (
            <span key={s.title} className={cn('h-1.5 flex-1 rounded-full', i <= stage ? 'bg-ember' : 'bg-cream/15')} />
          ))}
        </div>
        <p className="mt-3 font-ui text-lg font-bold uppercase tracking-wide text-cream">
          <span className="text-ember">0{stage + 1}</span> {current.title}
        </p>
        <p className="mt-1 text-sm leading-snug">{current.text}</p>
      </div>

      {/* desktop: the full list with a progress rail */}
      <ol className="relative hidden space-y-5 pl-7 lg:block">
        <span aria-hidden="true" className="absolute inset-y-1 left-0 w-1 rounded-full bg-cream/10" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-1 left-0 w-1 origin-top rounded-full bg-ember will-change-transform"
          style={{ scaleY: fill }}
        />
        {ART_PROCESS.stages.map((s, i) => {
          const active = showAll || i === stage
          return (
            <li
              key={s.title}
              data-anim
              aria-current={!showAll && i === stage ? 'step' : undefined}
              className={cn('transition-opacity duration-300', active ? 'opacity-100' : 'opacity-40')}
            >
              <p className="font-ui text-xl font-bold uppercase tracking-wide text-cream">
                <span className="mr-2 text-ember">0{i + 1}</span>
                {s.title}
              </p>
              <p className="mt-1 text-[0.95rem] leading-snug">{s.text}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** A dark drawing-app window: toolbar, paper canvas and a layers panel. */
function AppWindow({ stage, className, children }) {
  const tools = [LuBrush, LuEraser, LuPaintBucket, LuPipette, LuZoomIn, LuUndo2]
  return (
    <div
      role="img"
      aria-label={`Drawing app showing the character at the "${ART_PROCESS.stages[stage].title}" stage`}
      className={cn(
        'flex h-full max-h-[42rem] flex-col overflow-hidden rounded-xl border-2 border-cream/10 bg-[#161513] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-cream/10 bg-dark-panel px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-bright" />
          <span className="size-3 rounded-full bg-gold" />
          <span className="size-3 rounded-full bg-green" />
        </span>
        <span className="font-mono text-xs text-cream">{ART_PROCESS.file}</span>
        <span className="ml-auto rounded bg-[#161513] px-2 py-0.5 font-mono text-xs text-muted-cream">
          <LuBrush aria-hidden="true" className="mr-1 inline" />
          {ACTIVE_LAYER[stage]}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div aria-hidden="true" className="hidden flex-col gap-1 border-r border-cream/10 bg-dark-panel p-2 sm:flex">
          {tools.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                'flex size-9 items-center justify-center rounded-md text-lg',
                i === 0 ? 'bg-red-bright text-cream' : 'text-muted-cream',
              )}
            >
              <Icon />
            </span>
          ))}
        </div>
        <div className="relative min-h-0 flex-1 bg-[#2a2826] p-3 sm:p-5">
          <div className="texture-paper-light h-full rounded-sm shadow-[0_10px_30px_-10px_rgb(0_0_0/0.7)]">{children}</div>
        </div>
        <div aria-hidden="true" className="hidden w-44 shrink-0 border-l border-cream/10 bg-dark-panel p-3 md:block">
          <p className="flex items-center gap-1.5 font-ui text-sm font-bold uppercase tracking-widest text-muted-cream">
            <LuLayers /> Layers
          </p>
          <ul className="mt-3 space-y-1.5">
            {LAYERS.map((layer) => {
              const visible = stage >= layer.from && (layer.until === undefined || stage <= layer.until)
              const active = ACTIVE_LAYER[stage] === layer.name
              return (
                <li
                  key={layer.name}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors duration-300',
                    active ? 'bg-red-bright/25 text-cream ring-1 ring-ember' : 'text-muted-cream',
                  )}
                >
                  {visible ? <LuEye className="shrink-0" /> : <LuEyeOff className="shrink-0 opacity-50" />}
                  <span className={cn('size-3.5 shrink-0 rounded-sm border border-cream/20', layer.swatch, !visible && 'opacity-30')} />
                  <span className={visible ? undefined : 'opacity-70'}>{layer.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
