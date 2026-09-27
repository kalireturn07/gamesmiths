import { FOOTER } from '../content/copy.js'
import { CLUB, logoSrc } from '../content/site.js'
import { SectionContext } from '../lib/section.js'
import Container from './Container.jsx'
import SocialLinks from './SocialLinks.jsx'
import { CornerSparks } from './SparkStar.jsx'

export default function Footer() {
  return (
    <SectionContext value={{ id: null, tone: 'dark' }}>
      <footer className="tone-dark relative overflow-hidden border-t border-cream/10 bg-dark-panel py-16 text-muted-cream">
        <CornerSparks />
        <Container className="relative">
          <div className="flex flex-col items-center text-center">
            <img src={logoSrc} alt="" width="64" height="64" className="size-16 rounded-xl" />
            <p className="mt-5 font-display text-lg font-bold uppercase tracking-[0.18em] text-cream">
              {CLUB.name} <span aria-hidden="true" className="text-ember">·</span>
              <span className="sr-only">,</span> {CLUB.subtitle}
            </p>
            <p className="mt-3 max-w-md text-balance italic">{FOOTER.tagline}</p>

            <nav aria-label="Footer" className="mt-8">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {FOOTER.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-sm font-medium text-cream underline-offset-4 hover:text-ember hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <SocialLinks variant="icons" className="mt-8" />
          </div>

          <div className="mt-12 border-t border-cream/10 pt-6 text-center text-sm">
            <p>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {CLUB.name}, {CLUB.subtitle} ·{' '}
              {CLUB.college}
            </p>
            <p className="mt-1">{FOOTER.disclaimer}</p>
          </div>
        </Container>
      </footer>
    </SectionContext>
  )
}
