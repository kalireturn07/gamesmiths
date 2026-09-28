/*
 * Site-wide settings: club name, logo and header navigation.
 */

export const CLUB = {
  name: 'Gamesmiths',
  subtitle: 'BEC Digital Arts Club',
  college: 'Basaveshwar Engineering College, Bagalkot',
}

export const LOGO = {
  // The official logo, in /public. `file` is the full logo with the wordmark;
  // `mark` is the square blacksmith emblem cropped from it for small spots.
  file: 'logo.webp',
  mark: 'logo-mark.webp',
  alt: 'Gamesmiths logo: a blacksmith forging a glowing sword at an anvil, under a banner with a game controller',
}

// Relative paths (no leading slash) so they work when the site is served from a
// sub-folder, e.g. GitHub Pages.
export const logoSrc = LOGO.file
export const logoMarkSrc = LOGO.mark

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
