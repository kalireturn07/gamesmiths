import { HERO } from '../content/copy.js'
import { logoSrc } from '../content/site.js'
import { cn } from '../lib/cn.js'
import DeskScene from './DeskScene.jsx'
import { DoodleSparkle, DoodleStar, DoodleSwirl, HandCheck } from './Doodles.jsx'
import StickyNote from './StickyNote.jsx'

/*
 * The scrapbook corkboard beside the hero headline. Everything is placed in
 * container-width units (cqw), so the whole collage scales like one image.
 */
export default function HeroBoard({ className }) {
  const b = HERO.board
  return (
    <div className={cn('@container relative mx-auto w-full max-w-[38rem]', className)}>
      <div className="relative aspect-[100/91] w-full">
        {/* To-do list */}
        <StickyNote
          color="yellow"
          tilt={-3}
          className="absolute !px-[3.2cqw] !pb-[3cqw] !pt-[4.2cqw]"
          style={{ left: '1cqw', top: '3cqw', width: '38cqw' }}
        >
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

        {/* Stamp */}
        <p
          className="absolute rotate-[-8deg] font-marker leading-[0.95] text-red-bright"
          style={{ left: '44cqw', top: '4cqw' }}
        >
          <span className="block text-[7.8cqw]">{b.stamp[0]}</span>
          <span className="block pl-[2.5cqw] text-[5.2cqw]">{b.stamp[1]}</span>
        </p>

        {/* "Just one more match…" */}
        <StickyNote
          color="white"
          tilt={5}
          fix="pin"
          className="absolute !px-[2.6cqw] !pb-[2.6cqw] !pt-[4.4cqw] text-[4.3cqw] leading-tight"
          style={{ left: '74cqw', top: '1cqw', width: '25cqw' }}
        >
          <DoodleSparkle className="mb-[0.5cqw] mr-[1cqw] inline size-[4.2cqw] align-[-0.4cqw]" />
          {b.note}
        </StickyNote>

        {/* Clock */}
        <div
          className="absolute rotate-[3deg] rounded-[2cqw] border-[0.7cqw] border-ink bg-dark px-[3cqw] py-[2.4cqw] text-center shadow-paper"
          style={{ left: '65cqw', top: '24cqw', width: '34cqw' }}
        >
          <span
            aria-hidden="true"
            className="tape"
            style={{ top: '-2.4cqw', left: '50%', transform: 'translateX(-50%) rotate(-4deg)', width: '14cqw', height: '4.4cqw' }}
          />
          <p className="whitespace-nowrap font-ui text-[7.8cqw] font-bold leading-none tracking-wide text-cream">{b.clock.time}</p>
          <p className="mt-[1.2cqw] font-hand text-[4.4cqw] leading-none text-muted-cream">{b.clock.caption}</p>
        </div>

        {/* Polaroid of the club logo */}
        <div
          aria-hidden="true"
          className="absolute rotate-[-4deg] bg-paper-light p-[1.8cqw] pb-[5cqw] shadow-paper"
          style={{ left: '41cqw', top: '23cqw', width: '23cqw' }}
        >
          <span
            className="tape"
            style={{ top: '-2.2cqw', left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '12cqw', height: '4cqw' }}
          />
          <img src={logoSrc} alt="" width="160" height="160" className="aspect-square w-full" />
        </div>

        {/* "Skill issue?" */}
        <StickyNote
          color="white"
          tilt={-4}
          className="absolute !px-[3cqw] !pb-[2.8cqw] !pt-[4cqw] text-[4.5cqw] leading-tight"
          style={{ left: '69cqw', top: '47cqw', width: '29cqw' }}
        >
          {b.skillIssue[0]}
          <br />
          {b.skillIssue[1]}
        </StickyNote>

        <DoodleStar className="absolute size-[5.5cqw] text-ink" style={{ left: '37cqw', top: '48cqw' }} />
        <DoodleSwirl className="absolute size-[6cqw] text-red-bright" style={{ left: '63cqw', top: '15cqw' }} />

        {/* The desk */}
        <div className="absolute inset-x-0" style={{ top: '52cqw' }}>
          <DeskScene className="w-full" />
        </div>
      </div>
    </div>
  )
}
