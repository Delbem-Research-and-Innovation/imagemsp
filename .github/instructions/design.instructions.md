---
applyTo: 'src/app/**,src/components/**,src/config/**'
---

# IMAGEM:SP Civic Atlas System — Design Instructions

Apply to all UI, UX, copy, layout, component, token, and visual work.

**System identity:** warm, editorial, cartographic, material public intelligence platform about aging in São Paulo. The design must feel inevitable — not decorative.

## Principles

**Atlas, not dashboard.** The product reveals territorial relationships between aging, services, mobility, housing, health, and public space. Composition is editorial and cartographic — not a generic card grid or feature list.

**Calm technology.** Sophistication lives in clarity, rhythm, microinteractions, typography, hierarchy, and well-composed maps. Not in neon, glassmorphism, dark futurism, or AI aesthetics.

**Material as interaction grammar, not Google UI.** Use Material philosophy for surfaces, elevation, states, affordance, and feedback. Buttons look clickable; cards read as surfaces; panels feel layered; active state is unambiguous; keyboard focus is always visible. Every interactive component must implement all applicable states: default, hover, focus, active, selected, disabled, loading, and error. Tooltips are auxiliary — essential information must exist without them.

**Progressive disclosure.** First layer: what it is, why it matters, what I can do, how I start. Expert depth — methodology, sources, uncertainty, downloads, advanced comparisons — belongs in secondary panels, drawers, and metadata.

## Audience

Serve a trust pyramid without mixing densities on the first screen:

| Layer         | Audience                                   | Must feel                                |
| ------------- | ------------------------------------------ | ---------------------------------------- |
| Public        | older adults, families, general public     | "I understand and can use this"          |
| Civic         | civil society, press, partners             | "This is serious, clear, and useful"     |
| Institutional | public managers, universities, researchers | "This is technically reliable"           |
| Technical     | analysts, data researchers, developers     | "There is method, source, and structure" |

## Tone

Civic, calm, precise, human, editorial, trustworthy. Speaks like an intelligent public institution — not a campaign, startup, or academic paper.

Avoid: NGO charity language, alarmist urgency, SaaS promotional copy, AI hype, bureaucratic government tone, "nossos idosos".

Good: _"Entenda o envelhecimento em São Paulo pelo território."_ — Bad: _"A plataforma inovadora que transforma dados em impacto."_

## Tokens

`src/config/theme.ts` is the single source of truth for all design tokens: palette colors, semantic colors, text styles, radii, sizes, durations, easings, and shadows. Read it before writing any visual value.

**Mandate:** always reference tokens. Never hardcode a value that has a token equivalent.

**Semantic layer is the component API.** Prefer `surface.raised`, `surface.base`, `text.primary`, `brand.solid` over raw palette references (`paper.200`, `olive.900`). Use raw palette values only when defining new semantic tokens inside `theme.ts`.

**When a token is missing:** add it to `theme.ts` as a semantic token. Name by role, not appearance — `surface.input`, not `gray.100`. Place palette values in `tokens`, role mappings in `semanticTokens`.

**When a raw value is genuinely unavoidable** (third-party constraint, CSS primitive with no token path): document the exception in JSDoc on the component — one sentence stating why no token applies.

## Color

80% warm neutrals (warm linen, stone, paper), 15% deep forest green (institutional authority), 5% warm accent (amber, clay, terracotta — rare and memorable). Cartographic accessible scales for data layers. Never color areas by raw counts; use rates and proportions. Color values are defined in `src/app/theme.ts` — never hardcoded in components.

## Surfaces

Each surface communicates a role: **page background** (editorial atmosphere), **content surface** (reading, calm), **data surface** (precise, technical), **map surface** (cartographic), **action surface** (tactile, evident CTAs and filters), **trust surface** (sources, methodology — institutional). No glass, neumorphism, or shadow-only affordance.

## Typography

Editorial-first, data-capable, map-compatible, accessibility-led. The type scale must serve body reading, data indicators, map labels, and UI controls with equal legibility. Require tabular numerals for indicators and tables. Body default comfortable at ≥18px equivalent; no text too small to read without strong vision.

The **text resizer** (default / large / extra-large) is a system-level feature, not an accessory. It must persist via `localStorage` and scale all text — body, headings, buttons, cards, filters, legends, metadata, forms.

## Accessibility

WCAG 2.2 AA+ minimum. Design for older adults as the baseline, not an afterthought — the identity must be born accessible. Never rely on color alone for state, category, or selection. Use large targets, visible focus, keyboard navigation, stable layouts, and readable labels. Respect `prefers-reduced-motion`; motion clarifies state, never required for comprehension.

## Imagery and visual language

Use cartographic language: territory lines, São Paulo contours, cartographic grids, micro-maps, proportional points, evidence panels, flow diagrams. Never stock photos of smiling elderly people, generic health icons, SaaS illustrations with figures, or decorative illegible maps.

## Data visualization

Visualization is interpretation. Use 5–7 classes for continuous variables; prefer natural breaks or quantiles over equal intervals. Bivariate maps belong in the analysis layer, not the first view. Surface data uncertainty in the public layer without overloading it — show the limitation, defer the detail. Test every cartographic color scale for deuteranopia and protanopia before use.

## Homepage

Lightweight map and interface previews — not abstract marketing. Must build understanding and trust before routing to the map. Do not load the full map engine on the homepage. Search is the fastest path into the app; organize by user tasks and age-friendly domains, not database structure. Every map and chart exposes legend, source, year, unit, and limitations.

## Avoid

SaaS generic, government portal gray, NGO campaign, academic PDF, cold dashboard, trendy AI aesthetic, decorative glass, aesthetic-only gradients, hover-only information, invisible flat controls, overloaded single maps.
