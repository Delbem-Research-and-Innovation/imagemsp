# IMAGEMSP Accessible Typography and Text Resizer Instructions

## Purpose

IMAGEMSP must be readable by older adults and by users with reduced vision, low digital confidence, or different device conditions. Typography is not cosmetic; it is part of the product’s public accessibility and institutional legitimacy.

Every implementation change must preserve readable, responsive, resizable typography.

## Core problem

Older users commonly need larger text, stronger hierarchy, generous spacing, and interfaces that do not break when text grows. IMAGEMSP is also a map/data product, so small labels, legends, filters, metadata, and dense panels can easily become unusable.

The product must therefore support two layers:

1. **Good default typography**: readable without user adjustment.
2. **User-controlled text resizing**: a simple global control for increasing text size across the site and app.

Do not treat the text resizer as a substitute for accessible defaults.

## Design decision

Implement a global **Text Size** control with three stable options:

```txt
Default
Large
Extra large
```

Do not provide a continuous slider. Three fixed options are easier to understand, easier to test, and less likely to break layout.

Do not allow text to become smaller than the default design. If an “A−” control is used, it may only step down toward `Default`, never below it.

## Source of truth

Use `theme.ts` as the source of truth for all typography tokens.

Do not hardcode font sizes, line heights, or text spacing inside components unless the value is already a token exposed by `theme.ts`.

Do not duplicate the typography scale in component files.

Expected token responsibilities in `theme.ts`:

```txt
font families
semantic font sizes
responsive type scale
line heights
letter spacing
font weights
text-size scale variants
component typography variants
```

The exact values belong in `theme.ts`; components should consume semantic tokens.

## Typography baseline

Maintain these product rules:

```txt
Body text should be comfortable by default, generally around 18px or larger.
UI labels, inputs, buttons, legends, and panel text must remain readable.
Metadata and captions must not become tiny.
Line height for prose should be generous, usually at least 1.5.
Long text blocks should use readable measure, not full-width lines.
Headings should create hierarchy without relying on decorative typography.
```

Use relative units (`rem`, `em`, token references, CSS custom properties). Avoid fixed `px` font sizes in components.

Do not set `html { font-size: 62.5%; }`. Keep browser/user font preferences respected.

Do not disable browser zoom or pinch zoom.

Never use images of text for interface text, labels, navigation, legends, cards, or explanations.

## Recommended implementation model

Use a root attribute and CSS variables:

```txt
<html data-text-size="default">
<html data-text-size="large">
<html data-text-size="extra-large">
```

Implementation should:

1. Store the selected text size in localStorage.
2. Apply the stored value before or during initial render to avoid visible layout flash.
3. Set the value on `document.documentElement.dataset.textSize`.
4. Use semantic CSS variables or theme tokens that respond to `data-text-size`.
5. Keep the control available from the global header and from the Accessibility page.

Suggested files:

```txt
components/accessibility/TextSizeControl.tsx
hooks/useTextSize.ts
lib/accessibility/text-size.ts
styles/globals.css or equivalent token bridge
theme.ts
```

Names may vary according to the repository architecture, but keep the concern centralized.

## Text Size control UX

The control must be visible, simple, keyboard-accessible, and understandable.

Preferred label:

```txt
Tamanho do texto
```

Preferred options:

```txt
Padrão
Grande
Muito grande
```

Alternative compact control:

```txt
A-
A
A+
```

If using the compact version, include accessible labels:

```txt
aria-label="Reduzir tamanho do texto"
aria-label="Tamanho do texto padrão"
aria-label="Aumentar tamanho do texto"
```

Rules:

```txt
Use real <button> elements.
Show visible active state.
Use aria-pressed or equivalent state indication.
Support keyboard interaction.
Keep target size large enough for touch.
Do not hide the control behind an obscure icon only.
Do not rely on hover.
Do not use animation as the only feedback.
Persist the selected size.
```

The control should not dominate the interface. It should feel like a civic accessibility tool, not a decorative widget.

## Layout behavior when text increases

All layouts must survive `Large` and `Extra large`.

When text grows:

```txt
Content must reflow.
Cards must grow vertically.
Panels must not clip text.
Buttons must expand or wrap labels cleanly.
Forms must preserve labels and error messages.
Map legends must remain readable.
Drawer/sidebar content must scroll when necessary.
CTAs must remain understandable.
No essential text may be truncated.
```

Avoid:

```txt
fixed-height text containers
line-clamp for essential information
absolute positioning that assumes one text size
icons without labels
buttons with fixed widths that clip labels
dense grids that do not collapse
text inside canvas/SVG without accessible alternative
```

Horizontal scrolling is acceptable only for content that genuinely requires two-dimensional reading, such as some tables or maps. Even then, provide clear affordance and an accessible textual summary.

## Map and data interface requirements

The text resizing system applies to:

```txt
navigation
cards
forms
buttons
filters
chips
side panels
drawers
tooltips
legends
metadata
source labels
error messages
empty states
chart labels where technically possible
map UI controls
```

For map-rendered labels that cannot scale with normal DOM typography, provide at least one of:

```txt
a large-label map style
larger DOM-based legend and selected-region panel
plain-language textual summary of the selected map state
```

Do not make core interpretation depend only on small map labels.

## Responsive typography

Responsive typography must respect user preferences.

Use responsive tokens from `theme.ts`; do not use viewport-only typography that ignores user/browser font settings.

Use `clamp()` only when it preserves readable minimums and user scaling. Avoid designs where text becomes too small on mobile or too large to reflow on desktop.

The default experience should be comfortable on:

```txt
mobile portrait
tablet
desktop
browser zoom
OS/browser increased font size
site text size: Large
site text size: Extra large
```

## Accessibility requirements

Implementation must support:

```txt
WCAG 2.2 AA
browser zoom to at least 200% without loss of content or functionality
responsive reflow without horizontal scrolling for normal page content
text spacing adjustments without content loss
visible focus states
keyboard navigation
large pointer targets
no disabled zoom
```

Do not ship typography changes without checking them at:

```txt
100% browser zoom + Default
100% browser zoom + Large
100% browser zoom + Extra large
200% browser zoom + Default
mobile width around 320px
mobile width + Extra large
```

## Component implementation rules

When creating or editing components:

```txt
Use semantic typography variants from theme.ts.
Use layout primitives that allow vertical expansion.
Prefer min-height over fixed height.
Prefer flexible grids that collapse.
Do not hide text behind hover-only tooltips.
Do not truncate essential labels.
Do not create icon-only controls unless there is a visible label nearby or an explicit accessible name.
Do not set font-size locally unless creating a reusable tokenized variant.
```

If a component cannot support `Extra large`, redesign the component. Do not reduce the font size to make it fit.

## Content rules

Text resizing works better when writing is concise.

Use:

```txt
short labels
plain language
clear headings
one idea per card
short paragraphs
visible source and metadata text
```

Avoid:

```txt
dense paragraphs
jargon in the public layer
tiny legal-style metadata
long button labels
unexplained acronyms
```

## Acceptance criteria

A typography/resizer implementation is acceptable only if:

```txt
The site has readable default typography.
A global Text Size control exists and is reachable from the header.
The selected text size persists across pages.
The control is keyboard-accessible and screen-reader understandable.
Large and Extra large do not break layout.
Essential text is not clipped, hidden, or truncated.
Browser zoom still works independently.
The implementation uses theme.ts tokens.
No component hardcodes typography values outside the token system.
Map legends, filters, panels, and metadata remain readable.
Mobile layout remains usable at Extra large.
```

## Implementation prompt for Copilot

```txt
Implement accessible responsive typography and a global text-size control for IMAGEMSP.

Use design.instructions.md and theme.ts. Do not hardcode font sizes in components.

Create a simple Text Size control with three options: Padrão, Grande, Muito grande. Persist the selected option in localStorage and apply it through a root data attribute such as data-text-size. The control must be available from the global header and from the Accessibility page.

The text-size state must affect semantic typography tokens globally: body text, headings, buttons, inputs, cards, filters, legends, metadata, side panels, drawers, error messages, and map UI text where possible.

Do not allow text to shrink below the default. Do not disable browser zoom. Do not use transform: scale() to resize text. Do not rely on viewport-only font sizing. Use responsive, tokenized, accessible typography.

Ensure the layout reflows at Large, Extra large, 200% browser zoom, and mobile widths. Fix any component that clips, truncates, overlaps, or hides essential text.
```
