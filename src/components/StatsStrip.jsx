import { STATS } from '../content/copy.js'
import { cn } from '../lib/cn.js'
import CountUp from './anim/CountUp.jsx'

export default function StatsStrip({ countDelay = 0, className, children }) {
  return (
    <div className={cn('paper-shadow relative', className)}>
      <ul className="torn bg-paper-light grid grid-cols-2 gap-x-4 gap-y-6 px-6 py-6 sm:px-8 md:grid-cols-4 lg:pr-28">
        {STATS.map(({ value, label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-3">
            <Icon aria-hidden="true" focusable="false" className="size-10 shrink-0 text-red-bright" />
            <p className="flex flex-col">
              <CountUp value={value} delay={countDelay} className="font-ui text-[1.9rem] font-bold leading-none text-ink" />
              <span className="mt-0.5 text-[0.8rem] leading-snug text-muted">{label}</span>
            </p>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}
