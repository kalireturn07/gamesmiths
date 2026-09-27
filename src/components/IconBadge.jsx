import { cn } from '../lib/cn.js'
import { useTone } from '../lib/section.js'

const SIZES = {
  sm: 'size-8 text-base',
  md: 'size-12 text-2xl',
  lg: 'size-14 text-[1.75rem]',
}

const VARIANTS = {
  red: 'bg-red text-cream',
  dark: 'bg-dark text-cream',
}

/**
 * An icon inside a solid circle. Icons never float bare. By default the
 * badge is red on dark surfaces and dark on cream/red ones.
 *
 * Icons are decorative (aria-hidden) because the text beside them always
 * says the same thing. Pass `label` only when an icon stands on its own.
 */
export default function IconBadge({ icon: Icon, variant, size = 'md', label, className }) {
  const t = useTone()
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        SIZES[size],
        VARIANTS[variant ?? t.badge],
        className,
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon aria-hidden="true" focusable="false" />
    </span>
  )
}
