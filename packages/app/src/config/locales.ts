export const LOCALES = ['pt-BR', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_CODES: Record<Locale, string> = {
  'pt-BR': 'PT',
  en: 'EN',
};

export const LOCALE_SWITCH_LABELS: Record<Locale, string> = {
  en: 'Switch to English',
  'pt-BR': 'Mudar para português',
};

/** Returns true if `v` is a supported locale string. */
export const isLocale = (v: unknown): v is Locale =>
  LOCALES.includes(v as Locale);
