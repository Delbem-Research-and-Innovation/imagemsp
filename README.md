# IMAGEM:SP — Intelligent Map of Ageing in São Paulo

Public territorial visualization platform for population ageing in São Paulo, developed under the FAPESP project. Enables managers, researchers, and citizens to explore data on elderly population, health services, mobility, and urban conditions by municipal district.

---

## Table of Contents

- [About](#about)
- [Stack](#stack)
- [Architecture](#architecture)
- [Routes](#routes)
- [Route /mapas](#route-mapas)
- [Data](#data)
- [Development](#development)
- [Quality](#quality)
- [Roadmap](#roadmap)

---

## About

**IMAGEM:SP** answers the central question:

> **Where is the potential pressure from ageing greatest, and where is basic service coverage lowest, by territory?**

The application displays a choropleth map of São Paulo municipal districts with elderly population indicators (65+), allows filtering by category and age group, and shows a legend panel with threshold-based classification.

---

## Stack

| Category  | Technology                             |
| --------- | -------------------------------------- |
| Framework | Next.js 16 (App Router)                |
| UI        | React 19 + Chakra UI v3                |
| Map       | MapLibre GL + `@ttoss/geovis`          |
| Language  | TypeScript ~6                          |
| Styles    | Chakra UI (no Tailwind)                |
| Icons     | `@iconify/react`                       |
| Tests     | Jest + `@ttoss/config`                 |
| Linting   | ESLint 9 + Prettier                    |
| CI        | GitHub Actions (typecheck, lint, test) |
| Manager   | pnpm                                   |
| Node      | ≥ 24                                   |

---

## Architecture

```
src/
├── app/
│   ├── (default)/         # Homepage and informational pages (with Header/Footer)
│   ├── (features)/        # Feature pages (layout without editorial footer)
│   │   └── mapas/         # Interactive map /mapas
│   ├── (internal)/        # Internal pages
│   └── (legal)/           # Terms, cookies, accessibility
├── components/
│   ├── map/               # CategoryMenu, LegendPanel
│   │   └── lib/           # mapConfig, indicators, icons (canonical)
│   ├── site/              # Header, Footer
│   ├── layouts/           # DefaultLayout, FeaturesLayout, LegalLayout
│   └── ui/                # Chakra primitives (Provider, tokens)
├── config/
│   ├── navigation.ts      # mainNav, footerNavGroups, legalNav
│   ├── theme.ts           # Custom Chakra tokens
│   └── locales.ts
├── data-source-static/    # Reads pre-computed JSON snapshot (readStaticMapsData)
├── data-gateway/          # Transformers + typed schema (MapsDataContract)
└── gateway.ts             # Gateway singleton instance
```

The `data-source-static` layer reads the pre-computed `maps-data.json`. The `data-gateway` transforms raw data into the `MapsDataContract` contract, ensuring separation between data source and application domain.

---

## Routes

| Route                 | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `/`                   | Editorial homepage (Hero, themes, how it works, data sources) |
| `/mapas`              | Interactive ageing map by district                            |
| `/sobre`              | About the project                                             |
| `/oportunidades`      | Collaboration opportunities                                   |
| `/contato`            | Contact                                                       |
| `/termos`, `/cookies` | Legal pages                                                   |

---

## Route /mapas

The `/mapas` route renders an interactive choropleth map of São Paulo's 96 municipal districts showing population ageing indicators.

### Visualization

- **Choropleth map** rendered by [MapLibre GL](https://maplibre.org/) via the [`@ttoss/geovis`](https://github.com/ttoss/ttoss) adapter.
- **GeoJSON source**: `public/distrito-municipal-v2.geojson` — São Paulo municipal district boundaries.
- **Color scale**: ColorBrewer Blues-7 (`#c6dbef` → `#08306b`), 7 bands with fixed thresholds `[0.1, 0.2, 0.4, 0.6, 0.7, 0.8]` defined in `src/components/map/lib/mapConfig.ts`.
- **Hover tooltip**: `GeoVisHoverTooltip` renders district name, percentage value, and absolute counts (numerator / denominator) for the selected indicator.

### Filters

| Component      | Location                          | Description                                           |
| -------------- | --------------------------------- | ----------------------------------------------------- |
| `CategoryMenu` | `src/components/map/CategoryMenu` | Slide-out panel with category and age group selectors |
| `LegendPanel`  | `src/components/map/LegendPanel`  | Fixed panel showing color bands and value ranges      |

**Category options** (`Category` type):

| Value               | Description                                 |
| ------------------- | ------------------------------------------- |
| `cumulative-total`  | Elderly population as % of total population |
| `cumulative-65plus` | Subgroup as % of the 65+ population         |
| `5year-65plus`      | 5-year age band as % of the 65+ population  |

**Age group options** (`Group` type): `65`, `70`, `75`, `65-69`, `70-74` — available groups vary by category.

### Data flow

```
maps-data.json (static)
  └─ readStaticMapsData()         # data-source-static
       └─ toAppMapsData()         # data-gateway transformer
            └─ MapsDataContract   # passed as prop to MapsView (client component)
                 └─ buildSpec()   # constructs VisualizationSpec for @ttoss/geovis
```

All rate values are pre-computed offline from census microdata. The gateway layer (`toAppMapsData`) injects `NYC_THRESHOLDS` at transformation time — thresholds are never read from the JSON source.

---

## Data

Data is pre-computed offline from census microdata (IBGE) and SEADE, saved in `src/data-source-static/data/maps-data.json`.

**Canonical schema (`MapsDataContract`):**

```ts
type Category = 'cumulative-total' | 'cumulative-65plus' | '5year-65plus';
type Group = '65' | '70' | '75' | '65-69' | '70-74';

type MapDataRow = {
  geometryId: number;
  value: number;
  name?: string; // district name (tooltip)
  count?: number; // rate numerator
  totalCount?: number; // rate denominator
};

type MapsDataContract = {
  year: number;
  thresholds: Record<Category, Partial<Record<Group, number[]>>>;
  mapData: Record<Category, Partial<Record<Group, MapDataRow[]>>>;
};
```

---

## Development

```bash
# install dependencies
pnpm install

# development server
pnpm dev

# production build
pnpm build

# type check
pnpm typecheck

# lint (with auto-fix)
pnpm eslint --fix

# tests
pnpm test
```

> **Prerequisites:** Node ≥ 24 and pnpm.

### Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) with `commitlint`.
- Hooks via `husky` + `lint-staged` run typecheck and lint on the staged diff before each commit.
- Code in English; UI content in pt-BR.
- Arrow functions; no classes. Parameters as objects when > 1 argument.

---

## Quality

The CI (`/.github/workflows/pr.yml`) runs on every pull request:

1. `pnpm typecheck` — zero TypeScript errors
2. `pnpm lint` — zero ESLint warnings
3. `pnpm test` — minimum 10% coverage (branches, functions, lines, statements)

Coverage must never decrease — the threshold in `tests/unit/jest.config.ts` is updated with every code change.

---

## Roadmap

The minimum vertical slice **Ageing Maps V0** includes the following features not yet implemented:

| Feature                                    | Status                         |
| ------------------------------------------ | ------------------------------ |
| District data tooltip (hover)              | 🔄 In review (PR #11)          |
| Internationalisation pt-BR / en-US         | 🔄 In review (PR #5, Issue #4) |
| UBS points layer (service supply)          | ⏳ Planned                     |
| Territory detail side panel                | ⏳ Planned                     |
| A vs B comparison panel                    | ⏳ Planned                     |
| URL permalink with state (`?ind=&ubs=&t=`) | ⏳ Planned                     |
| Territory search by name                   | ⏳ Planned                     |
| Priority GAP indicator (composite)         | ⏳ Planned                     |
| Vulnerability proxy indicator              | ⏳ Planned                     |
| % 60+ population indicator                 | ⏳ Planned                     |
| `/metodologia` page                        | ⏳ Planned                     |

---

## License

Private repository — Delbem Research and Innovation / FAPESP. All rights reserved.
