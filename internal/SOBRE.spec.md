# IMAGEMSP — About Page Development Spec

## 0. Scope

Build only the `Sobre` page for IMAGEMSP.

The About page must explain what the project is, why it exists, who it serves, where it comes from, and how it should be understood institutionally. It must not become the homepage, the methodology page, the data catalogue, the full team directory, the report archive, or the technical documentation.

Use `design.instructions.md` as the governing design instruction. Use `theme.ts` as the source of truth for colors, typography, spacing, radii, shadows, elevation, motion, and variants. Do not hardcode visual values that belong in `theme.ts`.

---

## 1. Page role

The About page is the institutional narrative layer of IMAGEMSP.

It must establish:

1. what IMAGEMSP is;
2. why São Paulo needs it;
3. what problem it addresses;
4. what kind of public instrument it is;
5. which principles guide it;
6. which audiences it serves;
7. where the project comes from;
8. where the user should go next.

The page should make the project feel serious, public, research-backed, accessible, and state-of-the-art without sounding promotional.

---

## 2. Product framing

Use this product definition as the page anchor:

> IMAGEMSP is a civic digital atlas for understanding aging in São Paulo through territorial data.

Expanded framing:

> The platform integrates demographic, socioeconomic, health, environmental, mobility, housing, service, and territorial indicators to support public understanding, research, planning, policy, and continuous monitoring.

Do not present IMAGEMSP as only:

- a map;
- a dashboard;
- an academic project;
- a municipal portal;
- a data repository;
- a startup product;
- an advocacy campaign.

It is a decision-oriented public evidence infrastructure.

---

## 3. Primary user decisions

The About page must help the user close five decisions:

1. Is this project legitimate?
2. What problem is it trying to solve?
3. What makes it different from a normal map or dashboard?
4. Who is it for?
5. Where should I go if I want data, methodology, participation, or the map?

Everything on the page must serve one of these decisions.

---

## 4. Audience

Write and design for:

- older adults and families;
- public managers;
- researchers;
- civil-society organizations;
- journalists;
- institutional partners;
- technical visitors seeking project legitimacy.

The page must be understandable to non-technical users and credible to technical users.

Do not optimize the first layer for GIS specialists, funders, or academics only.

---

## 5. Tone and UX writing

Voice:

- civic;
- calm;
- precise;
- respectful;
- institutional;
- human;
- evidence-based.

Use plain public language first. Put technical language only in short secondary notes or links to methodology.

Use:

- pessoas idosas;
- envelhecimento;
- território;
- São Paulo;
- condições urbanas;
- serviços;
- cuidado;
- mobilidade;
- moradia;
- saúde;
- segurança;
- participação;
- dados públicos;
- evidências;
- monitoramento;
- políticas públicas.

Avoid:

- nossos idosos;
- população vulnerável as a blanket label;
- revolucionário;
- transformador without proof;
- inteligência artificial as marketing;
- camada choroplética;
- pipeline analítico;
- normalização;
- granularidade in the first layer;
- long academic paragraphs.

---

## 6. Information architecture

Render the About page as a focused editorial page with clear sections.

Required sections, in order:

1. Page hero
2. Why the project exists
3. What IMAGEMSP is
4. What makes it different
5. Who it serves
6. Project origin and institutional context
7. Guiding principles
8. What comes next / calls to action
9. Footer

Optional sections, only if concise:

- Inspiration from IMAGE:NYC
- Research and public policy foundation
- Open source and public access
- Governance / institutions strip

Do not include:

- full methodology;
- full data dictionary;
- full list of variables;
- dense funding/budget details;
- long CV-style team bios;
- report archive;
- live map controls;
- donation or volunteer flows.

---

## 7. Section specifications

### 7.1 Page hero

Purpose: identify the project and its institutional purpose immediately.

Suggested copy:

```txt
Sobre o IMAGEMSP

Um atlas digital para compreender o envelhecimento de São Paulo pelo território.

O IMAGEMSP integra dados públicos e indicadores territoriais para apoiar pesquisa, planejamento, políticas públicas e compreensão social sobre o envelhecimento na cidade.
```

Primary CTA:

```txt
Explorar o mapa
```

Secondary CTA:

```txt
Ver dados e metodologia
```

Visual direction:

- editorial layout;
- warm paper background;
- abstract cartographic figure or São Paulo outline;
- restrained material panel with short project metadata.

Metadata panel example:

```txt
Cidade: São Paulo
Tema: envelhecimento e território
Uso: pesquisa, planejamento e compreensão pública
Acesso: plataforma web pública
```

Rules:

- Do not use a dense live map in the hero.
- Do not place long institutional text above the fold.
- Do not use celebratory or promotional language.

---

### 7.2 Why the project exists

Purpose: explain the problem without alarmism.

Suggested copy:

```txt
São Paulo está envelhecendo em territórios muito diferentes entre si.

A idade da população não é o único dado que importa. O envelhecimento também depende de acesso a serviços, mobilidade, moradia, saúde, segurança, espaços públicos, apoio social e informação. O IMAGEMSP existe para tornar essas relações visíveis.
```

UI:

- two-column editorial block;
- left side: short narrative;
- right side: three concise principle cards.

Cards:

```txt
Envelhecimento é territorial
As condições de cada região influenciam como as pessoas envelhecem.

Dados precisam virar interpretação
A plataforma não deve apenas listar dados, mas ajudar a entender relações.

Política pública precisa de continuidade
Monitorar mudanças ao longo do tempo é parte do valor do projeto.
```

Rules:

- Do not overuse numbers here.
- If a statistic is used, it must include source, year, and link.
- Keep the emotional register sober.

---

### 7.3 What IMAGEMSP is

Purpose: define the product clearly.

Suggested copy:

```txt
O IMAGEMSP é uma plataforma pública, georreferenciada e interativa para visualizar, comparar e interpretar indicadores relacionados ao envelhecimento em São Paulo.

Ele combina dados sobre população, saúde, mobilidade, moradia, espaços públicos, segurança, apoio social e inclusão digital para apoiar decisões mais informadas.
```

UI:

- use a material surface with a simple “not this / this” comparison.

Comparison content:

```txt
Não é apenas um mapa.
É uma infraestrutura de leitura territorial.

Não é apenas um repositório de dados.
É uma forma de relacionar população, serviços e condições urbanas.

Não é apenas uma ferramenta técnica.
É uma plataforma pública com camadas para diferentes usuários.
```

Rules:

- Avoid technical implementation details.
- Link “metodologia” for users who want depth.

---

### 7.4 What makes it different

Purpose: communicate differentiation without hype.

Use four cards:

```txt
Decisão antes de dados
A plataforma parte de perguntas reais sobre território, acesso e cuidado.

Camadas para diferentes públicos
A experiência pública é clara; a camada analítica preserva profundidade técnica.

Estrutura age-friendly
Os temas seguem uma visão ampla do envelhecimento urbano, não apenas saúde.

Monitoramento contínuo
O sistema foi pensado para evoluir com novas fontes, atualizações e contribuições.
```

UI:

- four cards in a responsive grid;
- each card has an icon or abstract mark;
- cards are concise, not feature-heavy.

Rules:

- Do not claim prediction, automation, or causal proof unless implemented and validated.
- Do not imply that the map replaces policy judgment.

---

### 7.5 Who it serves

Purpose: show multi-audience value without fragmenting the page.

Use four audience cards:

```txt
Pessoas idosas e familiares
Para entender melhor o território onde vivem e os serviços ao redor.

Gestores públicos
Para comparar regiões, identificar lacunas e acompanhar prioridades.

Pesquisadores
Para explorar indicadores, hipóteses, fontes e comparações territoriais.

Organizações sociais e parceiros
Para orientar ações, validar informações e colaborar com conhecimento local.
```

UI:

- restrained cards;
- each card may link to a future user journey or relevant page;
- no persona illustrations that stereotype age or vulnerability.

Rules:

- Do not infantilize older adults.
- Do not make technical audiences dominate the hierarchy.

---

### 7.6 Project origin and institutional context

Purpose: establish legitimacy.

Suggested copy:

```txt
O IMAGEMSP nasce no contexto do projeto Desenvolvimento de Mapa Interativo do Envelhecimento para a Cidade de São Paulo, vinculado à Universidade de São Paulo e inspirado por experiências internacionais de mapeamento urbano do envelhecimento.

A proposta reúne pesquisadores e especialistas de áreas como geriatria, gerontologia, saúde pública, computação, geografia, planejamento urbano e políticas públicas.
```

Include compact institutional facts:

```txt
Instituição sede: Faculdade de Medicina da Universidade de São Paulo
Projeto: Mapa Interativo do Envelhecimento para a Cidade de São Paulo
Referência internacional: IMAGE:NYC
Acesso: plataforma web pública
Código e documentação: links quando disponíveis
```

Rules:

- Keep this section factual.
- Do not include budget details.
- Do not include the full team list unless a separate expandable block is already designed.
- If logos are used, keep them visually secondary and accessible.

---

### 7.7 Guiding principles

Purpose: define how the project should be trusted.

Use five compact principles:

```txt
Clareza pública
Informação compreensível antes da complexidade técnica.

Acessibilidade
A interface deve poder ser usada por pessoas com diferentes níveis de visão, destreza, cognição e confiança digital.

Transparência
Indicadores devem mostrar fonte, ano, unidade territorial e limitações.

Responsabilidade territorial
Comparações devem considerar escala, contexto e desigualdades entre regiões.

Evolução contínua
O sistema deve permitir atualização de dados, melhoria de indicadores e contribuição estruturada.
```

UI:

- numbered editorial list or stacked material panels;
- avoid dense paragraphs;
- use icons only if they clarify meaning.

Rules:

- Principles must be operational, not decorative.
- Do not use vague claims like “inovação”, “impacto” or “excelência” without specifying what they mean.

---

### 7.8 What comes next / calls to action

Purpose: route users to the correct next step.

CTA set:

```txt
Explorar o mapa
For users ready to use the platform.

Entender os dados
For users seeking sources, indicators, and methodology.

Participar ou sugerir correções
For users with local knowledge, corrections, or collaboration interest.

Entrar em contato
For institutional, research, press, or partnership questions.
```

UI:

- use a final CTA band;
- primary CTA should be `Explorar o mapa`;
- other CTAs are secondary, grouped clearly.

Rules:

- Do not end the page with generic institutional text.
- End with action and orientation.

---

## 8. Visual design requirements

Follow Civic Material Atlas.

The page should feel:

```txt
institutional but not bureaucratic;
technological but not cold;
artistic but not decorative;
public but not generic;
academic in credibility but not in density.
```

Use:

- editorial spacing;
- warm paper surfaces;
- deep olive actions;
- ink text;
- tactile material cards;
- subtle cartographic lines;
- abstract territorial visuals;
- restrained motion.

Avoid:

- stock photos of older adults;
- cliché healthcare imagery;
- decorative gradients with poor contrast;
- generic SaaS illustrations;
- dense institutional walls of text;
- glassmorphism over readable content.

---

## 9. Accessibility requirements

The About page must meet WCAG 2.2 AA or better.

Requirements:

- semantic HTML;
- one `h1`;
- ordered heading hierarchy;
- body text minimum governed by `theme.ts`;
- visible keyboard focus;
- sufficient text contrast;
- large click/tap targets;
- no hover-only content;
- no essential animation;
- support 200% text zoom;
- image alt text only when image is meaningful;
- decorative art marked appropriately;
- links identifiable without color alone.

---

## 10. Content boundaries

This page may introduce these concepts:

- aging as a territorial issue;
- multidimensional urban conditions;
- public decision support;
- WHO age-friendly logic;
- IMAGE:NYC inspiration;
- public data and transparency;
- accessibility;
- continuous monitoring;
- institutional context.

This page must only link to, not explain in detail:

- full methodology;
- indicator definitions;
- data dictionary;
- technical architecture;
- DAMICORE or analytical pipeline;
- download/export logic;
- uncertainty handling;
- governance documents;
- source update routines;
- complete team bios.

---

## 11. Component requirements

Suggested components:

```txt
AboutHero
ProjectMetadataPanel
EditorialTextBlock
PrincipleCard
DifferenceCard
AudienceCard
InstitutionalContext
CTASection
```

Component rules:

- use shared design system primitives;
- no one-off styling unless unavoidable;
- use `theme.ts` tokens;
- expose state variants for interactive elements;
- keep content data-driven where appropriate;
- do not hardcode repeated section content inside low-level UI components.

---

## 12. Responsive behavior

Desktop:

- editorial two-column blocks allowed;
- cards may use 2x2 grid;
- metadata panel may sit beside hero text.

Tablet:

- collapse complex grids to two columns;
- preserve section rhythm.

Mobile:

- single-column layout;
- CTA order must remain clear;
- avoid horizontal scroll;
- keep cards short;
- no tiny institutional logos;
- hero CTA visible early.

---

## 13. SEO and metadata

Suggested metadata:

```txt
Title: Sobre o IMAGEMSP — Mapa Inteligente do Envelhecimento de São Paulo

Description: Conheça o IMAGEMSP, uma plataforma pública de inteligência territorial sobre o envelhecimento em São Paulo, criada para apoiar pesquisa, planejamento, políticas públicas e compreensão social.
```

Structured content should make these entities clear:

- IMAGEMSP;
- Mapa Inteligente do Envelhecimento de São Paulo;
- São Paulo;
- envelhecimento;
- dados territoriais;
- políticas públicas;
- Universidade de São Paulo;
- IMAGE:NYC.

---

## 14. Analytics events

If analytics exists, track only meaningful interactions:

```txt
about_cta_explore_map_clicked
about_cta_data_methodology_clicked
about_cta_participation_clicked
about_cta_contact_clicked
about_institutional_link_clicked
```

Do not add intrusive tracking or interaction noise.

---

## 15. Acceptance criteria

The About page is approved when:

```txt
A non-technical user understands what IMAGEMSP is.
A technical user understands why the project is credible.
The page explains the project without becoming the methodology page.
The page communicates aging as territorial and multidimensional.
The page identifies the platform as public, evidence-based, and continuously evolving.
The page does not infantilize older adults.
The page does not overclaim automation, prediction, or policy impact.
The page uses Civic Material Atlas style consistently.
The page is readable, responsive, accessible, and keyboard navigable.
The page routes users clearly to map, data/methodology, participation, and contact.
```

---

## 16. Implementation prompt

```txt
Build the IMAGEMSP About page.

Use design.instructions.md and theme.ts. Do not hardcode design tokens.

The page is the institutional narrative for IMAGEMSP. It must explain what the project is, why it exists, who it serves, where it comes from, and what principles guide it. It must not become the homepage, the methodology page, the data catalogue, the report archive, or the full team page.

Use Civic Material Atlas style: warm, editorial, cartographic, material, precise, public, accessible.

Required sections:
1. Hero
2. Why the project exists
3. What IMAGEMSP is
4. What makes it different
5. Who it serves
6. Project origin and institutional context
7. Guiding principles
8. Final CTA section

Primary copy direction:
“IMAGEMSP is a civic digital atlas for understanding aging in São Paulo through territorial data.”

The page must use plain public language, clear headings, tactile surfaces, generous spacing, accessible contrast, visible focus, and responsive layout.

Primary CTA:
Explorar o mapa

Secondary CTAs:
Ver dados e metodologia
Participar ou sugerir correções
Entrar em contato

Do not include full methodology, full data dictionary, full team directory, budget details, dense technical explanation, or live map controls.
```
