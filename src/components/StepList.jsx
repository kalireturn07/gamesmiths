import { cn } from '../lib/cn.js'
import { useTone } from '../lib/section.js'

/**
 * A numbered list of steps: [{ title?, text }].
 *   numbers="badge" → 1, 2, 3 in solid circles
 *   numbers="large" → big 01, 02, 03 numerals
 */
export default function StepList({ steps, numbers = 'badge', className }) {
  const t = useTone()
  const badge = t.badge === 'red' ? 'bg-red text-cream' : 'bg-dark text-cream'

  return (
    <ol className={cn('space-y-7', className)}>
      {steps.map((step, i) => (
        <li key={step.title ?? step.text} className="flex gap-5">
          {numbers === 'large' ? (
            <span
              aria-hidden="true"
              className={cn('w-14 shrink-0 font-display text-4xl font-bold leading-none tabular-nums', t.kicker)}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className={cn('flex size-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold', badge)}
            >
              {i + 1}
            </span>
          )}
          <div className={numbers === 'badge' ? 'pt-1.5' : undefined}>
            {step.title && (
              <h3 className={cn('font-display text-xl font-semibold tracking-wide', t.heading)}>{step.title}</h3>
            )}
            <p className={cn(step.title && 'mt-1.5', 'leading-relaxed', t.body)}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
