import { FOOTER } from '../content/copy.js'
import { CLUB, logoSrc } from '../content/site.js'
import { SectionContext } from '../lib/section.js'
import Container from './Container.jsx'
import { DoodleController, DoodleSparkle, DoodleStar } from './Doodles.jsx'
import SocialLinks from './SocialLinks.jsx'
import Wordmark from './Wordmark.jsx'

export default function Footer() {
  return (
    <SectionContext value={{ id: null, tone: 'dark' }}>
      <footer className="tone-dark relative overflow-hidden border-t border-cream/10 bg-dark-panel/70 pb-10 pt-16 text-muted-cream">
        <DoodleController className="absolute -bottom-6 right-[6%] hidden h-28 w-40 rotate-12 text-cream/15 md:block" />
        <DoodleStar className="absolute left-[4%] top-10 size-7 text-cream/25" />
        <DoodleSparkle className="absolute right-[18%] top-12 size-6 text-ember/60" />

        <Container className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-4">
              <img src={logoSrc} alt="" width="64" height="64" className="size-16 rounded-xl" />
              <Wordmark className="text-cream" />
            </div>
            <p className="mt-5 max-w-md -rotate-1 font-hand text-2xl leading-snug text-cream">{FOOTER.tagline}</p>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
                {FOOTER.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-sm font-ui text-lg font-semibold uppercase tracking-wider text-cream underline-offset-4 hover:text-ember hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <SocialLinks variant="icons" />
          </div>
        </Container>

        <Container className="relative mt-12">
          <div className="border-t border-cream/10 pt-6 text-center text-sm">
            <p>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {CLUB.name} · {CLUB.subtitle} ·{' '}
              {CLUB.college}
            </p>
            <p className="mt-1">{FOOTER.disclaimer}</p>
          </div>
        </Container>
      </footer>
    </SectionContext>
  )
}
