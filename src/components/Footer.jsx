import { FOOTER } from '../content/copy.js'
import { CLUB, logoMarkSrc } from '../content/site.js'
import { SectionContext } from '../lib/section.js'
import Container from './Container.jsx'
import Wordmark from './Wordmark.jsx'

export default function Footer() {
  return (
    <SectionContext value={{ id: null, tone: 'dark' }}>
      <footer className="tone-dark border-t border-cream/10 bg-dark-panel/70 py-10 text-muted-cream">
        <Container className="flex flex-col items-center gap-5 text-center text-sm md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <img src={logoMarkSrc} alt="" width="44" height="44" loading="lazy" className="size-11 rounded-lg bg-white" />
            <Wordmark className="text-cream" />
          </div>
          <div>
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
