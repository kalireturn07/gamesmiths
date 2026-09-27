import {
  GiAnvilImpact,
  GiCampfire,
  GiChessKnight,
  GiConsoleController,
  GiCrossedSwords,
  GiCrosshair,
  GiDiceTwentyFacesOne,
  GiFlatHammer,
  GiGamepad,
  GiGearHammer,
  GiHammerDrop,
  GiJoystick,
  GiLaurelsTrophy,
  GiMegaphone,
  GiPaintBrush,
  GiPalette,
  GiSmartphone,
  GiSoccerBall,
  GiTargeted,
  GiTombstone,
  GiTrophyCup,
} from 'react-icons/gi'

/*
 * ALL PAGE COPY LIVES HERE, grouped by section, top to bottom.
 * Edit the text freely; the layout code in src/sections/ doesn't need to change.
 * Icons come from Game Icons via react-icons: browse https://react-icons.github.io/react-icons/icons/gi/
 * Event dates live in events.js. Links and the sign-up form live in links.js.
 */

// The three pillars. Used for the hero chips and the roadmap event tags.
export const PILLARS = {
  play: { label: 'Play', icon: GiGamepad },
  build: { label: 'Build', icon: GiFlatHammer },
  create: { label: 'Create', icon: GiPaintBrush },
}

// 1. HERO
export const HERO = {
  eyebrow: 'Basaveshwar Engineering College · Bagalkot',
  tagline: 'Every legend starts as a blank canvas — or an unranked noob. Let’s forge yours.',
  primaryCta: { label: 'Join the Forge', href: '#join' },
  secondaryCta: { label: 'See what we do', href: '#pillars' },
}

// 2. WHY GAMESMITHS EXISTS
export const WHY = {
  kicker: 'About the club',
  title: 'Why Gamesmiths Exists',
  intro:
    'You already spend hours in-game — or sketching between classes. We’re here to turn that time into something that counts: teammates, tournaments, shipped projects, and a portfolio that doesn’t disappear when the servers shut down.',
  items: [
    {
      title: 'We play together',
      text: 'Ranked squads, LAN nights, and inter-college tournaments — not solo queue suffering.',
    },
    {
      title: 'We build together',
      text: 'Game dev workshops starting in Godot — light, free, and perfect for a first playable build before we ever touch Unity or Unreal.',
    },
    {
      title: 'We create together',
      text: 'Digital drawing and illustration sessions — character art, concept sketches, and the visual side of everything we ship.',
    },
  ],
  quote: {
    icon: GiConsoleController,
    text: '‘Git gud’ is basically our mission statement.',
    cite: 'probably a senior, probably right now',
  },
}

// 3. WHAT WE ACTUALLY DO
export const WHAT_WE_DO = {
  kicker: 'Three pillars, one forge',
  title: 'What We Actually Do',
  cards: [
    {
      title: 'Play',
      icon: GiGamepad,
      text: 'Weekly casual sessions and ranked ladders across Valorant, CS2, EA FC/FIFA, BGMI, and chess blitz.',
    },
    {
      title: 'Build',
      icon: GiFlatHammer,
      text: 'Hands-on game dev workshops starting in Godot — from your first cube to your first playable build.',
    },
    {
      title: 'Create',
      icon: GiPaintBrush,
      text: 'Digital art sessions — illustration, character design, and concept art for the games and content we ship.',
    },
    {
      title: 'Jam',
      icon: GiCrossedSwords,
      text: '48-hour game jams where builders and artists team up. No sleep, just a shippable prototype by Sunday night.',
    },
  ],
}

// 4. TOURNAMENTS & LEAGUES
export const TOURNAMENTS = {
  kicker: 'Pillar 01 — Play',
  title: 'Tournaments & Leagues',
  intro:
    'From casual weekend brackets to full inter-college showdowns — organized, ranked, and worth screenshotting.',
  games: [
    { name: 'Valorant', icon: GiCrosshair },
    { name: 'CS2', icon: GiTargeted },
    { name: 'EA FC / FIFA', icon: GiSoccerBall },
    { name: 'BGMI / Mobile Legends', icon: GiSmartphone },
    { name: 'Chess Blitz', icon: GiChessKnight },
    { name: 'Retro Arcade Cup', icon: GiJoystick },
  ],
  format: {
    title: 'The Format',
    icon: GiTrophyCup,
    // Read as one sentence: "Intra-college league → inter-college bracket → campus finals…"
    stages: ['Intra-college league', 'inter-college bracket', 'campus finals with an actual prize pool.'],
  },
}

// 5. THE GAME DEV TRACK
export const GAME_DEV_TRACK = {
  id: 'build',
  kicker: 'Pillar 02 — Build',
  title: 'The Game Dev Track',
  intro:
    'You don’t need experience. You need curiosity — we start in Godot, light and free, before anyone touches Unity or Unreal.',
  steps: [
    {
      title: 'Foundations',
      text: 'Engine basics in Godot, version control with Git, and your first moving sprite.',
    },
    {
      title: 'Systems',
      text: 'Combat, physics, UI, and the age-old struggle of getting your character to not clip through walls.',
    },
    {
      title: 'Ship It',
      text: 'Team up for a 48-hour game jam and walk away with an actual playable build — bugs included.',
    },
  ],
  quote: {
    icon: GiAnvilImpact,
    text: 'Every engine crash is just the game teaching you patience.',
  },
}

// 6. THE DIGITAL ARTS TRACK
export const DIGITAL_ARTS_TRACK = {
  id: 'create',
  kicker: 'Pillar 03 — Create',
  title: 'The Digital Arts Track',
  intro: 'No fine-arts degree required. Bring a tablet, a mouse, or just patience — we’ll teach the rest.',
  steps: [
    {
      title: 'Foundations',
      text: 'Digital drawing basics — anatomy, perspective, and getting comfortable in Krita or Procreate.',
    },
    {
      title: 'Style & Character',
      text: 'Concept art, character design, and building a visual style that’s actually yours.',
    },
    {
      title: 'Ship It',
      text: 'Illustrate real assets for a jam team, an event poster, or the club’s next drop.',
    },
  ],
  quote: {
    icon: GiPaintBrush,
    text: 'Redoing the same sketch five times isn’t failure. It’s called ‘iteration.’',
  },
}

// 7. HOUSE RULES
export const HOUSE_RULES = {
  kicker: 'House Rules',
  callout: {
    headline: 'YOU DIED',
    aside: '(of boredom, in a club that never posts events.)',
    respawn: 'Respawn point: Gamesmiths.',
  },
  rules: [
    {
      icon: GiDiceTwentyFacesOne,
      text: 'Your DBMS attendance: Critical Miss. Your attendance here: guaranteed XP.',
    },
    {
      icon: GiTombstone,
      text: 'Rage-quitting a match is allowed. Rage-quitting the club is not — we don’t do permadeath.',
    },
    {
      icon: GiCampfire,
      text: 'We revive teammates. We do not revive your GPA. That’s between you and the bonfire.',
    },
    {
      icon: GiHammerDrop,
      text: 'No smurfing in intra-college matches — we will find you, and we will nerf you.',
    },
  ],
}

// 8. ROADMAP. The events themselves live in events.js.
export const ROADMAP = {
  kicker: 'This semester',
  title: 'Roadmap & Upcoming Events',
  intro: 'Exact dates get pinned in Discord as the semester takes shape.',
}

// 9. ROLES YOU CAN APPLY FOR
export const ROLES = {
  kicker: 'Now recruiting',
  title: 'Roles You Can Apply For',
  roles: [
    {
      title: 'Event Leads',
      icon: GiLaurelsTrophy,
      text: 'Run tournaments and LAN nights. Herd competitive chaos into a bracket.',
    },
    {
      title: 'Dev Leads',
      icon: GiGearHammer,
      text: 'Guide Godot workshops and jam teams. Debugging other people’s code builds character.',
    },
    {
      title: 'Art Leads',
      icon: GiPalette,
      text: 'Run illustration sessions, design posters, and keep the club’s visual identity sharp.',
    },
    {
      title: 'Community Leads',
      icon: GiMegaphone,
      text: 'Discord, socials, sign-ups. The people who actually reply to your DMs.',
    },
  ],
  cta: { text: 'Want one of these? Tick it on the sign-up form.', label: 'Apply below', href: '#join' },
}

// 10. HOW TO JOIN
export const JOIN = {
  kicker: 'Join the Forge',
  title: 'How to Join',
  intro: 'No tryout, no smurf-checking at the door (yet). Just show up.',
  steps: [
    { text: 'Fill the sign-up form below (or scan the QR code at our desk/events).' },
    { text: 'Join our Discord and WhatsApp community for match schedules and jam announcements.' },
    { text: 'Pick a track — Play, Build, Create, or all three. Show up to the first session. That’s it.' },
  ],
  socialsTitle: 'Find us online',
}

// 11. FOOTER
export const FOOTER = {
  tagline: 'May your ping be low, your loot legendary, and your assignments merely tragic.',
  links: [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Join', href: '#join' },
  ],
  disclaimer: 'Game titles are trademarks of their respective owners. We just really like playing them.',
}
