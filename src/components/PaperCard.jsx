import { cn } from '../lib/cn.js'

const SURFACES = {
  paper: 'texture-paper-light text-ink',
  cream: 'texture-paper text-ink',
  dark: 'texture-dark text-cream',
}

/**
 * A card torn out of a sketchbook. Masks clip shadows, so the shadow lives
 * on the outer wrapper and the torn paper on the inner one. `extra` renders
 * outside the torn area (stickers, tape) so it can overhang the edges.
 */
export default function PaperCard({
  as: Tag = 'div',
  surface = 'paper',
  tilt = 0,
  torn = true,
  extra,
  className,
  style,
  innerClassName,
  children,
  ...rest
}) {
  return (
    <Tag style={{ ...style, '--tilt': `${tilt}deg` }} className={cn('tilt paper-shadow relative', className)} {...rest}>
      <div className={cn('h-full p-6 sm:p-7', torn ? 'torn' : 'rounded-xl', SURFACES[surface], innerClassName)}>
        {children}
      </div>
      {extra}
    </Tag>
  )
}
