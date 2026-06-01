A direção final deve ser: **IMAGEMSP Civic Atlas System** — uma marca pública, cartográfica, material, editorial e tecnológica, mas acessível por padrão.

A base técnica deve seguir design tokens semânticos, não cores soltas. Material Design 3 reforça essa lógica: tokens devem nomear valores pelo papel que exercem na interface, não apenas pelo valor visual. ([Material Design][1]) Para acessibilidade, a paleta precisa respeitar contraste mínimo de texto e permitir leitura por pessoas com baixa visão; WCAG 2.2 define contraste mínimo de 4.5:1 para texto normal e também exige redimensionamento de texto até 200% sem perda de conteúdo ou funcionalidade. ([W3C][2])

# 1. Paleta da marca

## Direção

A paleta deve preservar a atmosfera que definimos:

```txt
papel quente
oliva profundo
tinta escura
pedra / areia
barro / âmbar
cartografia acessível
```

Ela deve parecer:

```txt
editorial
territorial
institucional
tecnológica sem frieza
artística sem decoração excessiva
```

## Brand primitives

```ts
export const brandColors = {
  ink: {
    950: '#1F1712', // primary text
    800: '#3A3028',
    700: '#51463D',
    600: '#6B5F54',
  },

  paper: {
    50: '#FFF9F0',
    100: '#FFF4E8',
    200: '#FCEBD7',
    300: '#F4DFC5', // main warm page background
    400: '#E7D4B7',
    500: '#D6C1A2',
  },

  olive: {
    50: '#F0F3E8',
    100: '#DDE5CF',
    200: '#C3CEAA',
    300: '#9EAD7E',
    400: '#75845B',
    500: '#5F6B4A',
    600: '#4E5B3B',
    700: '#3F4F30', // primary brand
    800: '#334024',
    900: '#273219',
  },

  clay: {
    50: '#F8E8DF',
    100: '#EBC8B6',
    200: '#D99B7C',
    300: '#BF734E',
    400: '#A65F3E',
    500: '#9C5737', // accent, AA on light surface
    600: '#81452C',
    700: '#673421',
  },

  amber: {
    50: '#FAECD4',
    100: '#E9C993',
    200: '#C58E45',
    300: '#9A6420',
    400: '#8A5A13', // readable warm accent
    500: '#70470D',
  },

  blue: {
    50: '#E5F0F3',
    100: '#BED9E2',
    300: '#6A9AAF',
    500: '#2F5F73', // info / links when olive is not enough
    700: '#214555',
  },

  red: {
    50: '#F7E2DE',
    100: '#E9B8AE',
    300: '#B85A4D',
    500: '#8B2E24', // destructive/error
    700: '#662017',
  },
};
```

---

# 2. Semantic color tokens

Use estes tokens na UI. Componentes nunca devem consumir `brandColors.olive.700` diretamente se existe um papel semântico como `action.primary`.

```ts
export const colorTokens = {
  background: {
    page: brandColors.paper[300],
    pageSoft: brandColors.paper[200],
    inverse: brandColors.ink[950],
  },

  surface: {
    base: brandColors.paper[100],
    raised: '#FFF6E8',
    muted: brandColors.paper[400],
    inset: '#EEDCC2',
    map: '#F6E7D1',
  },

  text: {
    primary: brandColors.ink[950],
    secondary: brandColors.ink[700],
    muted: brandColors.ink[600],
    inverse: brandColors.paper[100],
    onPrimary: brandColors.paper[100],
    onAccent: brandColors.paper[100],
  },

  border: {
    subtle: '#D9C6A9',
    default: '#BDA98C',
    strong: brandColors.olive[700],
  },

  action: {
    primary: brandColors.olive[700],
    primaryHover: brandColors.olive[800],
    primaryPressed: brandColors.olive[900],
    secondary: brandColors.paper[100],
    secondaryHover: brandColors.paper[200],
    accent: brandColors.clay[500],
    accentHover: brandColors.clay[600],
  },

  focus: {
    ring: brandColors.blue[500],
    ringOffset: brandColors.paper[100],
  },

  link: {
    default: brandColors.olive[700],
    hover: brandColors.olive[900],
    visited: brandColors.clay[600],
  },

  state: {
    success: '#41613B',
    warning: brandColors.amber[400],
    error: brandColors.red[500],
    info: brandColors.blue[500],
  },

  map: {
    background: '#F6E7D1',
    boundary: '#8D806B',
    boundaryStrong: brandColors.ink[700],
    selected: brandColors.olive[700],
    hover: brandColors.clay[500],
    noData: '#D8CEC0',
    water: '#D8E7E8',
    road: '#D2BFA2',
  },
};
```

## Regras de uso

```txt
Texto principal: sempre ink sobre paper/surface.
CTA primário: olive profundo com texto paper claro.
Acento clay: usar com parcimônia para ênfase, não como cor dominante.
Amber: usar para alerta, destaque editorial ou marcação; evitar como texto pequeno se não houver contraste suficiente.
Azul: reservar para foco, links auxiliares, informação ou estados técnicos.
Vermelho: apenas erro, risco ou ação destrutiva.
```

---

# 3. Paleta cartográfica

O mapa precisa ter identidade visual, mas não pode sacrificar interpretação. Evite escalas puramente decorativas.

---

# 4. Tipografia

## Decisão tipográfica

Eu recomendo esta combinação:

```txt
Primary UI/body: IBM Plex Sans
Editorial display: Newsreader
Optional accessibility face: Atkinson Hyperlegible Next
Mono/data/code: IBM Plex Mono
```

**Por quê:** IBM Plex Sans é versátil, global e tem equilíbrio entre forma natural e engenharia, o que combina com “tecnologia pública” sem parecer frio. ([IBM][3]) Newsreader foi desenhada para leitura contínua em ambientes ricos em conteúdo e traz a camada editorial/artística que falta à interface. ([Google Fonts][4]) Atkinson Hyperlegible foi criada para leitores com baixa visão, com formas de letras e números mais distinguíveis; ela pode ser usada em um futuro modo de alta legibilidade ou em contextos críticos de acessibilidade. ([Braille Institute][5])

## Family tokens

```ts
export const fontTokens = {
  family: {
    sans: `"IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    display: `"Newsreader", Georgia, "Times New Roman", serif`,
    accessible: `"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, sans-serif`,
    mono: `"IBM Plex Mono", "SFMono-Regular", Consolas, monospace`,
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

---

# 5. Type scale tokens

A escala deve ser **editorial-first, data-capable, map-compatible, accessibility-led**.

Use `rem`, `clamp()` e tokens semânticos. Não use `px` hardcoded em componentes.

```ts
export const typographyTokens = {
  display: {
    fontFamily: fontTokens.family.display,
    fontSize: 'clamp(3rem, 7vw, 6.5rem)',
    lineHeight: '0.95',
    letterSpacing: '-0.04em',
    fontWeight: fontTokens.weight.semibold,
  },

  h1: {
    fontFamily: fontTokens.family.display,
    fontSize: 'clamp(2.5rem, 5vw, 4.75rem)',
    lineHeight: '1',
    letterSpacing: '-0.035em',
    fontWeight: fontTokens.weight.semibold,
  },

  h2: {
    fontFamily: fontTokens.family.sans,
    fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
    lineHeight: '1.08',
    letterSpacing: '-0.03em',
    fontWeight: fontTokens.weight.semibold,
  },

  h3: {
    fontFamily: fontTokens.family.sans,
    fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
    lineHeight: '1.18',
    letterSpacing: '-0.02em',
    fontWeight: fontTokens.weight.semibold,
  },

  lead: {
    fontFamily: fontTokens.family.sans,
    fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)',
    lineHeight: '1.5',
    letterSpacing: '-0.01em',
    fontWeight: fontTokens.weight.regular,
  },

  bodyLg: {
    fontFamily: fontTokens.family.sans,
    fontSize: '1.1875rem',
    lineHeight: '1.65',
    letterSpacing: '0',
    fontWeight: fontTokens.weight.regular,
  },

  body: {
    fontFamily: fontTokens.family.sans,
    fontSize: '1.125rem',
    lineHeight: '1.6',
    letterSpacing: '0',
    fontWeight: fontTokens.weight.regular,
  },

  bodySm: {
    fontFamily: fontTokens.family.sans,
    fontSize: '1rem',
    lineHeight: '1.55',
    letterSpacing: '0',
    fontWeight: fontTokens.weight.regular,
  },

  label: {
    fontFamily: fontTokens.family.sans,
    fontSize: '1rem',
    lineHeight: '1.35',
    letterSpacing: '0.005em',
    fontWeight: fontTokens.weight.medium,
  },

  caption: {
    fontFamily: fontTokens.family.sans,
    fontSize: '0.9375rem',
    lineHeight: '1.45',
    letterSpacing: '0.01em',
    fontWeight: fontTokens.weight.regular,
  },

  metadata: {
    fontFamily: fontTokens.family.sans,
    fontSize: '0.9375rem',
    lineHeight: '1.45',
    letterSpacing: '0.01em',
    fontWeight: fontTokens.weight.medium,
  },

  dataLg: {
    fontFamily: fontTokens.family.sans,
    fontSize: 'clamp(2rem, 4vw, 4rem)',
    lineHeight: '1',
    letterSpacing: '-0.04em',
    fontWeight: fontTokens.weight.semibold,
    fontVariantNumeric: 'tabular-nums',
  },

  data: {
    fontFamily: fontTokens.family.sans,
    fontSize: '1.25rem',
    lineHeight: '1.25',
    letterSpacing: '-0.015em',
    fontWeight: fontTokens.weight.semibold,
    fontVariantNumeric: 'tabular-nums',
  },

  button: {
    fontFamily: fontTokens.family.sans,
    fontSize: '1.0625rem',
    lineHeight: '1.25',
    letterSpacing: '0',
    fontWeight: fontTokens.weight.semibold,
  },
};
```

---

# 6. Text-size variants

Para o resizer:

```ts
export const textSizeTokens = {
  default: {
    scale: 1,
  },
  large: {
    scale: 1.125,
  },
  extraLarge: {
    scale: 1.25,
  },
};
```

Implementação recomendada:

```css
:root {
  --text-scale: 1;
}

html[data-text-size='large'] {
  --text-scale: 1.125;
}

html[data-text-size='extra-large'] {
  --text-scale: 1.25;
}
```

E os tokens finais podem multiplicar o valor base:

```css
font-size: calc(var(--font-body) * var(--text-scale));
```

---

# 7. Spacing, radius, elevation

## Spacing

```ts
export const spacingTokens = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};
```

## Radius

```ts
export const radiusTokens = {
  none: '0',
  xs: '0.375rem',
  sm: '0.625rem',
  md: '0.875rem',
  lg: '1.25rem',
  xl: '1.75rem',
  '2xl': '2.25rem',
  pill: '999px',
};
```

## Elevation

```ts
export const elevationTokens = {
  none: 'none',
  hairline: '0 0 0 1px rgba(31, 23, 18, 0.08)',
  raised: '0 1px 2px rgba(31, 23, 18, 0.08), 0 8px 24px rgba(31, 23, 18, 0.06)',
  floating:
    '0 4px 12px rgba(31, 23, 18, 0.10), 0 20px 48px rgba(31, 23, 18, 0.08)',
  focus: '0 0 0 3px rgba(47, 95, 115, 0.35)',
};
```

---

# 8. Component base tokens

```ts
export const componentTokens = {
  button: {
    height: {
      sm: '2.75rem',
      md: '3.25rem',
      lg: '3.75rem',
    },
    paddingX: {
      sm: spacingTokens[4],
      md: spacingTokens[5],
      lg: spacingTokens[6],
    },
    radius: radiusTokens.pill,
  },

  card: {
    background: colorTokens.surface.raised,
    border: colorTokens.border.subtle,
    radius: radiusTokens.xl,
    shadow: elevationTokens.raised,
    padding: spacingTokens[6],
  },

  panel: {
    background: colorTokens.surface.raised,
    border: colorTokens.border.subtle,
    radius: radiusTokens['2xl'],
    shadow: elevationTokens.floating,
    padding: spacingTokens[6],
  },

  input: {
    background: colorTokens.surface.base,
    border: colorTokens.border.default,
    borderFocus: colorTokens.focus.ring,
    radius: radiusTokens.lg,
    height: '3.5rem',
    paddingX: spacingTokens[4],
    font: typographyTokens.body,
  },

  chip: {
    background: colorTokens.surface.base,
    backgroundSelected: colorTokens.action.primary,
    textSelected: colorTokens.text.onPrimary,
    border: colorTokens.border.default,
    radius: radiusTokens.pill,
    minHeight: '2.75rem',
  },
};
```

---

# 9. Motion tokens

```ts
export const motionTokens = {
  duration: {
    fast: '120ms',
    base: '180ms',
    slow: '260ms',
  },

  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  },
};
```

Regra: motion deve ajudar feedback e orientação, nunca carregar significado essencial. Respeitar `prefers-reduced-motion`.

---

# 10. Regra final para `theme.ts`

A estrutura recomendada:

```ts
export const theme = {
  color: colorTokens,
  mapColor: mapColorTokens,
  font: fontTokens,
  typography: typographyTokens,
  textSize: textSizeTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  elevation: elevationTokens,
  motion: motionTokens,
  component: componentTokens,
} as const;
```

## Decisão final

A marca do IMAGEMSP deve ser reconhecível por esta combinação:

```txt
warm paper + deep olive + ink text + clay accent
IBM Plex Sans + Newsreader
material surfaces + editorial rhythm
large accessible type + cartographic restraint
```

Isso dá ao site a sensação correta: **moderno, público, tecnológico, sofisticado, acessível e próprio**.

[1]: https://m3.material.io/foundations/design-tokens?utm_source=chatgpt.com 'Design tokens – Material Design 3'
[2]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum?utm_source=chatgpt.com 'Understanding Success Criterion 1.4.3: Contrast (Minimum)'
[3]: https://www.ibm.com/plex/?utm_source=chatgpt.com 'Introduction | IBM Plex'
[4]: https://fonts.google.com/specimen/Newsreader?utm_source=chatgpt.com 'Newsreader'
[5]: https://www.brailleinstitute.org/freefont/?utm_source=chatgpt.com 'Atkinson Hyperlegible Font'
