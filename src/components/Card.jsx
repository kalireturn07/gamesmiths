import { cn } from '../lib/cn.js'
import { useTone } from '../lib/section.js'

/** Rounded panel that matches the surrounding section. */
export default function Card({ as: Tag = 'div', hover = true, className, children, ...rest }) {
  const t = useTone()
  return (
    <Tag className={cn('rounded-2xl p-6 sm:p-7', t.panel, hover && 'lift', hover && t.panelHover, className)} {...rest}>
      {children}
    </Tag>
  )
}
