import { cn } from '../lib/cn.js'
import { useSection } from '../lib/section.js'

const SIZES = {
  md: 'px-6 py-3 text-base',
  sm: 'px-4 py-2 text-sm',
}

/** A link styled as a button. `variant` is "primary" (red) or "secondary" (outline). */
export default function ButtonLink({ href, variant = 'primary', size = 'md', icon: Icon, className, children, ...rest }) {
  const { tone } = useSection()
  const variants = {
    primary: 'bg-red text-cream shadow-card hover:bg-red-bright hover:shadow-card-lift',
    secondary:
      tone === 'cream'
        ? 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/5'
        : 'border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/5',
  }
  return (
    <a
      href={href}
      className={cn(
        'lift inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide',
        SIZES[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {Icon && <Icon aria-hidden="true" focusable="false" className="text-[1.1em]" />}
    </a>
  )
}
