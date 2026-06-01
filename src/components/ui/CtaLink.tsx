import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { EXPO_OUT } from '../../config/site';

/** Visual variant of the call-to-action link. */
export type CtaVariant =
  | 'solid'
  | 'outline'
  | 'outline-dark'
  | 'solid-amber'
  | 'ghost';

type Props = {
  /** Destination passed directly to `next/link`. */
  href: string;
  children: React.ReactNode;
  /**
   * Visual variant.
   *
   * - `solid` — olive.700 fill; default; use on light backgrounds.
   * - `outline` — parchment border; use on light backgrounds.
   * - `outline-dark` — olive border + parchment text; use on dark (olive.900) backgrounds.
   * - `solid-amber` — amber.600 fill + inkBrown text; use on dark backgrounds.
   * - `ghost` — text-only link; tertiary action.
   *
   * @default 'solid'
   */
  variant?: CtaVariant;
};

const getBg = (v: CtaVariant) => {
  if (v === 'solid') return 'olive.700';
  if (v === 'solid-amber') return 'amber.100';
  return undefined;
};

const getColor = (v: CtaVariant) => {
  if (v === 'solid') return 'paper.50';
  if (v === 'solid-amber') return 'ink.950';
  if (v === 'outline-dark') return 'paper.300';
  if (v === 'ghost') return 'olive.400';
  return 'ink.950';
};

const getBorderColor = (v: CtaVariant) => {
  if (v === 'outline') return 'border.default';
  if (v === 'outline-dark') return 'olive.700';
  return undefined;
};

const getHover = (v: CtaVariant) => {
  if (v === 'solid') return { bg: 'olive.800', transform: 'translateY(-1px)' };
  if (v === 'outline')
    return {
      bg: 'paper.400',
      borderColor: 'ink.700',
      transform: 'translateY(-1px)',
    };
  if (v === 'outline-dark')
    return {
      borderColor: 'olive.400',
      color: 'paper.50',
      transform: 'translateY(-1px)',
    };
  if (v === 'solid-amber')
    return { bg: 'amber.200', transform: 'translateY(-1px)' };
  return { color: 'olive.300', textDecoration: 'underline' };
};

/**
 * Pill-shaped call-to-action link. Wraps a `next/link` with the design-system
 * motion primitive and four colour variants. Server Component — no hooks.
 *
 * @example
 * <CtaLink href="/mapas">Explorar mapa</CtaLink>
 * <CtaLink href="/sobre" variant="outline">Saiba mais</CtaLink>
 * <CtaLink href="/contato" variant="outline-dark">Entrar em contato</CtaLink>
 * <CtaLink href="/contato" variant="solid-amber">Colaborar</CtaLink>
 * <CtaLink href="/metodologia" variant="ghost">Ver metodologia</CtaLink>
 */
const CtaLink = ({ href, children, variant = 'solid' }: Props) => {
  const isGhost = variant === 'ghost';
  const hasBorder = variant === 'outline' || variant === 'outline-dark';

  return (
    <Link
      asChild
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      minH={isGhost ? '44px' : '52px'}
      px={isGhost ? 5 : 7}
      borderRadius={isGhost ? undefined : 'pill'}
      fontSize="0.875rem"
      fontWeight="500"
      letterSpacing="0.04em"
      textTransform="uppercase"
      textDecoration="none"
      transition={`all 0.3s ${EXPO_OUT}`}
      bg={getBg(variant)}
      color={getColor(variant)}
      border={hasBorder ? '1px solid' : undefined}
      borderColor={getBorderColor(variant)}
      _hover={getHover(variant)}
    >
      <NextLink href={href}>{children}</NextLink>
    </Link>
  );
};

export default CtaLink;
