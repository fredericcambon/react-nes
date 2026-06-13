# react-nes

Browser front-end for [**OnaNES**](https://github.com/fredericcambon/nes), a
JavaScript NES emulator. Pick a game, and it runs entirely in your browser —
no backend, no plugins.

### ▶ Live: https://fredericcambon.github.io/react-nes/

It's a static single-page app hosted on GitHub Pages. The emulator core ships
as the [`nes-emulator`](https://www.npmjs.com/package/nes-emulator) npm package;
this repo is just the UI around it.

## Features

- Play NES ROMs in the browser at 60 fps
- Three swappable renderers: **PixiJS** (2D/WebGL), **ThreeJS** (2D), and
  **ThreeJS 3D** (the game projected onto a 3D model)
- Quick **save / load** states (stored in `localStorage`)
- Per-game **cheats**
- First-run "How to Play" overlay plus an always-visible controls reference
- Fullscreen mode

## Controls

The game is played with the keyboard:

| NES button | Key       |
| ---------- | --------- |
| D-pad      | Arrow keys |
| A          | `C`       |
| B          | `X`       |
| Start      | `Enter`   |
| Select     | `Shift`   |

> Mobile/touch controls are not implemented yet — desktop keyboard only for now.

## Project structure

```
app/                 Create React App front-end (the deployed site)
  public/            index.html, 404.html (SPA fallback), favicon, .nojekyll
  src/
    components/      React components (NES screen, renderers, modals, grids)
    config/          settings + routes
    utils/           ROM manifest, fetch helper, three.js OrbitControls
.github/workflows/   GitHub Pages build & deploy
api/                 legacy Express stub — unused by the Pages deployment
```

ROMs and cover art are **not** stored here. They live in a separate (private)
data repo and are copied into the build at deploy time, then served from
`/<base>/media/data/<slug>.{nes,jpg}` on the same origin as the app.

## Local development

Requires **Node 16** (the toolchain is `react-scripts` 2.x / webpack 4, which
predates OpenSSL 3 and newer Node).

```shell
cd app
npm install --legacy-peer-deps

# ROMs aren't in this repo. Drop the .nes/.jpg files (named <slug>.nes /
# <slug>.jpg, matching app/src/utils/roms.js) into app/public/media/data/
# so they're served locally:
mkdir -p public/media/data
# cp /path/to/your-roms/*.{nes,jpg} public/media/data/

npm start          # http://localhost:3000
```

> The `npm run build` / `npm start` scripts contain a stray
> `--openssl-legacy-provider` flag that breaks them on Node 16; run
> `npx react-scripts start` / `npx react-scripts build` directly if needed.

## Deployment (GitHub Pages)

Pushing to `master` triggers `.github/workflows/deploy.yml`, which:

1. checks out this repo and a separate private repo holding the ROM data,
2. builds the app on Node 16 (`react-scripts build`),
3. copies the ROMs/covers into `build/media/data/`,
4. publishes the result to GitHub Pages.

Two settings make this work on a fork:

- **Base path** — the site lives at `https://<user>.github.io/<repo>/`, so the
  `homepage` field in `app/package.json` must match your repo name (it drives
  `PUBLIC_URL`, the router `basename`, and the ROM paths). Deep links survive
  Pages' lack of server-side routing via the `public/404.html` redirect trick.
- **`ROM_DATA_TOKEN`** — because the ROM-data repo is private, the workflow
  needs a repo secret containing a fine-grained PAT with read-only *Contents*
  access to it. (Drop this step if your data repo is public.)

## ROMs

No ROMs are included. You supply your own and list them in
`app/src/utils/roms.js` (`{ value, label, slug }`), with files named
`<slug>.nes` (and optional `<slug>.jpg` cover) in the data folder.

## Related

- [`nes`](https://github.com/fredericcambon/nes) — the emulator engine (CPU/PPU)

## License

GPL-3.0 — see [LICENSE](LICENSE).
