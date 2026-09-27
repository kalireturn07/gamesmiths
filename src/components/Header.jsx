import { useEffect, useRef, useState } from 'react'
import { FaGamepad } from 'react-icons/fa6'
import { LuMenu, LuX } from 'react-icons/lu'
import { HEADER } from '../content/copy.js'
import { CLUB, LOGO, NAV_LINKS, logoSrc } from '../content/site.js'
import { cn } from '../lib/cn.js'
import { SectionContext } from '../lib/section.js'
import ButtonLink from './ButtonLink.jsx'
import Container from './Container.jsx'
import { DoodleArrow, ScribbleUnderline } from './Doodles.jsx'
import Wordmark from './Wordmark.jsx'

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
    document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ids.includes(active) ? active : null
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const active = useActiveSection(NAV_LINKS.map((link) => link.href.slice(1)))

  // Escape closes the mobile menu and hands focus back to the toggle.
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

  const isActive = (href) => active === href.slice(1)

  return (
    <SectionContext value={{ id: null, tone: 'cream' }}>
      <header className="tone-cream sticky top-0 z-50 text-ink">
        {/* torn paper background + its shadow */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 drop-shadow-[0_6px_6px_rgb(0_0_0/0.28)]">
          <div className="header-paper absolute inset-0" />
        </div>

        <Container className="flex h-[4.75rem] items-center justify-between gap-4 pb-2.5">
          <a href="#top" aria-label={`${CLUB.name}, back to top`} className="flex items-center gap-2.5 rounded-md">
            <img src={logoSrc} alt={LOGO.alt} width="40" height="40" className="size-10 rounded-lg" />
            <Wordmark className="hidden text-ink min-[380px]:inline-flex" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={isActive(link.href) ? 'location' : undefined}
                    className={cn(
                      'block rounded-md px-2.5 py-2 text-[0.94rem] font-semibold transition-colors hover:text-red-bright xl:px-3',
                      isActive(link.href) ? 'text-red-bright' : 'text-ink',
                    )}
                  >
                    {link.label}
                  </a>
                  {isActive(link.href) && (
                    <ScribbleUnderline className="pointer-events-none absolute inset-x-2 -bottom-1 h-2 text-red-bright" />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <ButtonLink href="#join" size="sm" iconLeft={FaGamepad} className="hidden sm:inline-flex">
                Join the Forge
              </ButtonLink>
              <p
                aria-hidden="true"
                className="pointer-events-none absolute left-full top-1 ml-3 hidden w-28 rotate-[-6deg] font-hand text-[1.05rem] leading-[1.05] text-ink 2xl:block"
              >
                {HEADER.note[0]}
                <br />
                <span className="pl-3">{HEADER.note[1]}</span>
                <DoodleArrow className="absolute -left-7 top-7 h-5 w-9 rotate-[160deg] -scale-y-100 text-ink" />
              </p>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-2xl text-ink hover:bg-ink/10 lg:hidden"
            >
              {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
            </button>
          </div>
        </Container>

        <div id="mobile-nav" hidden={!open} className="lg:hidden">
          <Container as="nav" aria-label="Mobile" className="pb-6">
            <div className="texture-paper-light rounded-xl p-3 shadow-paper">
              <ul className="grid gap-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? 'location' : undefined}
                      className={cn(
                        'block rounded-lg px-3 py-3 text-base font-semibold hover:bg-ink/5',
                        isActive(link.href) ? 'text-red-bright' : 'text-ink',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ButtonLink href="#join" onClick={() => setOpen(false)} iconLeft={FaGamepad} className="mt-3 w-full sm:hidden">
                Join the Forge
              </ButtonLink>
            </div>
          </Container>
        </div>
      </header>
    </SectionContext>
  )
}
