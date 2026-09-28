import { cn } from '../lib/cn.js'
import { useInView } from '../lib/useInView.js'

/**
 * Fades + slides its children in the first time they scroll into view.
 *
 * from:   where it comes from, e.g. { y: '90px', r: '-18deg', s: 0.85 }
 *         (default: 22px lower).
 * spring: settle with a little bounce instead of a plain ease-out.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, from, spring = false, className, style, children, ...rest }) {
  const [ref, inView] = useInView()
  const vars = {}
  if (delay) vars['--reveal-delay'] = `${delay}ms`
  if (from?.x !== undefined) vars['--from-x'] = from.x
  if (from?.y !== undefined) vars['--from-y'] = from.y
  if (from?.r !== undefined) vars['--from-r'] = from.r
  if (from?.s !== undefined) vars['--from-s'] = from.s
  return (
    <Tag
      ref={ref}
      className={cn('reveal', spring && 'reveal-spring', inView && 'is-visible', className)}
      style={{ ...style, ...vars }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
