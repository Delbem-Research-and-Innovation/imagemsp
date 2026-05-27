export type IndicatorId = 'pop-60plus' | 'vulnerabilidade' | 'gap-prioritario';

export const INDICATOR_IDS: IndicatorId[] = [
  'pop-60plus',
  'vulnerabilidade',
  'gap-prioritario',
];

export type Category = 'cumulative-total' | 'cumulative-65plus' | '5year-65plus';

export type Group = '65' | '70' | '75' | '65-69' | '70-74';
