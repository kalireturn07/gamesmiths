import { SOCIAL_LINKS } from '../content/links.js'
import { cn } from '../lib/cn.js'
import IconBadge from './IconBadge.jsx'

/**
 * variant="cards" → icon badge + name + detail (Join section)
 * variant="icons" → compact round icon buttons (footer)
 */
export default function SocialLinks({ variant = 'cards', className }) {
  if (variant === 'icons') {
    return (
      <ul className={cn('flex gap-3', className)}>
        {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="lift flex size-11 items-center justify-center rounded-full bg-red text-xl text-cream hover:bg-red-bright"
            >
              <Icon aria-hidden="true" focusable="false" />
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={cn('grid max-w-md gap-3', className)}>
      {SOCIAL_LINKS.map(({ id, label, detail, href, icon }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="lift group flex h-full items-center gap-3 rounded-xl border border-cream/10 bg-dark-panel p-3 pr-4 hover:border-cream/25 hover:shadow-card-lift"
          >
            <IconBadge icon={icon} size="md" variant="red" className="transition-colors group-hover:bg-red-bright" />
            <span className="min-w-0">
              <span className="block font-semibold text-cream">{label}</span>
              <span className="block truncate text-sm text-muted-cream">{detail}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
