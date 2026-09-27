import { cn } from '../lib/cn.js'
import { useSection, useTone } from '../lib/section.js'

/** Numbered steps [{ title?, text }] with hand-circled numbers. */
export default function StepList({ steps, className }) {
  const t = useTone()
  const { tone } = useSection()
  return (
    <ol className={cn('space-y-6', className)}>
      {steps.map((step, i) => (
        <li key={step.title ?? step.text} className="flex gap-4">
          <span
            aria-hidden="true"
            className={cn(
              'flex size-11 shrink-0 -rotate-6 items-center justify-center rounded-[48%_52%_45%_55%] border-[2.5px] font-marker text-xl',
              tone === 'cream' ? 'border-ink text-ink' : 'border-cream text-cream',
            )}
          >
            {i + 1}
          </span>
          <div className="pt-1.5">
            {step.title && <h3 className={cn('font-ui text-xl font-bold uppercase', t.heading)}>{step.title}</h3>}
            <p className={cn('leading-relaxed', t.body)}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
