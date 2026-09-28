import { useInView } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/cn.js'
import { useHydrated } from '../lib/useHydrated.js'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe.js'

const TOKEN =
  /(#.*$)|("[^"]*")|\b(extends|const|var|func|if|not|and|or|return|elif|else|for|in|while)\b|\b([A-Z][A-Za-z0-9_]*)\b|\b([a-z_][a-z0-9_]*)(?=\()|(-?\b\d+(?:\.\d+)?\b)/gm

const STYLES = {
  comment: 'text-muted-cream italic',
  string: 'text-gold-light',
  keyword: 'text-ember',
  type: 'text-green-light',
  call: 'text-blue-light',
  number: 'text-purple-light',
  plain: 'text-cream',
}

/** Splits GDScript into [{ text, kind }] tokens for colouring. */
function tokenize(code) {
  const tokens = []
  let last = 0
  for (const m of code.matchAll(TOKEN)) {
    if (m.index > last) tokens.push({ text: code.slice(last, m.index), kind: 'plain' })
    const kind = m[1] ? 'comment' : m[2] ? 'string' : m[3] ? 'keyword' : m[4] ? 'type' : m[5] ? 'call' : 'number'
    tokens.push({ text: m[0], kind })
    last = m.index + m[0].length
  }
  if (last < code.length) tokens.push({ text: code.slice(last), kind: 'plain' })
  return tokens
}

/**
 * Syntax-highlighted code that types itself out when scrolled into view,
 * then calls `onDone`. The full code is in the prerendered HTML.
 */
export default function CodeEditor({ code, cps = 95, onDone, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotionSafe()
  const hydrated = useHydrated()
  const tokens = useMemo(() => tokenize(code), [code])
  const [typed, setTyped] = useState(0)
  const animate = hydrated && !reduce
  const shown = animate ? typed : code.length

  useEffect(() => {
    if (!animate || !inView) return undefined
    let frame = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const n = Math.min(code.length, Math.floor(((now - start) / 1000) * cps))
      setTyped(n)
      if (n < code.length) frame = requestAnimationFrame(tick)
      else onDone?.()
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animate, inView, code.length, cps, onDone])

  useEffect(() => {
    if (!animate) onDone?.()
  }, [animate, onDone])

  // Cut the token list at the typed position, then split it into lines.
  let remaining = shown
  const lines = [[]]
  for (const token of tokens) {
    if (remaining <= 0) break
    const text = token.text.slice(0, remaining)
    remaining -= token.text.length
    text.split('\n').forEach((part, i) => {
      if (i > 0) lines.push([])
      if (part) lines.at(-1).push({ kind: token.kind, text: part })
    })
  }
  const typing = animate && shown < code.length
  const lineCount = code.split('\n').length
  const cursor = (
    <span className={cn('ml-px inline-block h-4 w-2 translate-y-0.5 bg-ember', typing ? '' : 'animate-pulse')} />
  )

  // Each line is its own row, so long lines can wrap on small screens and
  // still line up with their line number.
  return (
    <div ref={ref} className={cn('font-mono text-[0.78rem] leading-6 sm:text-[0.85rem]', className)}>
      <pre className="sr-only">
        <code>{code}</code>
      </pre>
      {/* reserve the full height so nothing below jumps while it types */}
      <div aria-hidden="true" style={{ minHeight: `${lineCount * 1.5}rem` }}>
        {lines.map((line, n) => (
          <div key={n} className="flex">
            <span className="w-8 shrink-0 select-none pr-4 text-right text-muted-cream/75">{n + 1}</span>
            <span className="min-w-0 flex-1 whitespace-pre-wrap [overflow-wrap:anywhere] [tab-size:4]">
              {line.map((t, i) => (
                <span key={i} className={STYLES[t.kind]}>
                  {t.text}
                </span>
              ))}
              {n === lines.length - 1 && cursor}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
