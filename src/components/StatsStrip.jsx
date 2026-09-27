import { STATS } from '../content/copy.js'
import { cn } from '../lib/cn.js'

export default function StatsStrip({ className, children }) {
  return (
    <div className={cn('paper-shadow relative', className)}>
      <ul className="torn texture-paper-light grid grid-cols-2 gap-x-4 gap-y-6 px-6 py-6 sm:px-8 md:grid-cols-4 xl:pr-24">
        {STATS.map(({ value, label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-3">
            <Icon aria-hidden="true" focusable="false" className="size-10 shrink-0 text-red-bright" />
            <p className="flex flex-col">
              <span className="font-ui text-[1.9rem] font-bold leading-none text-ink">{value}</span>
              <span className="mt-0.5 text-[0.8rem] leading-snug text-muted">{label}</span>
            </p>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}
