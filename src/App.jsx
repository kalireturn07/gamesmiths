import { MotionConfig } from 'motion/react'
import Preloader from './components/anim/Preloader.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import { DIGITAL_ARTS_TRACK, GAME_DEV_TRACK } from './content/copy.js'
import ArtProcess from './sections/ArtProcess.jsx'
import ArtStyles from './sections/ArtStyles.jsx'
import DevLab from './sections/DevLab.jsx'
import Finale from './sections/Finale.jsx'
import Guild from './sections/Guild.jsx'
import Hero from './sections/Hero.jsx'
import HouseRules from './sections/HouseRules.jsx'
import Roadmap from './sections/Roadmap.jsx'
import Tournaments from './sections/Tournaments.jsx'
import Track from './sections/Track.jsx'
import WhatWeDo from './sections/WhatWeDo.jsx'
import Why from './sections/Why.jsx'

// Page order. Paper sheets ("cream") and the dark wall ("dark") alternate.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Header />
      <main id="main">
        <Hero />
        <WhatWeDo />
        <Why />
        <Tournaments />
        <Track track={GAME_DEV_TRACK} tone="cream" tear="a" />
        <DevLab />
        <Track track={DIGITAL_ARTS_TRACK} tone="cream" tear="b" mirrored />
        <ArtProcess />
        <ArtStyles />
        <HouseRules />
        <Roadmap />
        <Guild />
        <Finale />
      </main>
      <Footer />
    </MotionConfig>
  )
}
