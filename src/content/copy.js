import {
  GiAnvilImpact,
  GiCampfire,
  GiConsoleController,
  GiCrossedSwords,
  GiCube,
  GiDiceTwentyFacesOne,
  GiDramaMasks,
  GiGamepad,
  GiGearHammer,
  GiGears,
  GiHammerDrop,
  GiHourglass,
  GiInfinity,
  GiLaurelsTrophy,
  GiMegaphone,
  GiPaintBrush,
  GiPaintBucket,
  GiPalette,
  GiPencilRuler,
  GiRocketFlight,
  GiThreeFriends,
  GiTombstone,
  GiTrophyCup,
} from 'react-icons/gi'
import { GAMES } from './games.js'

/*
 * ALL PAGE COPY LIVES HERE, grouped by section, top to bottom.
 * Edit the text freely; the layout code in src/sections/ doesn't need to change.
 *
 * Icons come from Game Icons via react-icons: browse https://react-icons.github.io/react-icons/icons/gi/
 * Colours are one of: 'red', 'blue', 'gold', 'purple', 'green'.
 * Event dates live in events.js, the game lineup in games.js, and links +
 * the sign-up form in links.js.
 */

// The three pillars. Used for the hero chips and the event tags.
export const PILLARS = {
  play: { label: 'Play', icon: GiGamepad, color: 'red' },
  build: { label: 'Build', icon: GiAnvilImpact, color: 'blue' },
  create: { label: 'Create', icon: GiPaintBrush, color: 'gold' },
}

// HEADER: the scribbled note next to the Join button (big screens only)
export const HEADER = {
  note: ['Touch grass', '(after this)'],
}

// 1. HERO
export const HERO = {
  eyebrow: 'Gamesmiths · BEC Digital Arts Club',
  headline: ['Same games.', 'New friends.', 'A better'],
  headlineAccent: 'you.',
  tagline: 'Every legend starts as a blank canvas — or an unranked noob.',
  taglineAccent: 'Let’s forge yours.',
  primaryCta: { label: 'Join the Forge', href: '#join' },
  secondaryCta: { label: 'See what we do', href: '#pillars' },

  // The corkboard of notes beside the headline
  board: {
    todoTitle: 'To do:',
    todo: [
      { text: 'Play', done: true },
      { text: 'Build', done: true },
      { text: 'Create', done: true },
      { text: 'Make friends', done: true },
      { text: 'Pass the sem', done: true },
      { text: 'Repeat', done: false },
    ],
    stamp: ['Git gud', '(together)'],
    note: 'Just one more match…',
    clock: { time: '3:27 AM', caption: 'Still coding…' },
    skillIssue: ['Skill issue?', 'Join Gamesmiths.'],
    sticky: ['Good games.', 'Better people.'],
  },
}

// The strip under the hero. Honest numbers only. Swap in real ones (members,
// events run) once you have them.
export const STATS = [
  { value: '3', label: 'Pillars: play, build, create', icon: GiAnvilImpact },
  { value: `${GAMES.length}`, label: 'Games in rotation', icon: GiGamepad },
  { value: '48h', label: 'Game jams (bring snacks)', icon: GiHourglass },
  { value: '∞', label: 'Memories (and rage moments)', icon: GiInfinity },
]

// The "Upcoming Events" panel in the hero. The events come from events.js.
export const UPCOMING = {
  title: 'Upcoming Events',
  note: ['Same servers.', 'Bigger stories.'],
  count: 4,
  registerLabel: 'Register',
  allLink: { label: 'Full roadmap', href: '#events' },
}

// 2. WHAT WE ACTUALLY DO (the four coloured cards)
export const WHAT_WE_DO = {
  kicker: 'Three pillars, one forge',
  title: 'What We Actually Do',
  cards: [
    {
      title: 'Play',
      color: 'red',
      icon: GiGamepad,
      badge: GiTrophyCup,
      text: 'Weekly casual sessions and ranked ladders across Valorant, CS2, EA FC/FIFA, BGMI, and chess blitz.',
      cta: { label: 'View Games', href: '#play' },
    },
    {
      title: 'Build',
      color: 'blue',
      icon: GiAnvilImpact,
      badge: GiGearHammer,
      text: 'Hands-on game dev workshops starting in Godot — from your first cube to your first playable build.',
      cta: { label: 'Explore Dev Track', href: '#build' },
    },
    {
      title: 'Create',
      color: 'gold',
      icon: GiPaintBrush,
      badge: GiPalette,
      text: 'Digital art sessions — illustration, character design, and concept art for the games and content we ship.',
      cta: { label: 'Explore Art Track', href: '#create' },
    },
    {
      title: 'Jam',
      color: 'purple',
      icon: GiCrossedSwords,
      badge: GiHourglass,
      text: '48-hour game jams where builders and artists team up. No sleep, just a shippable prototype by Sunday night.',
      cta: { label: 'See the Roadmap', href: '#events' },
    },
  ],
}

// 3. WHY GAMESMITHS EXISTS
export const WHY = {
  titleStart: 'Why Gamesmiths',
  titleCircled: 'Exists',
  intro:
    'You already spend hours in-game — or sketching between classes. We’re here to turn that time into something that counts: teammates, tournaments, shipped projects, and a portfolio that doesn’t disappear when the servers shut down.',
  items: [
    {
      title: 'We play together',
      icon: GiThreeFriends,
      text: 'Ranked squads, LAN nights, and inter-college tournaments — not solo queue suffering.',
    },
    {
      title: 'We build together',
      icon: GiGearHammer,
      text: 'Game dev workshops starting in Godot — light, free, and perfect for a first playable build before we ever touch Unity or Unreal.',
    },
    {
      title: 'We create together',
      icon: GiPalette,
      text: 'Digital drawing and illustration sessions — character art, concept sketches, and the visual side of everything we ship.',
    },
  ],
  quote: {
    icon: GiConsoleController,
    text: '‘Git gud’ is basically our mission statement.',
    cite: 'probably a senior, probably right now',
  },
}

// 4. TOURNAMENTS & LEAGUES (the games themselves live in games.js)
export const TOURNAMENTS = {
  kicker: 'Pillar 01 — Play',
  title: 'Tournaments & Leagues',
  note: 'Choose your poison',
  intro:
    'From casual weekend brackets to full inter-college showdowns — organized, ranked, and worth screenshotting.',
  filterAll: 'All',
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
  color: 'blue',
  kicker: 'Pillar 02 — Build',
  title: 'The Game Dev Track',
  intro:
    'You don’t need experience. You need curiosity — we start in Godot, light and free, before anyone touches Unity or Unreal.',
  cta: { label: 'Start building', href: '#join' },
  steps: [
    {
      title: 'Foundations',
      icon: GiCube,
      text: 'Engine basics in Godot, version control with Git, and your first moving sprite.',
    },
    {
      title: 'Systems',
      icon: GiGears,
      text: 'Combat, physics, UI, and the age-old struggle of getting your character to not clip through walls.',
    },
    {
      title: 'Ship It',
      icon: GiRocketFlight,
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
  color: 'gold',
  kicker: 'Pillar 03 — Create',
  title: 'The Digital Arts Track',
  intro: 'No fine-arts degree required. Bring a tablet, a mouse, or just patience — we’ll teach the rest.',
  cta: { label: 'Start drawing', href: '#join' },
  steps: [
    {
      title: 'Foundations',
      icon: GiPencilRuler,
      text: 'Digital drawing basics — anatomy, perspective, and getting comfortable in Krita or Procreate.',
    },
    {
      title: 'Style & Character',
      icon: GiDramaMasks,
      text: 'Concept art, character design, and building a visual style that’s actually yours.',
    },
    {
      title: 'Ship It',
      icon: GiPaintBucket,
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
      note: 'yellow',
      text: 'Your DBMS attendance: Critical Miss. Your attendance here: guaranteed XP.',
    },
    {
      icon: GiTombstone,
      note: 'pink',
      text: 'Rage-quitting a match is allowed. Rage-quitting the club is not — we don’t do permadeath.',
    },
    {
      icon: GiCampfire,
      note: 'blue',
      text: 'We revive teammates. We do not revive your GPA. That’s between you and the bonfire.',
    },
    {
      icon: GiHammerDrop,
      note: 'green',
      text: 'No smurfing in intra-college matches — we will find you, and we will nerf you.',
    },
  ],
}

// 8. ROADMAP. The events themselves live in events.js.
export const ROADMAP = {
  kicker: 'The season ahead',
  title: 'Roadmap',
  intro: 'Exact dates get pinned in Discord as the semester takes shape.',
  youAreHere: 'You are here.',
  slogan: ['Same servers.', 'Bigger stories.'],
  fromThis: 'From this…',
  toThis: '…to this.',
  touchGrass: ['Touch grass', '(someday)'],
}

// 9. ROLES YOU CAN APPLY FOR
export const ROLES = {
  kicker: 'Now recruiting',
  title: 'Roles You Can Apply For',
  roles: [
    {
      title: 'Event Leads',
      icon: GiLaurelsTrophy,
      color: 'red',
      text: 'Run tournaments and LAN nights. Herd competitive chaos into a bracket.',
    },
    {
      title: 'Dev Leads',
      icon: GiGearHammer,
      color: 'blue',
      text: 'Guide Godot workshops and jam teams. Debugging other people’s code builds character.',
    },
    {
      title: 'Art Leads',
      icon: GiPalette,
      color: 'gold',
      text: 'Run illustration sessions, design posters, and keep the club’s visual identity sharp.',
    },
    {
      title: 'Community Leads',
      icon: GiMegaphone,
      color: 'purple',
      text: 'Discord, socials, sign-ups. The people who actually reply to your DMs.',
    },
  ],
  cta: { text: 'Want one of these? Tick it on the sign-up form.', label: 'Apply below', href: '#join' },
}

// 10. HOW TO JOIN
export const JOIN = {
  kicker: 'How to Join',
  title: 'Ready to join the party?',
  perks: ['New friends', 'Better games', 'Bigger stories'],
  intro: 'No tryout, no smurf-checking at the door (yet). Just show up.',
  steps: [
    { text: 'Fill the sign-up form below (or scan the QR code at our desk/events).' },
    { text: 'Join our Discord and WhatsApp community for match schedules and jam announcements.' },
    { text: 'Pick a track — Play, Build, Create, or all three. Show up to the first session. That’s it.' },
  ],
  socialsTitle: 'Find us online',
  formTitle: 'Sign-up sheet',
  sticky: ['Good games.', 'Better people.'],
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

