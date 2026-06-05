import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { EXPO_OUT } from '../../config/site';

/** Visual variant of the call-to-action link. */
export type CtaVariant = 'solid' | 'outline' | 'ghost' | 'outline-inverse';

type Props = {
  /** Destination passed directly to `next/link`. */
  href: string;
  children: React.ReactNode;
  /**
   * Visual variant.
   *
   * - `solid` — filled brand button; default; use on light backgrounds.
   * - `outline` — border only; use on light backgrounds.
   * - `ghost` — text-only link; tertiary action.
   * - `outline-inverse` — border only; use on `background.inverse` (dark) surfaces.
   *
   * @default 'solid'
   */
  variant?: CtaVariant;
};

const getBg = (v: CtaVariant) => {
  if (v === 'solid') return 'brand.solid';
  return undefined;
};

const getColor = (v: CtaVariant) => {
  if (v === 'solid') return 'brand.contrast';
  if (v === 'ghost') return 'brand.fg';
  if (v === 'outline-inverse') return 'text.onDark';
  return 'text.primary';
};

const getBorderColor = (v: CtaVariant) => {
  if (v === 'outline') return 'border.default';
  if (v === 'outline-inverse') return 'text.onDark';
  return undefined;
};

const getHover = (v: CtaVariant) => {
  if (v === 'solid')
    return { bg: 'brand.hover', transform: 'translateY(-1px)' };
  if (v === 'outline')
    return {
      bg: 'surface.muted',
      borderColor: 'border.strong',
      transform: 'translateY(-1px)',
    };
  /*
   * Raw rgba — no token maps to semi-transparent white; background.inverse context only.
   */
  if (v === 'outline-inverse')
    return { bg: 'rgba(255, 255, 255, 0.08)', transform: 'translateY(-1px)' };
  return { color: 'brand.solid', textDecoration: 'underline' };
};

/**
 * Pill-shaped call-to-action link. Wraps a `next/link` with the design-system
 * motion primitive and four colour variants. Server Component — no hooks.
 *
 * @example
 * <CtaLink href="/mapas">Explorar mapa</CtaLink>
 * @example
 * <CtaLink href="/sobre" variant="outline">Saiba mais</CtaLink>
 * @example
 * <CtaLink href="/metodologia" variant="ghost">Ver metodologia</CtaLink>
 * @example
 * // Use on background.inverse dark sections
 * <CtaLink href="/contato" variant="outline-inverse">Entre em contato</CtaLink>
 */
const CtaLink = ({ href, children, variant = 'solid' }: Props) => {
  const isGhost = variant === 'ghost';
  const hasBorder = variant === 'outline' || variant === 'outline-inverse';

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
