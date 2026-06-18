import { Link } from '@chakra-ui/react';
import Image from 'next/image';
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
      display="inline-flex"
      textDecoration="none"
      _hover={{ opacity: 0.8 }}
      transition={`opacity 0.3s ${EXPO_OUT}`}
    >
      <NextLink href="/">
        <Image
          src="/imagem-logo-completo-rgb.svg"
          alt="IMAGEM:SP"
          width={385}
          height={163}
          style={{ height: '48px', width: 'auto' }}
          priority
        />
      </NextLink>
    </Link>
  );
};

export default BrandName;
