# Inaba Portal (`inaba-portal`)

Arabic-first, RTL Angular admin portal for **إنابة**.

## Documentation

- **Primary project docs (architecture, stack, tokens, shared components, pages, modal system, progress, known issues):** [`docs/PROJECT_DOCUMENTATION.md`](docs/PROJECT_DOCUMENTATION.md)
- **Original static mockups:** `reference/`

## Tech (current)

- Angular ^22.2 (standalone components, lazy-loaded routes, Signals)
- TypeScript ~6.0 (strict)
- Bootstrap 5 RTL + SCSS design tokens (`src/styles/`)
- Angular CDK (Dialog/overlay) for modals
- IBM Plex Sans Arabic, RTL (`ar`)

## Run locally

```bash
npm install
npm start
# or: ng serve
```

Open `http://localhost:4200/`. If the dev server shows stale/placeholder content, stop it, clear `.angular/cache`, restart, and hard refresh.

```powershell
Remove-Item -Recurse -Force .angular\cache -ErrorAction SilentlyContinue
npm start
```

## Build

```bash
npm run build
# or: ng build
```

Build output: `dist/`. Production build currently succeeds with an initial bundle budget warning (~507 kB total vs 500 kB warning threshold) due to Bootstrap RTL/CDK styles.

## Test

```bash
npm test
# or: ng test
```

Uses the Angular unit-test builder (Vitest).

## Conventions (summary)

- Arabic-first RTL UI; preserve existing navigation/labels.
- Feature-based structure under `src/app/features/`, shared UI in `src/app/shared/components/`.
- **Cards:** `content-card-body` is the mandatory base class.
- **Icons:** no icon libraries/external/emoji/Unicode icons — use `app-icon-placeholder` / `.icon-placeholder` (reserved asset folders: `src/assets/images/imgs/`, `src/assets/images/svg/`).
- Mock data is typed and separated from templates; no invented backend/business rules.

For full details, see [`docs/PROJECT_DOCUMENTATION.md`](docs/PROJECT_DOCUMENTATION.md).
