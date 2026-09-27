# Gamesmiths · BEC Digital Arts Club

The website for **Gamesmiths**, the Digital Arts Club at Basaveshwar Engineering College (BEC), Bagalkot.
The club has three pillars: **Play** (competitive gaming), **Build** (game dev) and **Create** (digital art).

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

---

## Editing the site (no layout code needed)

All text lives in `src/content/`. Change the words there and the layout keeps working.

```
src/content/
├── copy.js     ← all section text: hero, pillars, tracks, house rules, roles, footer…
├── events.js   ← the roadmap / upcoming events (update every semester)
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
},
```

Add, remove or reorder events freely. The timeline adjusts on its own: a vertical list on phones,
up to 3 per row on tablets, and up to 6 per row on desktop.

### Changing icons

Icons come from [Game Icons](https://game-icons.net) via `react-icons`. Browse them at
<https://react-icons.github.io/react-icons/icons/gi/>, import the one you want at the top of
`copy.js`, and set it as the `icon:` of a card.

---

## Sign-up form

The Join section has a built-in form (name, USN, email, WhatsApp number, branch, year, tracks, lead
roles, and a message). Pick one of these setups in `src/content/links.js`:

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
available when the site was built.

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

### Colours

The tokens live in `src/styles/index.css` (`@theme`) and become Tailwind classes (`bg-dark`, `text-cream`,
`text-ember`, …). Tailwind's default palette is switched off to keep everything on-brand.

| Token           | Hex       | Use                                                         |
| --------------- | --------- | ----------------------------------------------------------- |
| `dark`          | `#1C1B19` | primary dark background                                     |
| `dark-panel`    | `#252320` | cards on dark backgrounds, footer                           |
| `cream`         | `#F2ECE1` | primary light background; text on dark                      |
| `cream-panel`   | `#E7DECD` | cards on cream backgrounds                                  |
| `red`           | `#8B2E22` | buttons, icon badges, kickers on cream                      |
| `red-bright`    | `#B23A2A` | hover states, sparks, decorative accents                    |
| `ember`         | `#E06A52` | **red text on dark backgrounds** (kickers, dates, YOU DIED) |
| `ink`           | `#2A211D` | headings on cream                                           |
| `muted`         | `#6B5F56` | body text on cream                                          |
| `muted-cream`   | `#C9BEB0` | body text on dark                                           |

> **Why `ember`?** The brief called for `red-bright` (#B23A2A) for kickers and links on dark backgrounds, but
> that pairing measures only **2.89:1**, below WCAG AA even for large text. `ember` is a lighter step of
> the same rust hue (5.21:1 on `dark`, 4.74:1 on `dark-panel`) and is used for red *text* on dark
> surfaces. `red-bright` is still used wherever contrast doesn't matter.

Run `npm run check:contrast` after changing any colour. It reads the tokens straight from the CSS and
fails if a pairing drops below AA. CI runs it too.

### Type

- **Headings:** Cinzel (self-hosted via `@fontsource-variable/cinzel`)
- **Body:** Inter (`@fontsource-variable/inter`)
- **Kickers:** the `.kicker` class: bold, uppercase, letter-spaced ~2.6 px

### Components (`src/components/`)

| Component        | What it does                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| `Section`        | Full-width section with a `tone` of `"dark"` or `"cream"`. Children adapt automatically |
| `SectionHeading` | Kicker + `h2` + intro. Labels its section for screen readers              |
| `Card`           | Rounded panel matching the section tone, with hover lift                  |
| `IconBadge`      | Icon in a solid circle: red on dark, dark on cream                        |
| `StepList`       | Numbered steps: `1 2 3` badges or big `01 02 03` numerals                 |
| `QuoteCard`      | Dark quote panel with an icon badge                                       |
| `Timeline`       | Roadmap timeline, vertical on phones and horizontal from tablets up       |
| `ButtonLink`     | Primary (red) / secondary (outline) button-style link                     |
| `Reveal`         | Fade/slide-in on scroll                                                   |
| `SparkStar`      | The four-point spark glyph, corner sparks, and the spark divider          |
| `SignupForm`     | The join form (native or Google Form embed)                               |
| `SocialLinks`    | Discord / WhatsApp / Instagram as cards or icon buttons                   |

Page sections live in `src/sections/`, and their order is set in `src/App.jsx`.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, an `h2` per section, and `h3`s for cards.
- A skip link, visible focus rings that change colour to stay visible on each surface, and a keyboard-operable mobile menu (Escape closes it).
- Every text/background pairing passes WCAG AA (`npm run check:contrast`).
- The logo has alt text. Decorative icons are hidden from screen readers because the text beside them
  says the same thing. Icon-only links (footer socials) have labels.
- Honours `prefers-reduced-motion`: scroll reveals, sparks, hover lift and smooth scrolling are switched off.
- Without JavaScript, all content is still visible (the page is prerendered, and reveal styles only apply once JS runs).

---

## How the build works

`npm run build` runs three steps:

1. `vite build`: the client bundle (`dist/`).
2. `vite build --ssr src/entry-server.jsx`: a server build of the same app.
3. `scripts/prerender.mjs`: renders the app to HTML inside `dist/index.html` and preloads the two
   web fonts. React then hydrates it in the browser.
