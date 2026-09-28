# Gamesmiths · BEC Digital Arts Club

The introduction website for **Gamesmiths**, the Digital Arts Club at Basaveshwar Engineering College (BEC),
Bagalkot. The club has three pillars: **Play** (competitive gaming), **Build** (game development) and
**Create** (digital art).

It's a **scroll-through showcase**, not a sign-up site. There are no forms, buttons or outbound links;
visitors scroll from top to bottom and the page tells the club's story. The look is a gamer's scrapbook
(torn paper pinned to a dark wall, brush lettering, sticky notes, stickers and doodles), with scroll and
text animations throughout.

Built with React, Tailwind CSS v4, Vite and [Motion](https://motion.dev). At build time the page is
prerendered to static HTML, so it loads fast, works as plain files on any static host, and makes zero
third-party requests. Fonts are self-hosted, and there's no analytics or tracking.

---

## Quick start

You need **Node.js 20.19+ or 22.12+**.

```bash
npm install
npm run dev              # local dev server with hot reload → http://localhost:5173
npm run build            # production build → dist/
npm run preview          # serve dist/ locally to check the build
npm run lint             # ESLint, including accessibility rules (jsx-a11y)
npm run check:contrast   # check every colour pairing against WCAG AA
```

---

## 🚩 Before launch

Everything that needs real data has a `TODO(launch)` comment. List them with:

```bash
grep -rn "TODO(launch)" src index.html
```

| What                   | Where                                         |
| ---------------------- | --------------------------------------------- |
| Real event dates       | `src/content/events.js`                       |
| Official logo          | `public/` + `src/content/site.js` → `LOGO`    |
| Social preview tags    | `index.html` (`og:url` / `og:image`)          |

Optional: the stats strip under the hero (`STATS` in `copy.js`) only uses numbers that are true today
(3 pillars, 6 game genres, 48-hour jams). Add real member and event counts once you have them.

---

## What's on the page

Top to bottom, as the header's chapter counter shows (`01 / 10 … 10 / 10`):

| # | Chapter       | What happens                                                                          |
| - | ------------- | ------------------------------------------------------------------------------------- |
| 01 | Intro        | Preloader → headline letters slap on one by one, flipping tagline, parallax corkboard, count-up stats |
| 02 | What we do   | Two tape strips that scroll with your scroll speed, then the four pillar cards stack up as you scroll |
| 03 | Why we exist | The club's statement reveals itself word by word as you scroll                        |
| 04 | Play         | Title slides in word by word; carousel of the game genres we play; tournament format ticket |
| 05 | Build        | Game Dev track, then the **Dev Lab**: a Godot editor that types real GDScript, a running pixel-art game, console output and a git log |
| 06 | Create       | Digital Arts track, then **Sketch to Ship** (the page pins while a character is drawn in five stages as you scroll), then the **gallery** of what the art team makes and a toolbox strip |
| 07 | House rules  | Dark Souls-style YOU DIED screen, sticky-note rules that drop in                      |
| 08 | Roadmap      | Rainbow timeline that draws itself; the slogan's letters fly into place               |
| 09 | The guild    | The four crews that run the club, dealt out like cards                                |
| 10 | GG           | A giant 3D wordmark stands up, "Play. Build. Create." and the sign-off               |

---

## Editing the site (no layout code needed)

All text lives in `src/content/`. Change the words there and the layout and animations keep working.

```
src/content/
├── copy.js     ← all section text, the Dev Lab code + git log, the art stages and gallery
├── events.js   ← the roadmap events (update every semester)
├── games.js    ← the game genres in "Choose your poison"
└── site.js     ← club name, logo, and the header's chapter list
```

### Updating events each semester

Open `src/content/events.js` and edit the list. Each event looks like this:

```js
{
  week_or_date: 'Week 10',          // or '12 Oct', 'Oct 12–13', …
  title: '48-hour Game Jam',
  description: 'Builders and artists team up, survive on instant noodles.',
  pillars: ['build', 'create'],     // optional tags: 'play', 'build', 'create'
  icon: GiHourglass,                // optional
  now: true,                        // optional: gets the "You are here" marker
},
```

Add, remove or reorder events freely. The timeline is a vertical list on phones, 3 per row on tablets
and up to 6 per row on desktop, and it redraws itself for any number of events.

### Updating the Dev Lab

`DEV_LAB` in `copy.js` holds the GDScript that types itself out (`code`), the console lines and the
git log. Change any of it; syntax highlighting and typing adapt automatically.

### Updating the game genres

`src/content/games.js` holds the carousel cards, one per genre: its name, team size and platform, and
the icon and colour of its cover. The site names genres rather than specific game titles.

### Changing icons and colours

Icons come from [Game Icons](https://game-icons.net) via `react-icons`. Browse them at
<https://react-icons.github.io/react-icons/icons/gi/>, import the one you want at the top of the
content file, and set it as the `icon:`. Anything with a `color:` takes `'red'`, `'blue'`, `'gold'`,
`'purple'` or `'green'`.

### Adding your own art and photos

The site deliberately ships **without** third-party images: no meme characters and no official game key
art (that's copyrighted by the publishers). The gallery pieces, the character in *Sketch to Ship*, the
pixel knight and the game-card covers are all original SVG drawn in code. To use real pictures, such as
tournament photos or art made by club members:

1. Put the image in `public/`, e.g. `public/games/fps.webp`. Use WebP, around 600 px wide.
2. Point to it with no leading slash: `cover: 'games/fps.webp'` in `games.js`.

---

## Animations

The text and scroll effects are in the style of [Skiper UI](https://skiper-ui.com), written from scratch
for this site. Most are plain CSS transitions and CSS scroll-driven animations, with
[Motion](https://motion.dev) for the few that need JavaScript (see **Keeping it smooth** below). They
live in `src/components/anim/`, and each one is a drop-in component:

| Component         | Effect                                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| `Preloader`       | Pillar words flash up, then the screen lifts away in stairs (pure CSS)    |
| `ScrambleText`    | Decoder effect: letters scramble, then lock in left to right (kickers, header chapter) |
| `FlipWords`       | Cycles through words with a 3D flip and blur (hero tagline)               |
| `WordReveal`      | Words go from faint to solid as the paragraph scrolls past                |
| `SlideInWords`    | Words slide in from the right with a skew, one after another             |
| `ScrollLetters`   | Letters start scattered and fly into place as you scroll                  |
| `RollText`        | Letters roll up on hover (pillar card titles)                             |
| `CountUp`         | Numbers count up when they scroll into view                               |
| `VelocityMarquee` | An endless ticker that speeds up, and flips direction, with your scrolling |
| `ScrollProgress`  | The red bar under the header                                              |

Sections add their own: the stacking pillar cards, the hero corkboard parallax and the 3D finale are CSS
scroll-driven animations (`index.css`); the pinned drawing is driven by Motion; the dropping sticky
notes and the card deal use `<Reveal from={…} spring>`; the gallery wipe is `.wipe`; and the
self-drawing timeline uses `useScrollSteps` (`src/lib/useScrollProgress.js`).

**Everyone can use it.** With *reduce motion* switched on in the visitor's OS, every animation is turned
off: no preloader, text appears in place, and *Sketch to Ship* becomes a single finished drawing. Without
JavaScript, the prerendered page shows everything in its final state (see the `<noscript>` block in
`index.html`).

### Keeping it smooth

The page is long and busy, so it's built to cost as little as possible while you scroll, even on
budget phones:

- **Scroll-linked effects run on the compositor.** The progress bar, hero parallax, pillar stack and
  finale use CSS `animation-timeline`, so the browser moves them without running any script. Browsers
  without scroll-driven animations show the parallax, stack and finale at rest, and the progress bar
  falls back to a tiny script.
- **Reveals only animate `transform` and `opacity`.** A card is painted once and then moved, instead of
  being repainted every frame. Don't animate `filter`, `clip-path`, `box-shadow` or sizes on large
  elements, and don't animate `x`/`y`/`rotate`/`scale` with Motion (those run on the main thread).
  Use `Reveal`'s `from`/`spring` props, or a CSS transition, instead.
- **Scroll-stepped text doesn't re-render React.** `useScrollSteps` switches classes directly, and its
  scroll listener only runs while the element is on screen.
- **Off-screen work is skipped.** Sections use `content-visibility: auto`, switched on once the page
  has been laid out so its height doesn't jump. Looping animations pause off screen
  (`usePauseOffscreen`), the tickers stop while out of view, and the code editor waits until you
  reach it before it starts typing.
- **Flat surfaces, cheap shadows.** The paper and the wall are plain colours (no noise textures).
  Plain rounded cards use a box-shadow (`.paper-shadow-box`). The heavier `drop-shadow` filter
  (`.paper-shadow`) is kept for torn shapes, where it has to follow the edge.

---

## Swapping in the real logo

The repo ships with a **placeholder** mark (`public/logo.svg`), because the official logo file wasn't
available when the site was built. The header and footer also use a text wordmark
(`GAMESM⚔THS`, with a sword for the I) in `src/components/Wordmark.jsx`.

1. Put the official logo in `public/`, e.g. `public/logo.png`. Square, ideally ≥ 800 px, WebP or PNG.
2. In `src/content/site.js`, set `LOGO.file = 'logo.png'`. Use no leading slash, so sub-folder hosting keeps working.
3. Regenerate the favicons from the real logo, for example with
   [realfavicongenerator.net](https://realfavicongenerator.net), and replace these files in `public/`:
   `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`.

The logo still says "BEC Gaming Club" underneath. It's treated as a fixed brand mark, but everything
else on the site says **BEC Digital Arts Club**.

---

## Deploying

`npm run build` outputs a fully static site to `dist/`. Asset paths are relative, so it works at a
domain root **or** in a sub-folder.

- **GitHub Pages (set up already):** `.github/workflows/deploy.yml` builds and deploys every push to
  `main`. One-time setup: **Settings → Pages → Source: GitHub Actions**. The site then lives at
  `https://<user>.github.io/gamesmiths/`. Pull requests are linted and built, but not deployed.
- **Netlify / Vercel / Cloudflare Pages:** import the repo. Build command `npm run build`, output directory `dist`.
- **Any web server:** upload the contents of `dist/`.

---

## Design system

### Surfaces

- **The wall:** the page background, flat dark charcoal (`body` in `index.css`).
- **Paper sheets:** `<Section tone="cream">` renders a full-width sheet with torn top and bottom
  edges. `tear="a"` / `"b"` pick different tears so neighbouring sheets don't match.
- **Torn cards:** `.torn` (and `<PaperCard>`) tear all four edges of a card.
- **Details:** `.tape`, `.pin`, `<StickyNote>` and `<Sticker>` (die-cut vinyl stickers).

All surfaces are flat colours from the palette below. The torn edges are generated SVG masks in
`src/assets/torn/`; change how the tears look with `node scripts/generate-torn-edges.mjs`.

### Colours

Tokens live in `src/styles/index.css` (`@theme`) and become Tailwind classes (`bg-dark`, `text-blue-light`, …).
Tailwind's default palette is switched off to keep everything on-brand.

| Token                  | Hex       | Use                                                          |
| ---------------------- | --------- | ------------------------------------------------------------ |
| `dark`                 | `#1C1B19` | the wall (page background)                                   |
| `dark-panel`           | `#252320` | dark panels and cards                                        |
| `cream`                | `#F2ECE1` | paper sheets; text on dark                                   |
| `cream-panel`          | `#E7DECD` | darker paper details                                         |
| `paper-light`          | `#FAF6EE` | white paper cards, notes                                     |
| `red`                  | `#8B2E22` | badges, focus ring on paper                                  |
| `red-bright`           | `#B23A2A` | red fills, red text on paper                                 |
| `ember`                | `#E06A52` | **red text on dark** (kickers, "You are here", YOU DIED)     |
| `ink`                  | `#2A211D` | text on paper                                                |
| `muted`                | `#6B5F56` | body text on paper                                           |
| `muted-cream`          | `#C9BEB0` | body text on dark                                            |
| `blue` / `blue-light`  | `#2B52C4` / `#86A8FF` | Build pillar (on paper / on dark)                |
| `gold` / `gold-deep` / `gold-light` | `#E3A33B` / `#A0550E` / `#F0B54A` | Create pillar (fill with ink text / text on paper / text on dark) |
| `purple` / `purple-light` | `#6437C8` / `#B09AFF` | Jam                                           |
| `green` / `green-light` | `#23703F` / `#6CCB93` | roadmap accents                               |
| `note`, `note-pink`, `note-blue`, `note-green` | | sticky notes (always ink text)                |

> **Why `ember`?** The original brief called for `red-bright` (#B23A2A) for red text on dark backgrounds,
> but that pairing measures only **2.89:1**, below WCAG AA even for large text. `ember` is a lighter step
> of the same rust hue (5.21:1 on `dark`) and is used for red *text* on dark surfaces.

Run `npm run check:contrast` after changing any colour. It reads the tokens straight from the CSS and
checks every pairing the site uses. CI runs it too.

### Type (all self-hosted)

| Font                 | Class         | Used for                                              |
| -------------------- | ------------- | ----------------------------------------------------- |
| Permanent Marker     | `font-marker` | brush headlines and section titles                    |
| Gochi Hand           | `font-hand`   | handwritten notes, quotes, sticky notes               |
| Barlow Condensed     | `font-ui`     | kickers, card titles, stats, game names               |
| Inter                | `font-sans`   | body text (the default)                               |
| Cinzel               | `font-serif`  | the GAMESMITHS wordmark, YOU DIED, the finale         |

### Components (`src/components/`)

| Component            | What it does                                                          |
| -------------------- | --------------------------------------------------------------------- |
| `Section`            | Paper sheet (`tone="cream"`) or dark wall (`tone="dark"`). Children adapt their colours automatically |
| `SectionHeading`     | Scrambling kicker + brush `h2` + optional handwritten note + scribble underline + intro |
| `Header`             | Wordmark, the chapter you're reading (`CHAPTERS` in `site.js`) and the scroll-progress bar |
| `PaperCard`          | A torn-paper card with shadow and a slight tilt; straightens on hover. `torn={false}` gives plain rounded corners |
| `StickyNote`         | Sticky note or paper scrap, taped or pinned                           |
| `Sticker`            | Die-cut sticker: icon on a coloured disc with a white border          |
| `Doodles`            | Hand-drawn SVGs: stars, sparkles, arrows, crown, plane, scribble circle/underline, checkbox, controller… |
| `Characters`         | Doodle characters (the "senior", the from-this/to-this stick figures) |
| `DeskScene`          | The hero's 3 a.m. desk (mug, sticker-covered laptop, controller, mana potion) |
| `HeroBoard`          | The hero corkboard collage, with per-note parallax                    |
| `StatsStrip`         | The torn stats strip under the hero (counts up)                       |
| `GameCarousel`       | Swipeable row of game-genre cards with previous/next buttons          |
| `CoverArt`           | Poster-style cover art from an icon + colour, or your own image       |
| `CodeEditor`         | Syntax-highlighted GDScript that types itself out                     |
| `PixelSprite`        | The pixel-art knight used in the Dev Lab game and the gallery         |
| `ApprenticeDrawing`  | The layered character drawn in *Sketch to Ship*                       |
| `MiniArt`            | The six gallery artworks                                              |
| `Timeline`           | Self-drawing rainbow roadmap                                          |
| `Wordmark`           | GAMESMITHS text wordmark with a sword for the I                       |
| `Reveal`             | Fade/slide-in on scroll. `from` sets where it comes from, and `spring` adds a bounce |
| `anim/*`             | The animation kit (see **Animations** above)                          |

Page sections live in `src/sections/`, and their order is set in `src/App.jsx`.

---

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`), one `h1`, an `h2` per section, and `h3`s for cards.
- Animated text is always readable by screen readers: the full sentence sits in a visually hidden
  copy, and the moving letters are hidden from assistive tech.
- The genre carousel works by keyboard: the card row can be focused and scrolled with the arrow
  keys.
- Every text/background pairing passes WCAG AA (`npm run check:contrast`), and axe reports no
  violations, including at every stage of the pinned drawing.
- The logo has alt text. Doodles and decorative icons are hidden from screen readers because the text
  beside them says the same thing.
- Honours `prefers-reduced-motion` (see **Animations**), and works without JavaScript.

---

## How the build works

`npm run build` runs three steps:

1. `vite build`: the client bundle (`dist/`). React and Motion go in a separate `vendor` file, so
   text edits don't make returning visitors re-download them.
2. `vite build --ssr src/entry-server.jsx`: a server build of the same app.
3. `scripts/prerender.mjs`: renders the app to HTML inside `dist/index.html` and preloads the two
   most important fonts. React then hydrates it in the browser.
