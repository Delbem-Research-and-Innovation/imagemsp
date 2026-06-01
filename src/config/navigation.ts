/** Shape of a single navigation entry. */
export type NavEntry = {
  id: string;
  href: string;
  label: string;
};

/** A labelled group of footer navigation entries. */
export type FooterNavGroup = {
  id: string;
  label: string;
  entries: NavEntry[];
};

/**
 * Primary navigation rendered in the Header.
 * Focused on the three main entry points; the full architecture lives in `footerNavGroups`.
 *
 * @example
 * mainNav.map((entry) => <NavLink key={entry.id} href={entry.href} label={entry.label} />)
 */
export const mainNav: NavEntry[] = [
  { id: 'mapa', href: '/mapas', label: 'Mapa' },
  { id: 'sobre', href: '/sobre', label: 'Sobre' },
  { id: 'contato', href: '/contato', label: 'Contato' },
];

/**
 * Footer navigation organised by section.
 * Reflects the full product architecture from the BRIEFING — some routes are planned
 * and will resolve as content is built.
 *
 * @example
 * footerNavGroups.map((group) => <FooterColumn key={group.id} group={group} />)
 */
export const footerNavGroups: FooterNavGroup[] = [
  {
    id: 'explorar',
    label: 'Explorar',
    entries: [
      { id: 'mapa', href: '/mapas', label: 'Mapa' },
      { id: 'como-usar', href: '/como-usar', label: 'Como usar' },
      { id: 'temas', href: '/temas', label: 'Temas' },
    ],
  },
  {
    id: 'dados',
    label: 'Dados',
    entries: [
      { id: 'indicadores', href: '/dados', label: 'Indicadores' },
      { id: 'metodologia', href: '/metodologia', label: 'Metodologia' },
      { id: 'relatorios', href: '/relatorios', label: 'Relatórios' },
    ],
  },
  {
    id: 'projeto',
    label: 'Projeto',
    entries: [
      { id: 'sobre', href: '/sobre', label: 'Sobre' },
      { id: 'participacao', href: '/participacao', label: 'Participação' },
      { id: 'contato', href: '/contato', label: 'Contato' },
    ],
  },
];

/**
 * Legal navigation rendered in the footer baseline row.
 *
 * @example
 * legalNav.map((entry) => <NavLink key={entry.id} href={entry.href} label={entry.label} />)
 */
export const legalNav: NavEntry[] = [
  { id: 'termos', href: '/termos', label: 'Termos de Uso' },
  { id: 'cookies', href: '/cookies', label: 'Cookies' },
  { id: 'acessibilidade', href: '/acessibilidade', label: 'Acessibilidade' },
];
