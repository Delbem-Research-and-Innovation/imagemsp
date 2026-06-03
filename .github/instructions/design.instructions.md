---
applyTo: src/app/**,src/components/**,src/config/**
---

# IMAGEM:SP Civic Atlas System — Design Instructions

Apply to all UI, UX, copy, layout, component, token, and visual work.

**System identity:** warm, editorial, cartographic, material public intelligence platform about aging in São Paulo. The design must feel inevitable — not decorative.

---

## Principles

**Atlas, not dashboard.** The product reveals territorial relationships between aging, services, mobility, housing, health, and public space. Composition is editorial and cartographic — not a generic card grid or feature list.

**Calm technology.** Sophistication lives in clarity, rhythm, microinteractions, typography, hierarchy, and well-composed maps. Not in neon, glassmorphism, dark futurism, or AI aesthetics.

**Material as interaction grammar, not Google UI.** Use Material philosophy for surfaces, elevation, states, affordance, and feedback. Buttons look clickable; cards read as surfaces; panels feel layered; active state is unambiguous; keyboard focus is always visible. Every interactive component must implement all applicable states: default, hover, focus, active, selected, disabled, loading, and error. Tooltips are auxiliary — essential information must exist without them.

**Progressive disclosure.** First layer: what it is, why it matters, what I can do, how I start. Expert depth — methodology, sources, uncertainty, downloads, advanced comparisons — belongs in secondary panels, drawers, and metadata.

---

## Audience

Serve a trust pyramid without mixing densities on the first screen:

| Layer         | Audience                                   | Must feel                                |
| ------------- | ------------------------------------------ | ---------------------------------------- |
| Public        | older adults, families, general public     | "I understand and can use this"          |
| Civic         | civil society, press, partners             | "This is serious, clear, and useful"     |
| Institutional | public managers, universities, researchers | "This is technically reliable"           |
| Technical     | analysts, data researchers, developers     | "There is method, source, and structure" |

---

## Tone

Civic, calm, precise, human, editorial, trustworthy. Speaks like an intelligent public institution — not a campaign, startup, or academic paper.

Avoid: NGO charity language, alarmist urgency, SaaS promotional copy, AI hype, bureaucratic government tone, "nossos idosos".

Good: *"Entenda o envelhecimento em São Paulo pelo território."*  
Bad: *"A plataforma inovadora que transforma dados em impacto."*

---

## Brand Identity

### Logo & Visual Mark

The IMAGEM:SP wordmark uses **Gotham Bold** for the "AGE" portion and **Gotham Light/Regular** for the remaining characters, creating typographic emphasis that foregrounds the concept of aging within the name. The subtitle "MAPA INTERATIVO DO ENVELHECIMENTO" is set in **Gotham** uppercase, tracked wide, in a secondary weight.

The logotype must always appear on the `brand.background` (`#F6F1ED`) or on solid `brand.primary` (`#17629F`) surfaces. Never on photographic backgrounds or low-contrast surfaces.

---

## Typography

### Type System

The type system has two fonts only. Do not introduce additional typefaces without explicit design review.

| Role | Typeface | Usage |
|---|---|---|
| **Primary** | Gotham | Logo, headings (H1–H3), UI labels, navigation, buttons, data indicators |
| **Supporting** | Source Serif 4 | Body text, long-form editorial content, documents, captions, methodology panels |

**Gotham** — geometric sans-serif by Hoefler&Co. Communicates institutional authority with warmth. Use for: logotype, all headings, UI controls, map legends, filter labels, navigation items, CTAs.  
→ License required: [fonts.adobe.com/fonts/gotham](https://fonts.adobe.com/fonts/gotham) or via licensed CDN. Fallback stack: `"Gotham", "Montserrat", "Inter", sans-serif`.

**Source Serif 4** — open-source humanist serif by Adobe (available on [Google Fonts](https://fonts.google.com/specimen/Source+Serif+4)). Use for: all running text, editorial copy, descriptions, data source annotations, accessibility-critical reading contexts.  
→ Free, hosted via Google Fonts or self-hosted. Fallback stack: `"Source Serif 4", "Georgia", serif`.

### Scale Rules

- Body default at **≥18px** equivalent. Never smaller in public-facing content.
- Require **tabular numerals** (`font-variant-numeric: tabular-nums`) for all data indicators, tables, and map labels.
- **Text resizer** (default / large / extra-large) is a system-level feature. It must persist via `localStorage` and scale all text — body, headings, buttons, cards, filters, legends, metadata, forms.

---

## Color

### Palette

All color values are defined in `src/config/theme.ts`. Never hardcode color values in components.

#### Primary Colors (`Principais`)

| Token | Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|---|
| `brand.primary` | Azul | `#17629F` | R23 G98 B159 | C90 M58 Y12 K1 | Primary UI, CTA, navigation active, institutional authority, map overlay |
| `brand.accent` | Laranja | `#D65A2C` | R214 G90 B44 | C11 M75 Y89 K2 | Section labels, accent highlights, hover states, interactive emphasis |

#### Auxiliary Colors (`Auxiliares`)

| Token | Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|---|
| `brand.background` | Bege | `#F6F1ED` | R246 G241 B237 | C4 M6 Y7 K0 | Page background, editorial atmosphere, warm neutral canvas |
| `neutral.dark` | Cinza Escuro | `#2F2D3A` | R47 G45 B58 | C79 M72 Y50 K58 | Body text on light surfaces, deep headings, data labels |
| `brand.light` | Azul Claro | `#C6E2FF` | R198 G226 B255 | C26 M5 Y0 K0 | Data surface highlights, map layer fills, hover background, selected state |

### Color Distribution

- **~80%** warm neutrals — `brand.background` (`#F6F1ED`), off-white surfaces, stone tones
- **~15%** institutional blue — `brand.primary` (`#17629F`) for authority, structure, navigation
- **~5%** warm accent — `brand.accent` (`#D65A2C`) for calls to action, labels, memorable moments

> **Rationale:** Laranja replaces the prior "amber/clay/terracotta" concept with a precisely defined value from the official brand identity. Azul replaces "deep forest green" as the institutional authority color — matching the project's actual visual ID.

### Cartographic Color Rules

- Never color areas by raw counts; use rates and proportions.
- Use 5–7 classes for continuous variables; prefer natural breaks or quantiles over equal intervals.
- Bivariate maps belong in the analysis layer, not the first view.
- Test every cartographic color scale for **deuteranopia** and **protanopia** before use.
- Derive all data-layer chromatic scales from `brand.primary` (`#17629F`) and `brand.light` (`#C6E2FF`) as anchors. Use `neutral.dark` (`#2F2D3A`) for high-contrast text overlays on maps.

---

## Tokens

`src/config/theme.ts` is the single source of truth for all design tokens: palette colors, semantic colors, text styles, radii, sizes, durations, easings, and shadows. Read it before writing any visual value.

**Mandate:** always reference tokens. Never hardcode a value that has a token equivalent.

**Semantic layer is the component API.** Prefer `surface.raised`, `surface.base`, `text.primary`, `brand.solid` over raw palette references. Use raw palette values only when defining new semantic tokens inside `theme.ts`.

**When a token is missing:** add it to `theme.ts` as a semantic token. Name by role, not appearance — `surface.input`, not `gray.100`. Place palette values in `tokens`, role mappings in `semanticTokens`.

**When a raw value is genuinely unavoidable** (third-party constraint, CSS primitive with no token path): document the exception in JSDoc on the component — one sentence stating why no token applies.

### Minimum Required Semantic Token Map

```ts
// Excerpt — extend in theme.ts
brand: {
  primary:    '#17629F',  // Azul
  accent:     '#D65A2C',  // Laranja
  light:      '#C6E2FF',  // Azul Claro
  background: '#F6F1ED',  // Bege
},
neutral: {
  dark:       '#2F2D3A',  // Cinza Escuro
},
```

---

## Surfaces

Each surface communicates a role:

| Surface token | Role | Color anchor |
|---|---|---|
| `surface.page` | Editorial atmosphere | `brand.background` `#F6F1ED` |
| `surface.content` | Reading, calm | Off-white over `#F6F1ED` |
| `surface.data` | Precise, technical | `brand.light` `#C6E2FF` |
| `surface.map` | Cartographic | Neutral base + `brand.primary` overlays |
| `surface.action` | Tactile, CTAs, filters | `brand.primary` `#17629F` or `brand.accent` `#D65A2C` |
| `surface.trust` | Sources, methodology | Subtle border, `neutral.dark` `#2F2D3A` text |

No glass, neumorphism, or shadow-only affordance.

---

## Accessibility

WCAG 2.2 AA+ minimum. Design for older adults as the baseline, not an afterthought — the identity must be born accessible.

- Never rely on color alone for state, category, or selection.
- Use large targets, visible focus, keyboard navigation, stable layouts, and readable labels.
- Respect `prefers-reduced-motion`; motion clarifies state, never required for comprehension.
- Verify contrast: `brand.primary` (#17629F) on `brand.background` (#F6F1ED) = **4.6:1** (passes AA for normal text ≥18px); verify at all sizes.
- `neutral.dark` (#2F2D3A) on `brand.background` (#F6F1ED) = **~11:1** (AAA). Use for body and headings.
- `brand.accent` (#D65A2C) on `brand.background` (#F6F1ED) — verify contrast before use on text smaller than 18px bold.

---

## Imagery and Visual Language

Use cartographic language: territory lines, São Paulo contours, cartographic grids, micro-maps, proportional points, evidence panels, flow diagrams.

Never: stock photos of smiling elderly people, generic health icons, SaaS illustrations with figures, or decorative illegible maps.

---

## Data Visualization

Visualization is interpretation.

- Use 5–7 classes for continuous variables; prefer natural breaks or quantiles over equal intervals.
- Bivariate maps belong in the analysis layer, not the first view.
- Surface data uncertainty in the public layer without overloading it — show the limitation, defer the detail.
- Test every cartographic color scale for deuteranopia and protanopia before use.

---

## Homepage

Lightweight map and interface previews — not abstract marketing. Must build understanding and trust before routing to the map.

- Do not load the full map engine on the homepage.
- Search is the fastest path into the app; organize by user tasks and age-friendly domains, not database structure.
- Every map and chart exposes legend, source, year, unit, and limitations.

---

## Avoid

SaaS generic, government portal gray, NGO campaign, academic PDF, cold dashboard, trendy AI aesthetic, decorative glass, aesthetic-only gradients, hover-only information, invisible flat controls, overloaded single maps.

Do not introduce typefaces beyond Gotham and Source Serif 4 without explicit approval.

Do not use forest green, teal, or purple as primary colors — these conflict with the official brand palette.
