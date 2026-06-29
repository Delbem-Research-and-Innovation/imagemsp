import type { GeovisWorkspaceConfig } from '@ttoss/geovis-workspace';

import type { Category, Group } from '@/components/map/lib/indicators';
import { LEGEND_COLORS, NYC_THRESHOLDS } from '@/components/map/lib/mapConfig';

/** Menu ids used by the GeovisWorkspace left sidebar and selection record. */
export const CATEGORY_MENU_ID = 'category';
export const GROUP_MENU_ID = 'group';

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'cumulative-total', label: 'taxa cumulativa (% do total)' },
  { value: 'cumulative-65plus', label: 'proporção cumulativa (% da pop 65+)' },
  { value: '5year-65plus', label: 'faixa (% da pop 65+)' },
];

/** Age-group options available for each category (cascading menu). */
export const GROUP_OPTIONS: Record<
  Category,
  { value: Group; label: string }[]
> = {
  'cumulative-total': [
    { value: '65', label: '65 anos ou mais' },
    { value: '70', label: '70 anos ou mais' },
    { value: '75', label: '75 anos ou mais' },
  ],
  'cumulative-65plus': [
    { value: '70', label: '70 anos ou mais' },
    { value: '75', label: '75 anos ou mais' },
  ],
  '5year-65plus': [
    { value: '65-69', label: '65 a 69 anos' },
    { value: '70-74', label: '70 a 74 anos' },
    { value: '75', label: '75 anos ou mais' },
  ],
};

export const MAP_TITLES: Record<Category, Partial<Record<Group, string>>> = {
  'cumulative-total': {
    '65': 'POPULAÇÃO 65+ COMO % DA POPULAÇÃO TOTAL',
    '70': 'POPULAÇÃO 70+ COMO % DA POPULAÇÃO TOTAL',
    '75': 'POPULAÇÃO 75+ COMO % DA POPULAÇÃO TOTAL',
  },
  'cumulative-65plus': {
    '70': '70+ COMO % DA POPULAÇÃO 65+',
    '75': '75+ COMO % DA POPULAÇÃO 65+',
  },
  '5year-65plus': {
    '65-69': '65–69 ANOS COMO % DA POPULAÇÃO 65+',
    '70-74': '70–74 ANOS COMO % DA POPULAÇÃO 65+',
    '75': '75+ COMO % DA POPULAÇÃO 65+',
  },
};

const MAP_DESCRIPTIONS: Record<Category, Partial<Record<Group, string>>> = {
  'cumulative-total': {
    '65': 'Proporção da população total do distrito com 65 anos ou mais.',
    '70': 'Proporção da população total do distrito com 70 anos ou mais.',
    '75': 'Proporção da população total do distrito com 75 anos ou mais.',
  },
  'cumulative-65plus': {
    '70': 'Proporção da população 65+ que tem 70 anos ou mais.',
    '75': 'Proporção da população 65+ que tem 75 anos ou mais.',
  },
  '5year-65plus': {
    '65-69': 'Parcela da população 65+ na faixa de 65 a 69 anos.',
    '70-74': 'Parcela da população 65+ na faixa de 70 a 74 anos.',
    '75': 'Parcela da população 65+ com 75 anos ou mais.',
  },
};

const formatPercent = (value: number) => {
  const pct = value * 100;
  return `${pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)}%`;
};

/** Builds one legend item (swatch color + range label) per choropleth class. */
const buildLegendItems = () => {
  const breaks = [0, ...NYC_THRESHOLDS, 1];
  return breaks.slice(0, -1).map((lower, i) => {
    return {
      color: LEGEND_COLORS[i],
      label: `${formatPercent(lower)} – ${formatPercent(breaks[i + 1])}`,
    };
  });
};

/** Resolves the default age-group for a category (its first option). */
export const getDefaultGroup = (category: Category): Group => {
  return GROUP_OPTIONS[category][0].value;
};

/**
 * Builds the GeovisWorkspace config (left menus + right legend panel) for the
 * current selection. The `group` menu items depend on `category`, so the config
 * is rebuilt whenever the selection changes (cascading behaviour).
 *
 * @param category - The selected demographic category.
 * @param group - The selected age group.
 * @returns A complete GeovisWorkspaceConfig driving both sidebars.
 */
export const buildWorkspaceConfig = (
  category: Category,
  group: Group
): GeovisWorkspaceConfig => {
  const title =
    (MAP_TITLES[category] as Partial<Record<string, string>>)[group] ?? '';
  const description =
    (MAP_DESCRIPTIONS[category] as Partial<Record<string, string>>)[group] ??
    '';

  return {
    leftSidebar: {
      menus: [
        {
          id: CATEGORY_MENU_ID,
          title: 'Indicador',
          items: CATEGORY_OPTIONS,
          defaultValue: category,
        },
        {
          id: GROUP_MENU_ID,
          title: 'Faixa etária',
          items: GROUP_OPTIONS[category],
          defaultValue: group,
        },
      ],
    },
    rightSidebar: {
      title,
      legendWithColor: {
        description,
        legend: {
          items: buildLegendItems(),
        },
        sources: {
          title: 'Fonte dos dados:',
          items: [
            {
              label:
                'Dados agregados por distrito municipal a partir das projeções populacionais por sexo e idade do SEADE para o ano de 2025.',
              href: 'https://repositorio.seade.gov.br/dataset/populacao-residente-municipio-de-sao-paulo-evolucao',
            },
            {
              label: 'Geometria: Distritos Municipais de São Paulo.',
            },
          ],
        },
      },
    },
  };
};
