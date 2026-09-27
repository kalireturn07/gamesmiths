import { SOCIAL_LINKS } from '../content/links.js'
import { cn } from '../lib/cn.js'

/**
 * variant="cards" → icon + name + detail (Join section)
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
              className="btn btn-red size-11 rounded-full !p-0 text-xl"
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
      {SOCIAL_LINKS.map(({ id, label, detail, href, icon: Icon }, i) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--tilt': `${i % 2 ? 0.8 : -0.8}deg` }}
            className="tilt group flex items-center gap-3 rounded-xl border border-cream/15 bg-dark-panel p-3 pr-4 hover:border-cream/40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-bright text-2xl text-cream transition-colors group-hover:bg-red">
              <Icon aria-hidden="true" focusable="false" />
            </span>
            <span className="min-w-0">
              <span className="block font-ui text-lg font-semibold leading-tight text-cream">{label}</span>
              <span className="block truncate text-sm text-muted-cream">{detail}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
