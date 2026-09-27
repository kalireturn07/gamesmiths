# Gamesmiths · BEC Digital Arts Club

The website for **Gamesmiths**, the Digital Arts Club at Basaveshwar Engineering College (BEC), Bagalkot.
The club has three pillars: **Play** (competitive gaming), **Build** (game dev) and **Create** (digital art).

The look is a gamer's scrapbook: torn paper sheets pinned to a dark wall, brush-marker headlines,
handwritten notes, sticky notes, tape, stickers and doodles, with one colour per pillar.

It's a one-page site built with React, Tailwind CSS v4 and Vite. At build time the page is prerendered to
static HTML, so it loads fast, works as plain files on any static host, and makes zero third-party requests.
Fonts are self-hosted, and there's no analytics or tracking.

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

## 🚩 Launch checklist

Everything that needs real data has a `TODO(launch)` comment. List them all with:

```bash
grep -rn "TODO(launch)" src index.html
```

| What                   | Where                                         |
| ---------------------- | --------------------------------------------- |
| Discord invite         | `src/content/links.js` → `SOCIAL_LINKS`       |
| WhatsApp community     | `src/content/links.js` → `SOCIAL_LINKS`       |
| Instagram handle       | `src/content/links.js` → `SOCIAL_LINKS`       |
| Sign-up form endpoint  | `src/content/links.js` → `SIGNUP_FORM`        |
| Real event dates       | `src/content/events.js`                       |
| Official logo          | `public/` + `src/content/site.js` → `LOGO`    |
| Social preview tags    | `index.html` (`og:url` / `og:image`)          |

While any link still contains `REPLACE_ME`, `npm run dev` prints a warning in the browser console.

Optional: the stats strip under the hero (`STATS` in `copy.js`) only uses numbers that are true today
(3 pillars, 6 games, 48-hour jams). Add real member and event counts once you have them.

---

## Editing the site (no layout code needed)

All text lives in `src/content/`. Change the words there and the layout keeps working.

```
src/content/
├── copy.js     ← all section text: hero + corkboard notes, pillars, tracks, house rules, roles, footer…
├── events.js   ← the events (update every semester): feeds the hero panel AND the roadmap
├── games.js    ← the "Choose your poison" game lineup
├── links.js    ← Discord / WhatsApp / Instagram + sign-up form settings
└── site.js     ← club name, logo, header navigation
```

### Updating events each semester

Open `src/content/events.js` and edit the list. Each event looks like this:

```js
{
  week_or_date: 'Week 10',          // or '12 Oct', 'Oct 12–13', …
  title: '48-hour Game Jam',
  description: 'Builders and artists team up, survive on instant noodles.',
  pillars: ['build', 'create'],     // optional tags: 'play', 'build', 'create'
  icon: GiHourglass,                // optional: icon on the thumbnail
  now: true,                        // optional: gets "You are here"; the hero panel starts here
  register_url: 'https://…',        // optional: defaults to the sign-up form
  image: 'events/jam.webp',         // optional: your own photo in /public
},
```

Add, remove or reorder events freely. The hero's **Upcoming Events** panel shows the next four
from the one marked `now`. The roadmap timeline is a vertical list on phones, 3 per row on
tablets and up to 6 per row on desktop.

### Updating the games

`src/content/games.js` holds the carousel cards. Each game has a `genre`, and the filter chips (All,
FPS, Sports…) are built from those automatically, so a new genre gets its own chip.

### Changing icons and colours

Icons come from [Game Icons](https://game-icons.net) via `react-icons`. Browse them at
<https://react-icons.github.io/react-icons/icons/gi/>, import the one you want at the top of the
content file, and set it as the `icon:`. Anything with a `color:` takes `'red'`, `'blue'`, `'gold'`,
`'purple'` or `'green'`.

---

## Adding your own art and photos

The design deliberately ships **without** third-party images: no meme characters, and no official game
key art (that's copyrighted by the publishers). Game and event cards draw poster-style cover art from an
icon and a colour instead. To use real pictures, such as tournament photos or art made by club
members:

1. Put the image in `public/`, e.g. `public/games/valorant.webp`. Use WebP, around 600 px wide.
2. Point to it with no leading slash: `cover: 'games/valorant.webp'` in `games.js`, or
   `image: 'events/jam.webp'` in `events.js`.

---

## Sign-up form

The Join section has a built-in form on a sheet of notebook paper (name, USN, email, WhatsApp number,
branch, year, tracks, lead roles, and a message). Pick one of these setups in `src/content/links.js`:

**Option A: built-in form + Formspree (or similar), recommended**

1. Create a free form at [formspree.io](https://formspree.io). Getform, Basin, or your own backend also work.
2. Set `SIGNUP_FORM.endpoint` to the form's URL, e.g. `https://formspree.io/f/abcdwxyz`.

The form POSTs `multipart/form-data` with `Accept: application/json`. Checkbox groups arrive as one
comma-separated value (`tracks=Build, Create`), and `_gotcha` is a spam honeypot. Until the endpoint
is set, submitting shows a friendly "sign-ups aren't switched on yet" message.

**Option B: embed a Google Form**

1. In Google Forms, use **Send → `<>`**, and copy the `src` URL (it ends in `?embedded=true`).
2. Set `SIGNUP_FORM.provider = 'google-form'` and paste the URL into `googleFormEmbedUrl`.

---

## Swapping in the real logo

The repo ships with a **placeholder** mark (`public/logo.svg`), because the official logo file wasn't
available when the site was built. The header and footer also show a text wordmark (`GAMESM⚔THS`,
with a sword for the I) in `src/components/Wordmark.jsx`.

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

- **The wall:** the page background. Dark charcoal with a subtle grain (`body` in `index.css`).
- **Paper sheets:** `<Section tone="cream">` renders a full-width sheet with torn top and bottom
  edges. `tear="a"` / `"b"` pick different tears so neighbouring sheets don't match.
- **Torn cards:** `.torn` (and `<PaperCard>`) tear all four edges of a card.
- **Details:** `.tape`, `.pin`, `<StickyNote>` and `<Sticker>` (die-cut vinyl stickers).

The textures are tiny SVG noise files in `src/assets/textures/`. The torn edges are generated SVG masks in
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
| `paper-light`          | `#FAF6EE` | white paper cards, the form, notes                           |
| `red`                  | `#8B2E22` | red button hover, focus ring on paper                        |
| `red-bright`           | `#B23A2A` | primary buttons, red text on paper                           |
| `ember`                | `#E06A52` | **red text on dark** (kickers, "You are here", YOU DIED)     |
| `ink`                  | `#2A211D` | text on paper                                                |
| `muted`                | `#6B5F56` | body text on paper                                           |
| `muted-cream`          | `#C9BEB0` | body text on dark                                            |
| `blue` / `blue-light`  | `#2B52C4` / `#86A8FF` | Build pillar (on paper / on dark)                |
| `gold` / `gold-deep` / `gold-light` | `#E3A33B` / `#A0550E` / `#F0B54A` | Create pillar (fill with ink text / text on paper / text on dark) |
| `purple` / `purple-light` | `#6437C8` / `#B09AFF` | Jam                                           |
| `green` / `green-light` | `#23703F` / `#6CCB93` | roadmap accents                               |
| `note`, `note-pink`, `note-blue`, `note-green` | | sticky notes (always ink text)                |

> **Why `ember`?** The brief called for `red-bright` (#B23A2A) for kickers and links on dark backgrounds, but
> that pairing measures only **2.89:1**, below WCAG AA even for large text. `ember` is a lighter step of
> the same rust hue (5.21:1 on `dark`) and is used for red *text* on dark surfaces.

Run `npm run check:contrast` after changing any colour. It reads the tokens straight from the CSS and
checks all 35 pairings the site uses. CI runs it too.

### Type (all self-hosted)

| Font                 | Class         | Used for                                              |
| -------------------- | ------------- | ----------------------------------------------------- |
| Permanent Marker     | `font-marker` | brush headlines and section titles                    |
| Gochi Hand           | `font-hand`   | handwritten notes, quotes, sticky notes               |
| Barlow Condensed     | `font-ui`     | kickers, card titles, stats, game names               |
| Inter                | `font-sans`   | body text (the default)                               |
| Cinzel               | `font-serif`  | the GAMESMITHS wordmark and "YOU DIED"                |

### Components (`src/components/`)

| Component        | What it does                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| `Section`        | Paper sheet (`tone="cream"`) or dark wall (`tone="dark"`). Children adapt their colours automatically |
| `SectionHeading` | Kicker + brush `h2` + optional handwritten note + scribble underline + intro |
| `PaperCard`      | A torn-paper card with shadow and a slight tilt; straightens on hover     |
| `StickyNote`     | Sticky note or paper scrap, taped or pinned                               |
| `Sticker`        | Die-cut sticker: icon on a coloured disc with a white border              |
| `ButtonLink`     | Chunky button link in any accent colour, `dark` or `outline`              |
| `Doodles`        | Hand-drawn SVGs: stars, sparkles, arrows, crown, plane, scribble circle/underline, checkbox, controller… |
| `Characters`     | Original doodle characters (the "senior", the from-this/to-this stick figures) |
| `DeskScene`      | The hero's 3 a.m. desk (mug, sticker-covered laptop, controller, mana potion) |
| `HeroBoard`      | The hero corkboard collage (scales as one piece using container units)   |
| `UpcomingPanel`  | "Upcoming Events" panel with Register buttons                             |
| `StatsStrip`     | The torn stats strip under the hero                                       |
| `GameCarousel`   | Genre filter chips + swipeable game cards with previous/next buttons      |
| `CoverArt`       | Poster-style cover art from an icon + colour, or your own image           |
| `Timeline`       | Rainbow roadmap: vertical on phones, horizontal from tablets up           |
| `StepList`       | Numbered steps with hand-circled numbers                                  |
| `Wordmark`       | GAMESMITHS text wordmark with a sword for the I                           |
| `Reveal`         | Fade/slide-in on scroll                                                   |
| `SignupForm`     | The join form (native or Google Form embed)                               |
| `SocialLinks`    | Discord / WhatsApp / Instagram as cards or icon buttons                   |

Page sections live in `src/sections/`, and their order is set in `src/App.jsx`.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, an `h2` per section, and `h3`s for cards.
- A skip link, visible focus rings that change colour to stay visible on paper and on the dark wall,
  and a keyboard-operable mobile menu (Escape closes it).
- The game carousel works by keyboard: filter chips are toggle buttons (`aria-pressed`), the
  results count is announced, and the card row can be focused and scrolled with the arrow keys.
- Every text/background pairing passes WCAG AA (`npm run check:contrast`), and axe reports no violations.
- The logo has alt text. Doodles and decorative icons are hidden from screen readers because the text
  beside them says the same thing. Icon-only links (footer socials) have labels.
- Honours `prefers-reduced-motion`: scroll reveals, scribble draw-ins, sticker wiggles, hover tilts
  and smooth scrolling are switched off.
- Without JavaScript, all content is still visible (the page is prerendered, and reveal styles only apply once JS runs).

---

## How the build works

`npm run build` runs three steps:

1. `vite build`: the client bundle (`dist/`).
2. `vite build --ssr src/entry-server.jsx`: a server build of the same app.
3. `scripts/prerender.mjs`: renders the app to HTML inside `dist/index.html` and preloads the two
   most important fonts. React then hydrates it in the browser.
