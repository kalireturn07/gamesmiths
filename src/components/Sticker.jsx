import { accent } from '../lib/accents.js'
import { cn } from '../lib/cn.js'

const SIZES = {
  sm: 'size-12 text-2xl border-[3px]',
  md: 'size-16 text-[2rem] border-4',
  lg: 'size-24 text-[3rem] border-[5px]',
  xl: 'size-32 text-[4.25rem] border-[6px]',
  // lg on phones, xl from the sm breakpoint up
  'lg-xl': 'size-24 text-[3rem] border-[5px] sm:size-32 sm:text-[4.25rem] sm:border-[6px]',
}

/**
 * A die-cut vinyl sticker: an icon on a coloured disc with a white border.
 * `tilt` is in degrees. It wiggles on hover (unless reduced motion is on).
 */
export default function Sticker({ icon: Icon, color = 'red', size = 'md', tilt = 0, className }) {
  const a = accent(color)
  return (
    <span
      aria-hidden="true"
      style={{ '--tilt': `${tilt}deg` }}
      className={cn(
        'wiggle inline-flex shrink-0 items-center justify-center rounded-full border-paper-light shadow-[0_10px_16px_-8px_rgb(0_0_0/0.6)]',
        SIZES[size],
        a.bg,
        a.on,
        className,
      )}
    >
      <Icon focusable="false" />
    </span>
  )
}
