import { useEffect, useRef, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { CLUB, LOGO, NAV_LINKS, logoSrc } from '../content/site.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'
import ButtonLink from './ButtonLink.jsx'
import Container from './Container.jsx'

/** Tracks which nav-linked section is in the middle of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    // Watch every section, so the highlight clears on ones without a nav link.
    document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ids.includes(active) ? active : null
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const active = useActiveSection(NAV_LINKS.map((link) => link.href.slice(1)))

  // Close the mobile menu on Escape (and hand focus back to the toggle).
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close it when the window grows past the mobile breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onChange = (event) => event.matches && setOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const linkClass = (href) =>
    cn(
      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-cream',
      active === href.slice(1) ? 'text-cream underline decoration-ember decoration-2 underline-offset-8' : 'text-muted-cream',
    )

  return (
    <SectionContext value={{ id: null, tone: 'dark' }}>
      <header className="tone-dark sticky top-0 z-50 border-b border-cream/10 bg-dark/95 backdrop-blur-md supports-backdrop-filter:bg-dark/80">
        <Container className="flex h-16 items-center justify-between gap-4">
          <a href="#top" aria-label={`${CLUB.name}, back to top`} className="flex items-center gap-3 rounded-md">
            <img src={logoSrc} alt={LOGO.alt} width="36" height="36" className="size-9 rounded-md" />
            <span className="font-display text-lg font-bold uppercase tracking-[0.12em] text-cream">{CLUB.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={linkClass(link.href)}
                    aria-current={active === link.href.slice(1) ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="#join" size="sm" className="hidden sm:inline-flex">
              Join the Forge
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-2xl text-cream hover:bg-cream/10 lg:hidden"
            >
              {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
            </button>
          </div>
        </Container>

        <div id="mobile-nav" hidden={!open} className="border-t border-cream/10 bg-dark lg:hidden">
          <Container as="nav" aria-label="Mobile" className="py-4">
            <ul className="grid gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(linkClass(link.href), 'block px-2 py-3 text-base')}
                    aria-current={active === link.href.slice(1) ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href="#join" onClick={() => setOpen(false)} className="mt-4 w-full sm:hidden">
              Join the Forge
            </ButtonLink>
          </Container>
        </div>
      </header>
    </SectionContext>
  )
}
