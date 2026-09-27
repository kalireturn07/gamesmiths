import { cn } from '../lib/cn.js'

export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8', className)} {...rest}>
      {children}
    </Tag>
  )
}
