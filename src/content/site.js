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

// Header links. `href` must match a section id on the page.
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#pillars' },
  { label: 'Play', href: '#play' },
  { label: 'Build', href: '#build' },
  { label: 'Create', href: '#create' },
  { label: 'Events', href: '#events' },
  { label: 'Roles', href: '#roles' },
]
