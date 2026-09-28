import { motion, useScroll, useTransform } from 'motion/react'
import { HERO } from '../content/copy.js'
import { logoSrc } from '../content/site.js'
import { cn } from '../lib/cn.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'
import DeskScene from './DeskScene.jsx'
import { DoodleSparkle, DoodleStar, DoodleSwirl, HandCheck } from './Doodles.jsx'
import StickyNote from './StickyNote.jsx'

/**
 * One pinned item on the board. `drift` is how far (px) it floats up while
 * the first ~700px of the page scroll by, so each item moves at its own
 * speed (parallax). Positions are in cqw so the collage scales as one.
 */
function Pinned({ drift = 0, left, top, width, className, children }) {
  const reduce = useReducedMotionSafe()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, -drift])
  const style = { left, top, width }
  if (reduce || !drift) {
    return (
      <div className={cn('absolute', className)} style={style}>
        {children}
      </div>
    )
  }
  return (
    <motion.div className={cn('absolute', className)} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}

export default function HeroBoard({ className }) {
  const b = HERO.board
  return (
    <div className={cn('@container relative mx-auto w-full max-w-[38rem]', className)}>
      <div className="relative aspect-[100/91] w-full">
        <Pinned drift={70} left="1cqw" top="3cqw" width="38cqw">
          <StickyNote color="yellow" tilt={-3} className="!px-[3.2cqw] !pb-[3cqw] !pt-[4.2cqw]">
            <p className="text-[5.6cqw] leading-none underline decoration-2 underline-offset-4">{b.todoTitle}</p>
            <ul className="mt-[2.2cqw] space-y-[0.9cqw] text-[4.4cqw] leading-tight">
              {b.todo.map((item) => (
                <li key={item.text} className="flex items-center gap-[1.6cqw]">
                  <HandCheck checked={item.done} className="size-[4.8cqw] shrink-0" />
                  <span className={item.done ? 'line-through decoration-red-bright decoration-2' : undefined}>
                    {item.text}
                    {item.done && <span className="sr-only"> (done)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </StickyNote>
        </Pinned>

        <Pinned drift={130} left="44cqw" top="4cqw">
          <p className="rotate-[-8deg] font-marker leading-[0.95] text-red-bright">
            <span className="block text-[7.8cqw]">{b.stamp[0]}</span>
            <span className="block pl-[2.5cqw] text-[5.2cqw]">{b.stamp[1]}</span>
          </p>
        </Pinned>

        <Pinned drift={100} left="74cqw" top="1cqw" width="25cqw">
          <StickyNote color="white" tilt={5} fix="pin" className="!px-[2.6cqw] !pb-[2.6cqw] !pt-[4.4cqw] text-[4.3cqw] leading-tight">
            <DoodleSparkle className="mb-[0.5cqw] mr-[1cqw] inline size-[4.2cqw] align-[-0.4cqw]" />
            {b.note}
          </StickyNote>
        </Pinned>

        <Pinned drift={60} left="65cqw" top="24cqw" width="34cqw">
          <div className="relative rotate-[3deg] rounded-[2cqw] border-[0.7cqw] border-ink bg-dark px-[3cqw] py-[2.4cqw] text-center shadow-paper">
            <span
              aria-hidden="true"
              className="tape"
              style={{ top: '-2.4cqw', left: '50%', transform: 'translateX(-50%) rotate(-4deg)', width: '14cqw', height: '4.4cqw' }}
            />
            <p className="whitespace-nowrap font-ui text-[7.8cqw] font-bold leading-none tracking-wide text-cream">{b.clock.time}</p>
            <p className="mt-[1.2cqw] font-hand text-[4.4cqw] leading-none text-muted-cream">{b.clock.caption}</p>
          </div>
        </Pinned>

        <Pinned drift={40} left="41cqw" top="23cqw" width="23cqw">
          <div aria-hidden="true" className="relative rotate-[-4deg] bg-paper-light p-[1.8cqw] pb-[5cqw] shadow-paper">
            <span
              className="tape"
              style={{ top: '-2.2cqw', left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '12cqw', height: '4cqw' }}
            />
            <img src={logoSrc} alt="" width="160" height="160" className="aspect-square w-full" />
          </div>
        </Pinned>

        <Pinned drift={110} left="69cqw" top="47cqw" width="29cqw">
          <StickyNote color="white" tilt={-4} className="!px-[3cqw] !pb-[2.8cqw] !pt-[4cqw] text-[4.5cqw] leading-tight">
            {b.skillIssue[0]}
            <br />
            {b.skillIssue[1]}
          </StickyNote>
        </Pinned>

        <Pinned drift={150} left="37cqw" top="48cqw" width="5.5cqw">
          <DoodleStar className="size-full text-ink" />
        </Pinned>
        <Pinned drift={90} left="63cqw" top="15cqw" width="6cqw">
          <DoodleSwirl className="size-full text-red-bright" />
        </Pinned>

        {/* The desk stays put. */}
        <div className="absolute inset-x-0" style={{ top: '52cqw' }}>
          <DeskScene className="w-full" />
        </div>
      </div>
    </div>
  )
}
