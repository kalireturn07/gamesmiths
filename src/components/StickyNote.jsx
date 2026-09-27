import { cn } from '../lib/cn.js'

const COLORS = {
  yellow: 'bg-note',
  pink: 'bg-note-pink',
  blue: 'bg-note-blue',
  green: 'bg-note-green',
  white: 'bg-paper-light',
}

/**
 * A sticky note / scrap of paper in handwriting. `fix` is how it's stuck
 * on: "tape", "pin" or nothing. `tilt` is in degrees.
 */
export default function StickyNote({
  as: Tag = 'div',
  color = 'yellow',
  tilt = 0,
  fix = 'tape',
  className,
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      style={{ ...style, '--tilt': `${tilt}deg` }}
      className={cn('note tilt px-4 pb-4 pt-5', COLORS[color], className)}
      {...rest}
    >
      {fix === 'tape' && <span aria-hidden="true" className="tape -top-3 left-1/2 w-20 -translate-x-1/2 -rotate-3" />}
      {fix === 'pin' && <span aria-hidden="true" className="pin left-1/2 top-1.5 -translate-x-1/2" />}
      {children}
    </Tag>
  )
}
