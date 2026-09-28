import { useEffect, useState } from 'react'
import { CHAPTERS, LOGO, logoSrc } from '../content/site.js'
import { SectionContext } from '../lib/section.js'
import ScrambleText from './anim/ScrambleText.jsx'
import ScrollProgress from './anim/ScrollProgress.jsx'
import Container from './Container.jsx'
import Wordmark from './Wordmark.jsx'

/** Which chapter is in the middle of the screen right now. */
function useChapter() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const chapterOf = new Map()
    CHAPTERS.forEach((chapter, i) => chapter.ids.forEach((id) => chapterOf.set(id, i)))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && chapterOf.has(entry.target.id)) setIndex(chapterOf.get(entry.target.id))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return index
}

/**
 * A strip of torn paper across the top: the wordmark, the chapter you're
 * reading (it scrambles in whenever it changes) and a scroll-progress bar.
 * No links: this site is a guided scroll, not a menu.
 */
export default function Header() {
  const index = useChapter()
  const chapter = CHAPTERS[index]
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <SectionContext value={{ id: null, tone: 'cream' }}>
      <header className="tone-cream sticky top-0 z-50 text-ink">
        <div aria-hidden="true" className="absolute inset-0 -z-10 drop-shadow-[0_6px_6px_rgb(0_0_0/0.28)]">
          <div className="header-paper absolute inset-0" />
        </div>

        <Container className="flex h-[4.75rem] items-center justify-between gap-4 pb-2.5">
          <div className="flex items-center gap-2.5">
            <img src={logoSrc} alt={LOGO.alt} width="40" height="40" className="size-10 rounded-lg" />
            <Wordmark className="hidden text-ink min-[380px]:inline-flex" />
          </div>

          <p aria-hidden="true" className="flex items-baseline gap-2.5 font-ui uppercase">
            <span className="hidden text-sm font-bold tracking-[0.2em] text-muted sm:inline">
              {pad(index + 1)} / {pad(CHAPTERS.length)}
            </span>
            <ScrambleText
              key={chapter.label}
              text={chapter.label}
              trigger="mount"
              duration={450}
              className="text-base font-bold tracking-[0.14em] text-red-bright sm:text-lg"
            />
          </p>
        </Container>

        <ScrollProgress className="absolute inset-x-0 bottom-[11px] h-[3px] bg-red-bright" />
      </header>
    </SectionContext>
  )
}
