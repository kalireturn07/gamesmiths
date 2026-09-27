import {
  GiAnvilImpact,
  GiCrossedSwords,
  GiHourglass,
  GiPaintBrush,
  GiScrollQuill,
  GiTrophyCup,
} from 'react-icons/gi'

/*
 * ROADMAP / UPCOMING EVENTS
 * -------------------------
 * Update this list each semester; both the hero's "Upcoming Events" panel
 * and the roadmap timeline read from it. Events show in the order listed.
 *
 *   week_or_date  – short label: "Week 3", "12 Oct", "Oct 12–13"…
 *   title         – event name
 *   description   – one short sentence
 *   pillars       – optional tags: any of 'play', 'build', 'create'
 *   icon          – optional Game Icons glyph for the thumbnail
 *   now           – set on the current/next event: it gets the "You are here"
 *                   marker and the hero panel starts from it
 *   register_url  – optional sign-up link (defaults to the Join section)
 *   image         – optional thumbnail in /public, e.g. 'events/jam.webp'
 *
 * TODO(launch): swap the "Week N" labels for real dates, and add
 * register_url links if events get their own sign-up forms.
 */
export const EVENTS = [
  {
    week_or_date: 'Week 1',
    title: 'Orientation & sign-ups',
    description: 'Kickoff for the semester.',
    pillars: ['play', 'build', 'create'],
    icon: GiScrollQuill,
    now: true,
  },
  {
    week_or_date: 'Week 3',
    title: 'First casual tournament',
    description: 'Low stakes, high chaos. Come test the waters.',
    pillars: ['play'],
    icon: GiCrossedSwords,
  },
  {
    week_or_date: 'Week 5',
    title: 'Digital Art Workshop begins',
    description: 'Illustration fundamentals — tablets provided, talent optional.',
    pillars: ['create'],
    icon: GiPaintBrush,
  },
  {
    week_or_date: 'Week 6',
    title: 'Game Dev Bootcamp begins',
    description: 'Godot fundamentals, in-person, snacks included.',
    pillars: ['build'],
    icon: GiAnvilImpact,
  },
  {
    week_or_date: 'Week 10',
    title: '48-hour Game Jam',
    description: 'Builders and artists team up, survive on instant noodles.',
    pillars: ['build', 'create'],
    icon: GiHourglass,
  },
  {
    week_or_date: 'Week 14',
    title: 'Inter-college Championship',
    description: 'The big one. Bring your A-game and your squad.',
    pillars: ['play'],
    icon: GiTrophyCup,
  },
]
