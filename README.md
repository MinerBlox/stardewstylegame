# Brackenvale

**Brackenvale** is an original browser-playable 2D medieval village life-sim built for the `stardewstylegame` repository. It uses Canvas rendering and native ES modules, has no backend requirement, and is designed to run directly from GitHub Pages.

## Play

- **WASD / Arrow keys** — move
- **E** — interact / talk / enter / browse
- **I / Tab** — inventory
- **1–8** — select hotbar slot
- **Esc** — close panels

## Features

- Large handcrafted medieval overworld with farmland, river, bridge, village square, manor, chapel, mill, ruins and forest edges.
- Enterable cottage, general store, blacksmith, tavern, apothecary and chapel.
- 10 named villagers with distinct jobs, dialogue and time-based schedules.
- Directional player/NPC movement with multi-phase walking animation.
- Collision against buildings, trees, water, furniture and map boundaries.
- General interaction prompts, reusable dialogue UI, shops, currency and working purchases.
- Data-driven item database and shop stock.
- 18-slot visual inventory with stacks and item details plus an 8-slot selectable HUD hotbar.
- Accelerated in-game clock with morning/afternoon/evening/night tinting.
- Browser-local save/continue with autosave and save-on-transition/purchase.
- Responsive full-screen Canvas with crisp pixel-art rendering.
- Original AI-generated environment, interior, character, portrait, item and UI artwork integrated into the live renderer.
- Procedural rendering remains as a safe fallback if generated artwork cannot load.
- Lightweight generated square-wave UI audio cues with a volume setting, so no copyrighted audio assets are required.

## Technical architecture

```text
/
├── index.html
├── README.md
├── assets/
│   └── generated/
│       ├── env-0.txt ... env-2.txt
│       ├── interior-0.txt ... interior-2.txt
│       └── character-0.txt ... character-2.txt
├── css/
│   └── game.css
└── js/
    ├── main.js
    ├── config.js
    ├── core/
    │   ├── Game.js
    │   ├── polish.js
    │   ├── world-polish.js
    │   ├── generated-art.js
    │   └── generated-depth.js
    ├── entities/
    │   ├── Player.js
    │   └── NPC.js
    ├── systems/
    │   ├── Input.js
    │   ├── Inventory.js
    │   ├── Save.js
    │   └── Time.js
    └── data/
        ├── items.js
        ├── npcs.js
        └── world.js
```

### Generated artwork pipeline

The generated PNG atlases are stored in Base64 chunks under `assets/generated/`. `js/core/generated-art.js` fetches the chunks using repository-relative URLs, reconstructs each PNG in the browser, creates cached blob URLs and then switches the renderer from its procedural fallback to the generated art.

The three atlases are used as follows:

- **Environment atlas** — village buildings, seasonal trees, well, bridge, gardens, flowers, hedges, barrels and environmental decoration.
- **Interior atlas** — furnished cottage, merchant/apothecary, blacksmith, tavern and manor/chapel-style room artwork.
- **Character/item atlas** — player sprite, role-based NPC sprites, dialogue portraits, inventory/shop item icons and title/menu UI accents.

Collision, NPC schedules, interactions, shops and exits remain data-driven, so changing the artwork does not change gameplay geometry.

`Game.js` contains the runtime and procedural fallback renderer. `polish.js` handles UI/item fallback rendering and responsive interior presentation. `world-polish.js` provides additional environmental detail. `generated-art.js` replaces the visual layer with the generated sprite atlases once they are loaded, and `generated-depth.js` removes the old procedural canopy overlay so it does not clash with the generated characters.

### Data-driven content

- Add items in `js/data/items.js` under `ITEMS`.
- Add or change shop stock in `SHOPS` in the same file.
- Add villagers in `js/data/npcs.js`. Each NPC defines palette metadata, dialogue and a schedule.
- Add buildings, colliders, trees and interiors in `js/data/world.js`.

## NPC schedules

Each schedule entry uses:

```js
['08:00', '18:00', 'general', 470, 95]
```

for an interior destination, or:

```js
['06:00', '08:00', 730, 920]
```

for an overworld destination. NPCs move toward the active waypoint and their directional sprite changes while walking.

## Local development

Because the project uses native ES modules and fetches its generated asset chunks, run it from a local static server rather than opening `index.html` directly from `file://`.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

All imports and generated asset chunk requests use repository-relative URLs. There are no backend, filesystem, localhost-only or build-step dependencies.

In GitHub:

1. Open **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.

The site can then be served directly from the repository's Pages URL.

## Save data

Progress is stored under the browser key `brackenvale-save-v1` and includes player position, scene/interior, money, inventory, time and met-NPC state. Invalid or absent data falls back safely to a new game.
