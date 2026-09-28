import { GiChessKnight, GiCrosshair, GiJoystick, GiParachute, GiSoccerBall, GiTowerFlag } from 'react-icons/gi'

/*
 * GAME GENRES WE PLAY (the "Choose your poison" carousel)
 * --------------------------------------------------------
 * The site lists genres, not specific game titles.
 *   name    – the genre, shown on the card
 *   meta    – small line under it: team size • platform
 *   icon    – Game Icons glyph used on the generated cover art
 *   accent  – colour of the generated cover art
 *   cover   – OPTIONAL image in /public, e.g. 'games/fps.webp' (no leading slash).
 *             Use your own tournament photos or art you have the rights to;
 *             official game key art is usually copyrighted.
 */
export const GAME_GENRES = [
  { name: 'Tactical FPS', meta: '5v5 • PC', icon: GiCrosshair, accent: '#e0485a' },
  { name: 'Battle Royale', meta: 'Squads • Mobile', icon: GiParachute, accent: '#d98a2b' },
  { name: 'MOBA', meta: '5v5 • Mobile', icon: GiTowerFlag, accent: '#3a6fd6' },
  { name: 'Sports', meta: '1v1 • Console / PC', icon: GiSoccerBall, accent: '#2f9d5c' },
  { name: 'Strategy', meta: '1v1 • Online', icon: GiChessKnight, accent: '#8a7462' },
  { name: 'Retro Arcade', meta: 'Various • Just for fun', icon: GiJoystick, accent: '#6b3fd1' },
]
