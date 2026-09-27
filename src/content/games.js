import { GiChessKnight, GiCrosshair, GiJoystick, GiSmartphone, GiSoccerBall, GiTargeted } from 'react-icons/gi'

/*
 * GAMES IN ROTATION (the "Choose your poison" carousel)
 * ------------------------------------------------------
 *   name    – shown on the card
 *   genre   – used for the filter chips (chips are built from these automatically)
 *   meta    – small line under the name
 *   icon    – Game Icons glyph used on the generated cover art
 *   accent  – colour of the generated cover art
 *   cover   – OPTIONAL image in /public, e.g. 'games/valorant.webp' (no leading slash).
 *             Use your own tournament photos or art you have the rights to;
 *             official game key art is usually copyrighted.
 */
export const GAMES = [
  { name: 'Valorant', genre: 'FPS', meta: '5v5 • PC', icon: GiCrosshair, accent: '#e0485a' },
  { name: 'CS2', genre: 'FPS', meta: '5v5 • PC', icon: GiTargeted, accent: '#d98a2b' },
  { name: 'EA FC / FIFA', genre: 'Sports', meta: '1v1 • Console / PC', icon: GiSoccerBall, accent: '#2f9d5c' },
  { name: 'BGMI / Mobile Legends', genre: 'Mobile', meta: 'Squad • Mobile', icon: GiSmartphone, accent: '#c79a34' },
  { name: 'Chess Blitz', genre: 'Strategy', meta: '1v1 • Online', icon: GiChessKnight, accent: '#8a7462' },
  { name: 'Retro Arcade Cup', genre: 'Retro', meta: 'Various • Fun', icon: GiJoystick, accent: '#6b3fd1' },
]
