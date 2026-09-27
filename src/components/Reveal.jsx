import { cn } from '../lib/cn.js'
import { useInView } from '../lib/useInView.js'

/** Fades + slides its children in the first time they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
