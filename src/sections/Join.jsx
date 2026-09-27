import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SignupForm from '../components/SignupForm.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import StepList from '../components/StepList.jsx'
import { JOIN } from '../content/copy.js'

export default function Join() {
  return (
    <Section id="join" tone="dark" containerClassName="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <Reveal className="lg:sticky lg:top-24 lg:self-start">
        <SectionHeading kicker={JOIN.kicker} title={JOIN.title} intro={JOIN.intro} />
        <StepList steps={JOIN.steps} className="mt-10" />
        <h3 className="kicker mt-12 text-ember">{JOIN.socialsTitle}</h3>
        <SocialLinks className="mt-4" />
      </Reveal>

      <Reveal delay={150}>
        <div className="rounded-2xl border border-cream/5 bg-dark-panel p-6 shadow-card sm:p-8">
          <h3 className="font-display text-2xl font-bold tracking-wide text-cream">Sign-up form</h3>
          <div className="mt-6">
            <SignupForm />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
