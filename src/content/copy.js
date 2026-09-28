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
 * Event dates live in events.js and the game lineup in games.js.
 */

// The three pillars. Used for the hero chips and the event tags.
export const PILLARS = {
  play: { label: 'Play', icon: GiGamepad, color: 'red' },
  build: { label: 'Build', icon: GiAnvilImpact, color: 'blue' },
  create: { label: 'Create', icon: GiPaintBrush, color: 'gold' },
}

// 1. HERO
export const HERO = {
  eyebrow: 'Gamesmiths · BEC Digital Arts Club',
  headline: ['Same games.', 'New friends.', 'A better'],
  headlineAccent: 'you.',
  // The tagline flips through these words. Screen readers get the full line below.
  taglineStart: 'Every legend starts as',
  flipWords: ['a blank canvas', 'a rough sketch', 'a broken build', 'an unranked noob'],
  taglineAccent: 'Let’s forge yours.',
  srTagline: 'Every legend starts as a blank canvas — or an unranked noob. Let’s forge yours.',
  scrollHint: 'Scroll to explore',

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

// The two tape strips that scroll past under the hero (speed follows your scrolling)
export const MARQUEE = {
  pillars: ['Play', 'Build', 'Create', 'Jam', 'Git gud', 'Ship it', 'Respawn'],
  tools: ['Godot', 'GDScript', 'Git', 'Krita', 'Procreate', 'Layers', 'Ctrl+Z', 'Playtests'],
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
      tag: 'Weekly',
    },
    {
      title: 'Build',
      color: 'blue',
      icon: GiAnvilImpact,
      badge: GiGearHammer,
      text: 'Hands-on game dev workshops starting in Godot — from your first cube to your first playable build.',
      tag: 'Workshops',
    },
    {
      title: 'Create',
      color: 'gold',
      icon: GiPaintBrush,
      badge: GiPalette,
      text: 'Digital art sessions — illustration, character design, and concept art for the games and content we ship.',
      tag: 'Art sessions',
    },
    {
      title: 'Jam',
      color: 'purple',
      icon: GiCrossedSwords,
      badge: GiHourglass,
      text: '48-hour game jams where builders and artists team up. No sleep, just a shippable prototype by Sunday night.',
      tag: '48 hours',
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

// 5b. DEV LAB: the fake editor under the game dev track
export const DEV_LAB = {
  id: 'dev-lab',
  kicker: 'Inside the engine',
  title: 'What a Build Night Looks Like',
  intro: 'Real GDScript, real bugs, real progress. Roughly what’s on screen the week of a jam.',
  project: 'jam_game (Godot)',
  file: 'player.gd',
  code: `extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -420.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
\tif not is_on_floor():
\t\tvelocity.y += gravity * delta

\tif Input.is_action_just_pressed("jump") and is_on_floor():
\t\tvelocity.y = JUMP_VELOCITY

\tvar direction = Input.get_axis("move_left", "move_right")
\tvelocity.x = direction * SPEED

\tmove_and_slide() # please don't clip through the wall`,
  console: [
    { tone: 'info', text: 'Running scene: level_01.tscn' },
    { tone: 'info', text: 'Player spawned at (64, 320)' },
    { tone: 'warn', text: 'WARNING: player clipped through wall. Again.' },
    { tone: 'ok', text: 'Fixed. It was the collision layer. It is always the collision layer.' },
  ],
  logTitle: 'git log --oneline',
  commits: [
    { hash: 'e0a41fb', msg: 'release: jam build v1.0' },
    { hash: '5d2c6e9', msg: 'fix: boss fight was unbeatable' },
    { hash: '18f7b03', msg: 'feat: boss fight' },
    { hash: 'c91e2aa', msg: 'art: new sprite sheet from the art team' },
    { hash: '7be0d44', msg: 'fix: player no longer clips through walls (mostly)' },
    { hash: 'a3f9c21', msg: 'feat: player can jump' },
  ],
}

// 6. THE DIGITAL ARTS TRACK
export const DIGITAL_ARTS_TRACK = {
  id: 'create',
  color: 'gold',
  kicker: 'Pillar 03 — Create',
  title: 'The Digital Arts Track',
  intro: 'No fine-arts degree required. Bring a tablet, a mouse, or just patience — we’ll teach the rest.',
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

// 6b. SKETCH TO SHIP: the pinned, scroll-driven drawing
export const ART_PROCESS = {
  id: 'art-process',
  kicker: 'Sketch to ship',
  title: 'How a Character Gets Made',
  intro: 'Every character our artists hand to a jam team goes through the same five stages. Scroll and watch one happen.',
  file: 'forge_apprentice.kra',
  stages: [
    { title: 'Rough sketch', text: 'Loose shapes, wrong proportions, zero commitment. That’s the point.' },
    { title: 'Line art', text: 'Keep the lines that work, ink them, and pretend the other forty never happened.' },
    { title: 'Flat colours', text: 'Base colours on their own layers, so changing your mind later doesn’t hurt.' },
    { title: 'Shading', text: 'Light from one side, shadow on the other. Suddenly it has weight.' },
    { title: 'Final', text: 'Highlights, a little glow, and it’s ready for a jam game, an event poster, or the club’s next drop.' },
  ],
}

// 6c. THE GALLERY: what the Create track makes
export const ART_STYLES = {
  id: 'art-styles',
  kicker: 'Create · the gallery',
  title: 'What Our Artists Make',
  intro: 'Everything we ship needs art. This is where the Create track ends up.',
  styles: [
    { art: 'character', color: 'red', title: 'Character design', text: 'Heroes, villains, and the shopkeeper everyone remembers.' },
    { art: 'concept', color: 'blue', title: 'Concept art', text: 'Quick paintings that decide how a level feels before anyone builds it.' },
    { art: 'pixel', color: 'green', title: 'Pixel art & sprites', text: 'Characters and tiles for jam games, one deliberate pixel at a time.' },
    { art: 'poster', color: 'gold', title: 'Posters & event art', text: 'Tournament posters, stickers, and the look of every club drop.' },
    { art: 'ui', color: 'purple', title: 'UI & icons', text: 'Health bars, buttons and menus that players actually understand.' },
    { art: 'palette', color: 'red', title: 'Style studies', text: 'Study the greats, break the rules, and find a style that’s actually yours.' },
  ],
  toolsTitle: 'The toolbox',
  tools: ['Krita', 'Procreate', 'Any tablet', 'Even a mouse', 'Layers', 'Ctrl+Z', 'Reference boards', 'Patience'],
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

// 9. THE GUILD: the crews that run the club
export const GUILD = {
  kicker: 'The guild',
  title: 'Who Keeps the Forge Running',
  intro: 'Every tournament, workshop and poster comes from one of these four crews.',
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
}

// 10. FINALE
export const FINALE = {
  kicker: 'That’s the tour',
  pillars: [
    { text: 'Play.', color: 'red' },
    { text: 'Build.', color: 'blue' },
    { text: 'Create.', color: 'gold' },
  ],
  tagline: 'May your ping be low, your loot legendary, and your assignments merely tragic.',
  sticky: ['Good games.', 'Better people.'],
}

// 11. FOOTER
export const FOOTER = {
  disclaimer: 'Game titles are trademarks of their respective owners. We just really like playing them.',
}

