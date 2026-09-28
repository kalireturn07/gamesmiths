/*
 * Site-wide settings: club name, logo and header navigation.
 */

export const CLUB = {
  name: 'Gamesmiths',
  subtitle: 'BEC Digital Arts Club',
  college: 'Basaveshwar Engineering College, Bagalkot',
}

export const LOGO = {
  // TODO(launch): replace with the official Gamesmiths logo. Drop the file into
  // /public (e.g. public/logo.png) and point `file` at it, with no leading
  // slash. Then regenerate the favicons: see README → "Swapping in the real logo".
  file: 'logo.svg',
  alt: 'Gamesmiths logo: a blacksmith’s hammer raised over a glowing sword on an anvil',
}

// A relative path (no leading slash) so it works when the site is served from a
// sub-folder, e.g. GitHub Pages.
export const logoSrc = LOGO.file

// The "chapter" shown in the header as you scroll. `ids` are the section ids
// that belong to each chapter, in page order.
export const CHAPTERS = [
  { label: 'Intro', ids: ['top'] },
  { label: 'What we do', ids: ['pillars'] },
  { label: 'Why we exist', ids: ['about'] },
  { label: 'Play', ids: ['play'] },
  { label: 'Build', ids: ['build', 'dev-lab'] },
  { label: 'Create', ids: ['create', 'art-process', 'art-styles'] },
  { label: 'House rules', ids: ['rules'] },
  { label: 'Roadmap', ids: ['events'] },
  { label: 'The guild', ids: ['guild'] },
  { label: 'GG', ids: ['finale'] },
]
