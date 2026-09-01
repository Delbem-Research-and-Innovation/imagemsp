import type { GeovisWorkspaceConfig } from '@ttoss/geovis-workspace';

import { ICONS } from '@/components/map/lib/icons';
import type { Category, Group } from '@/components/map/lib/indicators';

/** Menu ids used by the GeovisWorkspace left sidebar and selection record. */
export const CATEGORY_MENU_ID = 'category';
export const GROUP_MENU_ID = 'group';

const CATEGORY_OPTIONS: { value: Category; label: string; icon: string }[] = [
  {
    value: 'cumulative-total',
    label: 'taxa cumulativa (% do total)',
    // A slice of the whole population.
    icon: ICONS.chartPieSlice,
  },
  {
    value: 'cumulative-65plus',
    label: 'proporção cumulativa (% da pop 65+)',
    // A proportion measured inside a subset, not the whole.
    icon: ICONS.chartDonut,
  },
  {
    value: '5year-65plus',
    label: 'faixa (% da pop 65+)',
    // A closed band rather than a cumulative total.
    icon: ICONS.chartBar,
  },
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

/**
 * Icon per age group. The distinction that matters is cumulative vs closed
 * band: `65`/`70`/`75` mean "X anos ou mais" (open-ended, rendered as `65+`
 * in the tooltip), while `65-69`/`70-74` are bounded on both sides.
 */
const GROUP_ICONS: Record<Group, string> = {
  '65': ICONS.plusCircle,
  '70': ICONS.plusCircle,
  '75': ICONS.plusCircle,
  '65-69': ICONS.arrowsInLineHorizontal,
  '70-74': ICONS.arrowsInLineHorizontal,
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

export const MAP_DESCRIPTIONS: Record<
  Category,
  Partial<Record<Group, string>>
> = {
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

/** Resolves the default age-group for a category (its first option). */
export const getDefaultGroup = (category: Category): Group => {
  return GROUP_OPTIONS[category][0].value;
};

/**
 * Builds the GeovisWorkspace config (left sidebar sections) for the current
 * selection. The `group` variations depend on `category`, so the config is
 * rebuilt whenever the selection changes (cascading behaviour). The legend and
 * data sources live on the map itself, configured via the geovis spec (see
 * `buildSpec` in `MapsView.tsx`), so there is no right sidebar.
 *
 * Each section wraps its options in a single variation group: the cascade is
 * driven by React state in `MapsView`, not by the sidebar own group
 * navigation, so one group per section preserves the previous flat-menu
 * behaviour.
 *
 * @param category - The selected demographic category.
 * @param group - The selected age group.
 * @returns A GeovisWorkspaceConfig driving the left sidebar.
 */
export const buildWorkspaceConfig = (
  category: Category,
  group: Group
): GeovisWorkspaceConfig => {
  return {
    // The page owns the framing (full-bleed map filling the viewport), so drop
    // the workspace own card border and radius.
    appearance: 'bare',
    // The right sidebar is never configured here, but that alone does not
    // drop it: `hasRightSidebar` is derived from slot CONTENT, not from
    // `config.rightSidebar`. The `metadata` slot auto-fills from
    // `spec.sources` (always non-empty for us) and `inspector` fills on any
    // map click, so the open-sidebar button would show regardless. Declaring
    // the slots hidden is the only way out — hidden always wins over content.
    slots: {
      legend: { hidden: true },
      warnings: { hidden: true },
      inspector: { hidden: true },
      metadata: { hidden: true },
    },
    leftSidebar: {
      initialState: 'open',
      sections: [
        {
          id: CATEGORY_MENU_ID,
          header: { title: 'Indicador', icon: ICONS.gauge },
          body: {
            kind: 'variations',
            // `menuId` is the key this section writes into `variables`, so it
            // must stay in sync with the selection record in `MapsView`.
            menuId: CATEGORY_MENU_ID,
            groups: [
              {
                id: CATEGORY_MENU_ID,
                label: 'Indicador',
                variations: CATEGORY_OPTIONS,
              },
            ],
            defaultValue: category,
          },
        },
        {
          id: GROUP_MENU_ID,
          header: { title: 'Faixa etária', icon: ICONS.usersThree },
          body: {
            kind: 'variations',
            menuId: GROUP_MENU_ID,
            groups: [
              {
                id: GROUP_MENU_ID,
                label: 'Faixa etária',
                variations: GROUP_OPTIONS[category].map((option) => {
                  return { ...option, icon: GROUP_ICONS[option.value] };
                }),
              },
            ],
            defaultValue: group,
          },
        },
      ],
    },
  };
};
