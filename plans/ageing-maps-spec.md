# Spec: Ageing Maps V0

| Field       | Value                   |
| ----------- | ----------------------- |
| **Prefix**  | ageing-maps             |
| **Status**  | DRAFT                   |
| **Author**  | naneshoru               |
| **Created** | 2026-05-26              |
| **Package** | `packages/app`          |
| **Route**   | `/maps`, `/metodologia` |

---

## 1. Background

**ImagemSP** is a FAPESP-funded project that builds public maps visualizing aging
and basic-services coverage in São Paulo. The V0 answers one actionable question:

> **Where is there greater potential pressure from aging AND lower basic-service
> coverage, by territory?**

The product document (v0.1, 2026-02-05) defines a minimum vertical slice:
data → map → reading → publication, deployed without login.

### Current State (already implemented)

| Feature                                                       | Status  |
| ------------------------------------------------------------- | ------- |
| Choropleth map — 65+ population % by municipal district       | ✅ Done |
| Category/group selector (3 categories, age groups)            | ✅ Done |
| Left sidebar (collapsible)                                    | ✅ Done |
| Right legend panel (floating, closeable)                      | ✅ Done |
| GeoJSON district boundaries (`distrito-municipal-v2.geojson`) | ✅ Done |
| Pre-computed `maps-data.json` (SEADE 2025 projections)        | ✅ Done |
| OpenFreeMap basemap via `@ttoss/geovis` / MapLibre            | ✅ Done |
| Chakra UI v3 + Next.js 16                                     | ✅ Done |

### What is Missing for V0

| Feature                               | Status              |
| ------------------------------------- | ------------------- |
| UBS/service points layer (supply)     | ❌ Not started      |
| Territory click → detail side-panel   | ❌ Not started      |
| A vs B territory comparison in panel  | ❌ Not started      |
| URL permalink (shareable state)       | ❌ Not started      |
| Reset button                          | ❌ Not started      |
| Territory name search                 | ❌ Not started      |
| Gap composite indicator               | ❌ Not started      |
| Vulnerability proxy indicator         | ❌ Not started      |
| Pop 60+ indicator (demand baseline)   | ❌ Not started      |
| Classification method shown in legend | ❌ Not started      |
| `/metodologia` page                   | ❌ Not started      |
| Routing: rename `/maps` → `/mapa`     | ❌ Pending decision |

---

## 2. Goals

1. Complete the `/mapa` page so it satisfies every item in §2 ("O QUE O USUÁRIO
   CONSEGUE FAZER NO V0") of the product document.
2. Publish a `/metodologia` page with sources, definitions, limitations, and MAUP note.
3. Introduce the 3 V0 indicators defined in §4.2 of the product document.
4. Keep the app statically deployable (no server-side analysis on click).
5. Meet the minimum accessibility floor from §6 of the product document (WCAG-aligned).

---

## 3. Non-Goals (V0)

- Login, user profiles, or saved scenarios.
- Time slider / historical series.
- Multiple OMS domains in the menu.
- Unrestricted export.
- Server-side advanced analysis triggered on user interaction.
- More than 5 choropleth classes.
- More than 1 service layer (only UBS for V0).
- More than 1 territorial unit type (districts only for V0).

---

## 4. User Stories

### US-01 — Choose an indicator

> As a public-health planner, I want to select from a short list of indicators
> so that the map updates to show the chosen metric.

**Acceptance criteria:**

- Dropdown (or equivalent) shows the 3 V0 indicators: (1) % pop 60+, (2) vulnerability
  proxy, (3) GAP priority.
- Selecting an indicator updates the choropleth colors and legend in < 1 s.
- The active indicator label is visible at all times on the map view.

### US-02 — View choropleth with clear legend

> As a user, I want to see the map colored by the selected indicator with a
> readable legend so that I can interpret the values at a glance.

**Acceptance criteria:**

- 5 sequential classes ("muito baixo" → "muito alto") using ColorBrewer-compatible
  sequential palette (no rainbow).
- Legend shows: label, class boundaries, unit, and classification method name.
- Choropleth is always rate/percentage/index — never raw count.

### US-03 — Toggle UBS service points

> As a planner, I want to toggle UBS points on/off so I can assess supply
> coverage relative to the colored demand layer.

**Acceptance criteria:**

- Toggle button clearly labeled (on/off state visible).
- When ON, UBS points are clustered if > N points are in the viewport.
- Each point shows name and type on hover/click.

### US-04 — Search for a territory

> As a user, I want to type a district name and jump to it so I don't need to
> pan manually.

**Acceptance criteria:**

- Search input accepts district name (case-insensitive, partial match).
- Selecting a result flies the map camera to that district and opens its detail panel.

### US-05 — Click territory → detail panel

> As a planner, I want to click on a territory and see a side panel with its
> indicator values and metadata so I can analyze specific areas.

**Acceptance criteria:**

- Clicking a district polygon opens a side panel with:
  - District name
  - All 3 V0 indicator values for the selected territory
  - Data source and reference year
- Panel is dismissible (close button or click outside).
- On mobile, panel slides up from bottom (< 768 px viewport).

### US-06 — Compare two territories (A vs B)

> As a researcher, I want to compare two districts side by side in the panel
> so I can communicate the gap between them.

**Acceptance criteria:**

- After selecting territory A, user can pin it and select territory B.
- Panel shows A and B columns with all 3 indicator values per territory.
- Clear visual differentiation between A and B.

### US-07 — Share via URL permalink

> As a planner, I want to copy a URL that preserves my current map state so
> that a colleague opens the same view.

**Acceptance criteria:**

- URL encodes: active indicator, UBS toggle state, selected territory (if any).
- Pasting the URL in a new tab restores the full state.
- URL is human-readable and short (no binary blobs).

### US-08 — Reset to default view

> As a user, I want a Reset button that returns the map to its default state
> so I can start fresh.

**Acceptance criteria:**

- Reset clears selected territory, sets default indicator, closes detail panel,
  returns camera to initial São Paulo view.
- URL is also reset (history.pushState or replaceState).

### US-09 — Read methodology page

> As a stakeholder, I want a `/metodologia` page explaining data sources,
> definitions, limitations, and MAUP risk so I can trust and cite the map.

**Acceptance criteria:**

- Page is reachable via a link in the `/mapa` header/footer.
- Sections: Data sources, Indicator definitions, Classification method,
  MAUP note, Limitations.
- Readable by non-specialists (no jargon).
- WCAG AA contrast and font size ≥ 16 px body text.

---

## 5. Functional Requirements

### 5.1 Indicator Catalogue

Each indicator is a record with fields:
`id`, `nome`, `definição`, `unidade`, `fonte`, `ano`, `método`, `limitações`,
`última_atualização`.

V0 Indicators:

| #   | ID                | Label                           | Unit      | Source                      |
| --- | ----------------- | ------------------------------- | --------- | --------------------------- |
| 1   | `pop-60plus`      | % população 60 anos ou mais     | %         | SEADE 2025                  |
| 2   | `vulnerabilidade` | Índice proxy de vulnerabilidade | index 0–1 | TBD (see §7 open questions) |
| 3   | `gap-prioritario` | GAP Prioritário                 | class 1–5 | Computed                    |

### 5.2 GAP Composite Indicator

- Components: (1) pop-60plus normalized 0–1 (percentile rank), (2) vulnerability
  normalized 0–1, (3) UBS density (inverse, normalized 0–1).
- GAP = weighted mean (weights to be defined and documented — see §7).
- Classified into 5 ordinal classes: "muito baixo", "baixo", "médio", "alto",
  "muito alto".
- Computation is **offline** (pre-computed, written to `maps-data.json`).

### 5.3 Route Structure

| Route          | Description                           |
| -------------- | ------------------------------------- |
| `/mapa`        | Main product page (currently `/maps`) |
| `/metodologia` | Methodology and sources               |
| `/`            | Landing — link to `/mapa`             |

### 5.4 URL State Encoding

Query string parameters:

| Param | Values                                                 | Default      |
| ----- | ------------------------------------------------------ | ------------ |
| `ind` | `pop-60plus` \| `vulnerabilidade` \| `gap-prioritario` | `pop-60plus` |
| `ubs` | `1` \| `0`                                             | `0`          |
| `t`   | district code (string)                                 | none         |
| `t2`  | district code (string, comparison territory)           | none         |

Example: `/mapa?ind=gap-prioritario&ubs=1&t=80001`

### 5.5 Visualization Rules

- Sequential palette (5 stops) — ColorBrewer Blues or equivalent; no rainbow.
- Legend must show: indicator label, class breaks, unit, method name.
- UBS points: circle markers, clustered at zoom < 12.
- Cluster shows count badge; expand on click.
- Choropleth hover: cursor pointer, tooltip with district name + value.

### 5.6 Accessibility Requirements (WCAG 2.2 AA minimum)

- Text contrast ratio ≥ 4.5:1 for normal text; ≥ 3:1 for large text.
- All interactive controls have visible focus indicator.
- Click targets ≥ 44 × 44 px.
- Loading states communicated via `aria-busy` or visible spinner with
  `role="status"`.
- Map canvas has `aria-label` describing the current visualization.
- `/metodologia` page uses semantic headings (`h1`–`h3`) and no jargon.

---

## 6. Data & Technical Architecture

### 6.1 Stack (no changes from existing)

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| Framework       | Next.js 16 (App Router)            |
| UI              | Chakra UI v3                       |
| Map             | `@ttoss/geovis` (MapLibre GL JS 5) |
| Basemap         | OpenFreeMap `positron` style       |
| Language        | TypeScript (strict)                |
| Package manager | pnpm (monorepo root)               |

### 6.2 Data Files (static, pre-computed)

| File                            | Location    | Contents                                        |
| ------------------------------- | ----------- | ----------------------------------------------- |
| `maps-data.json`                | `src/data/` | Year, thresholds, district values per indicator |
| `ubs-data.json`                 | `src/data/` | UBS points: `{id, nome, tipo, lat, lng}[]`      |
| `distrito-municipal-v2.geojson` | `public/`   | District polygon boundaries                     |

`maps-data.json` schema extension for V0:

```typescript
type MapsDataFile = {
  year: number;
  thresholds: Record<IndicatorId, number[]>; // 4 breaks = 5 classes
  districts: DistrictData[];
  mapData: Record<IndicatorId, { geometryId: number; value: number }[]>;
  indicators: IndicatorMeta[];
};

type IndicatorMeta = {
  id: string;
  nome: string;
  definicao: string;
  unidade: string;
  fonte: string;
  ano: number;
  metodo: string;
  limitacoes: string;
  ultimaAtualizacao: string; // ISO date
};
```

### 6.3 ETL Pipeline (offline)

Located in `tmp_data/` (Python scripts):

- Input: SEADE population projections (`idade.json`), vulnerability source (TBD), UBS
  shapefile/CSV (TBD).
- Output: updated `maps-data.json` + new `ubs-data.json`.
- Validation: assert no null values, all 96 district codes present, value ranges
  within expected bounds.

### 6.4 Client State & URL Sync

- All URL-state params live in a custom hook `useMapState()` in
  `src/hooks/use-map-state.ts`.
- Hook uses `next/navigation` (`useRouter`, `useSearchParams`).
- Writes state changes via `router.replace` (no new history entry) except for
  territory selection (which uses `router.push`).

### 6.5 Component Structure (target)

```
src/
  app/
    mapa/             ← rename from maps/
      page.tsx        ← main orchestrator (state wiring)
    metodologia/
      page.tsx
  components/
    map/
      ChoroplethMap.tsx      ← wraps GeoVisCanvas + spec builder
      UbsLayer.tsx           ← UBS points + cluster logic
      TerritorySearch.tsx    ← search input + flyTo
      IndicatorSelector.tsx  ← dropdown with 3 V0 indicators
      LegendPanel.tsx        ← legend + metadata (extracted from current page)
      TerritoryPanel.tsx     ← detail panel (click on district)
      ComparisonPanel.tsx    ← A vs B panel
      ResetButton.tsx
    ui/
      provider.tsx    ← (existing)
  hooks/
    use-map-state.ts  ← URL sync
  data/
    maps-data.json
    ubs-data.json     ← new
  lib/
    indicators.ts     ← indicator catalogue + GAP computation helpers
    classification.ts ← threshold/class computation
```

---

## 7. Open Questions

| #     | Question                                                                                                                       | Owner   | Status |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ |
| OQ-01 | What is the vulnerability proxy source? (IPVS, IVS, or another index?)                                                         | Product | Open   |
| OQ-02 | What are the GAP composite weights? (equal weights = 1/3 each, or domain-defined?)                                             | Product | Open   |
| OQ-04 | UBS data source: CNES shapefile, prefeitura Open Data, or other?                                                               | Data    | Open   |
| OQ-05 | Clustering threshold for UBS points (how many points per tile before clustering)?                                              | Design  | Open   |
| OQ-06 | Should the comparison (A vs B) be accessible from the URL permalink?                                                           | Product | Open   |
| OQ-07 | Mobile breakpoint: full panel slide-up or simplified tooltip?                                                                  | Design  | Open   |
| OQ-08 | Should the existing `cumulative-65plus` and `5year-65plus` categories be preserved alongside the 3 V0 indicators, or replaced? | Product | Open   |

---

## 8. Out-of-Scope Reminder

> See §8 of the product document. The following will NOT be implemented in V0:
> login, time slider, multiple OMS domains, unrestricted export, advanced
> server-side analytics.
