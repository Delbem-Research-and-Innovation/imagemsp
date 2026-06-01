# IMAGEM:SP — Mapa Inteligente do Envelhecimento de São Paulo

Plataforma pública de visualização territorial do envelhecimento em São Paulo, desenvolvida no âmbito do projeto FAPESP. Permite que gestores, pesquisadores e cidadãos explorem dados sobre população idosa, serviços de saúde, mobilidade e condições urbanas por distrito municipal.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Rotas](#rotas)
- [Dados](#dados)
- [Desenvolvimento](#desenvolvimento)
- [Qualidade](#qualidade)
- [Roadmap](#roadmap)

---

## Sobre o Projeto

O **IMAGEM:SP** responde à pergunta central:

> **Onde há maior pressão potencial do envelhecimento e menor cobertura básica de serviços, por território?**

A aplicação exibe um mapa coroplético por distrito municipal de São Paulo com indicadores de população idosa (65+), permite filtrar por categoria e faixa etária, e expõe painel de legenda com classificação por quebras naturais.

---

## Stack

| Categoria   | Tecnologia                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router)                |
| UI          | React 19 + Chakra UI v3                |
| Mapa        | MapLibre GL + `@ttoss/geovis`          |
| Linguagem   | TypeScript ~6                          |
| Estilos     | Chakra UI (sem Tailwind)               |
| Ícones      | `@iconify/react`                       |
| Testes      | Jest + `@ttoss/config`                 |
| Linting     | ESLint 9 + Prettier                    |
| CI          | GitHub Actions (typecheck, lint, test) |
| Gerenciador | pnpm                                   |
| Node        | ≥ 24                                   |

---

## Arquitetura

```
src/
├── app/
│   ├── (default)/         # Homepage e páginas informacionais (com Header/Footer)
│   ├── (features)/        # Páginas de features (layout sem rodapé editorial)
│   │   └── mapas/         # Mapa interativo /mapas
│   ├── (internal)/        # Páginas internas
│   └── (legal)/           # Termos, cookies, acessibilidade
├── components/
│   ├── map/               # CategoryMenu, LegendPanel
│   ├── site/              # Header, Footer
│   ├── layouts/           # DefaultLayout, FeaturesLayout, LegalLayout
│   ├── ui/                # Primitivos Chakra (Provider, tokens)
│   └── decorative-hero-map/
├── config/
│   ├── navigation.ts      # mainNav, footerNavGroups, legalNav
│   ├── site.ts            # BRAND_NAME, constantes de motion
│   ├── theme.ts           # Tokens Chakra customizados
│   └── mapConfig.ts
├── data-source-static/    # Leitura do snapshot JSON (readStaticMapsData)
├── data-gateway/          # Transformers + schema tipado (MapsDataContract)
└── gateway.ts             # Instância singleton do gateway
```

A camada `data-source-static` lê o `maps-data.json` pré-computado. O `data-gateway` transforma o dado bruto para o contrato `MapsDataContract`, garantindo separação entre fonte de dados e domínio da aplicação.

---

## Rotas

| Rota                  | Descrição                                                        |
| --------------------- | ---------------------------------------------------------------- |
| `/`                   | Homepage editorial (Hero, temas, como funciona, fontes de dados) |
| `/mapas`              | Mapa interativo de envelhecimento por distrito                   |
| `/sobre`              | Sobre o projeto                                                  |
| `/oportunidades`      | Oportunidades de colaboração                                     |
| `/contato`            | Contato                                                          |
| `/termos`, `/cookies` | Páginas legais                                                   |

---

## Dados

Os dados são pré-computados offline a partir de microdados do Censo e do SEADE, salvos em `src/data-source-static/data/maps-data.json`.

**Schema canônico (`MapsDataContract`):**

```ts
type Category = 'cumulative-total' | 'cumulative-65plus' | '5year-65plus';
type Group = '65' | '70' | '75' | '65-69' | '70-74';

type MapDataRow = {
  geometryId: number;
  value: number;
  name?: string; // nome do distrito (tooltip)
  count?: number; // numerador da taxa
  totalCount?: number; // denominador da taxa
};

type MapsDataContract = {
  year: number;
  thresholds: Record<Category, Partial<Record<Group, number[]>>>;
  mapData: Record<Category, Partial<Record<Group, MapDataRow[]>>>;
};
```

---

## Desenvolvimento

```bash
# instalar dependências
pnpm install

# servidor de desenvolvimento
pnpm dev

# build de produção
pnpm build

# checar tipos
pnpm typecheck

# lint (com auto-fix)
pnpm eslint --fix

# testes
pnpm test
```

> **Pré-requisito:** Node ≥ 24 e pnpm.

### Convenções

- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/) com `commitlint`.
- Hooks via `husky` + `lint-staged` rodam typecheck e lint no staged diff antes de cada commit.
- Código em inglês; conteúdo da interface em pt-BR.
- Arrow functions; sem classes. Parâmetros como objeto quando > 1 argumento.

---

## Qualidade

O CI (`/.github/workflows/pr.yml`) executa em todo pull request:

1. `pnpm typecheck` — zero erros TypeScript
2. `pnpm lint` — zero warnings ESLint
3. `pnpm test` — cobertura mínima de 10 % (branches, functions, lines, statements)

Coverage nunca pode diminuir — o threshold em `tests/unit/jest.config.ts` é atualizado a cada mudança de código.

---

## Roadmap

O corte vertical mínimo **Ageing Maps V0** inclui as seguintes funcionalidades ainda não implementadas:

| Funcionalidade                             | Status                          |
| ------------------------------------------ | ------------------------------- |
| Tooltip com dados do distrito (hover)      | 🔄 Em revisão (PR #11)          |
| Internacionalização pt-BR / en-US          | 🔄 Em revisão (PR #5, Issue #4) |
| Camada de pontos UBS (oferta de serviços)  | ⏳ Planejado                    |
| Painel lateral de detalhes do território   | ⏳ Planejado                    |
| Comparação A vs B no painel                | ⏳ Planejado                    |
| URL permalink com estado (`?ind=&ubs=&t=`) | ⏳ Planejado                    |
| Busca de território por nome               | ⏳ Planejado                    |
| Indicador GAP Prioritário (composto)       | ⏳ Planejado                    |
| Indicador proxy de vulnerabilidade         | ⏳ Planejado                    |
| Indicador % pop 60+                        | ⏳ Planejado                    |
| Página `/metodologia`                      | ⏳ Planejado                    |

---

## Licença

Repositório privado — Delbem Research and Innovation / FAPESP. Todos os direitos reservados.
