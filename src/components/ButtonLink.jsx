import { cn } from '../lib/cn.js'
import { useSection } from '../lib/section.js'

const VARIANTS = {
  red: 'btn-red',
  blue: 'btn-blue',
  gold: 'btn-gold',
  purple: 'btn-purple',
  green: 'btn-green',
  dark: 'btn-dark',
  outline: 'btn-outline',
}

/**
 * A link styled as a chunky button. `variant` is an accent colour
 * ("red", "blue", "gold", "purple", "green"), "dark" or "outline".
 * `icon` sits after the label, `iconLeft` before it.
 */
export default function ButtonLink({
  href,
  variant = 'red',
  size = 'md',
  icon: Icon,
  iconLeft: IconLeft,
  className,
  children,
  ...rest
}) {
  const { tone } = useSection()
  return (
    <a
      href={href}
      className={cn(
        'btn',
        VARIANTS[variant],
        size === 'sm' && 'btn-sm',
        variant === 'outline' && (tone === 'cream' ? 'text-ink' : 'text-cream'),
        className,
      )}
      {...rest}
    >
      {IconLeft && <IconLeft aria-hidden="true" focusable="false" className="text-[1.3em]" />}
      {children}
      {Icon && <Icon aria-hidden="true" focusable="false" className="text-[1.1em]" />}
    </a>
  )
}
