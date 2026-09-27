import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import { DIGITAL_ARTS_TRACK, GAME_DEV_TRACK } from './content/copy.js'
import HouseRules from './sections/HouseRules.jsx'
import Hero from './sections/Hero.jsx'
import Join from './sections/Join.jsx'
import Roadmap from './sections/Roadmap.jsx'
import Roles from './sections/Roles.jsx'
import Tournaments from './sections/Tournaments.jsx'
import Track from './sections/Track.jsx'
import WhatWeDo from './sections/WhatWeDo.jsx'
import Why from './sections/Why.jsx'

// Page order. Alternate dark and cream sections ("the sandwich").
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-cream px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Why />
        <WhatWeDo />
        <Tournaments />
        <Track track={GAME_DEV_TRACK} tone="dark" />
        <Track track={DIGITAL_ARTS_TRACK} tone="cream" mirrored />
        <HouseRules />
        <Roadmap />
        <Roles />
        <Join />
      </main>
      <Footer />
    </>
  )
}
