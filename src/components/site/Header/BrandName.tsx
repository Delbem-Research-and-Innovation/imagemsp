import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import { EXPO_OUT } from '../../../config/site';

/**
 * Site name as a text link, linked to the home page.
 * Use when the brand name is needed in body copy, footers, or inline contexts.
 *
 * @example
 * <BrandName />
 */
const BrandName = () => {
  return (
    <Link
      asChild
      fontWeight="800"
      fontSize="1.05rem"
      letterSpacing="-0.025em"
      lineHeight="1"
      textDecoration="none"
      color="text.primary"
      _hover={{ color: 'olive.700' }}
      transition={`color 0.3s ${EXPO_OUT}`}
      whiteSpace="nowrap"
    >
      <NextLink href="/">IMAGEM:SP</NextLink>
    </Link>
  );
};

export default BrandName;
