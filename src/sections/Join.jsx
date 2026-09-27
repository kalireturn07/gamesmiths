import { HandCheck } from '../components/Doodles.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SignupForm from '../components/SignupForm.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import StepList from '../components/StepList.jsx'
import StickyNote from '../components/StickyNote.jsx'
import { JOIN } from '../content/copy.js'
import { SectionContext, useSection } from '../lib/section.js'

export default function Join() {
  return (
    <Section id="join" tone="dark" containerClassName="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading kicker={JOIN.kicker} title={JOIN.title} />
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {JOIN.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 font-hand text-2xl text-cream">
              <HandCheck className="size-7 text-cream" tickClassName="text-ember" />
              {perk}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg text-muted-cream">{JOIN.intro}</p>
        <StepList steps={JOIN.steps} className="mt-9" />
        <h3 className="kicker mt-12 text-ember">{JOIN.socialsTitle}</h3>
        <SocialLinks className="mt-4" />
      </Reveal>

      <Reveal delay={150}>
        <NotebookSheet />
      </Reveal>
    </Section>
  )
}

/** The sign-up form on a sheet of lined notebook paper. */
function NotebookSheet() {
  const section = useSection()
  return (
    <SectionContext value={{ ...section, tone: 'cream' }}>
      <div className="tone-cream paper-shadow relative rotate-[0.5deg]">
        <div className="relative rounded-sm bg-paper-light bg-[repeating-linear-gradient(transparent_0_31px,rgb(43_82_196/0.14)_31px_32px)] px-5 pb-9 pt-14 sm:px-10 sm:pl-16">
          {/* margin line + binder holes */}
          <span aria-hidden="true" className="absolute inset-y-0 left-10 hidden w-0.5 bg-red-bright/35 sm:block" />
          <span aria-hidden="true" className="absolute inset-x-8 top-4 flex justify-between">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="size-3.5 rounded-full bg-dark shadow-[inset_0_2px_2px_rgb(0_0_0/0.6)]" />
            ))}
          </span>
          <h3 className="font-marker text-3xl text-ink sm:text-4xl">{JOIN.formTitle}</h3>
          <div className="mt-6">
            <SignupForm />
          </div>
        </div>
        <StickyNote
          color="yellow"
          tilt={8}
          aria-hidden="true"
          className="absolute -right-3 -top-10 w-28 text-center text-lg leading-tight sm:-right-6"
        >
          {JOIN.sticky[0]}
          <br />
          {JOIN.sticky[1]}
        </StickyNote>
      </div>
    </SectionContext>
  )
}
