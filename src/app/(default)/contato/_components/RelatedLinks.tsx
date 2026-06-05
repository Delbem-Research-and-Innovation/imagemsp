import { Box, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import Container from '../../../../components/ui/Container';

type RelatedLink = {
  id: string;
  href: string;
  label: string;
};

const LINKS: RelatedLink[] = [
  { id: 'sobre', href: '/sobre', label: 'Conhecer o projeto' },
  { id: 'equipe', href: '/sobre#equipe', label: 'Ver equipe' },
  { id: 'dados', href: '/dados', label: 'Consultar dados e indicadores' },
  {
    id: 'acessibilidade',
    href: '/acessibilidade',
    label: 'Ver recursos de acessibilidade',
  },
  { id: 'oportunidades', href: '/oportunidades', label: 'Ver oportunidades' },
];

/**
 * Contact page related links — directs users to self-serve pages before
 * sending a message.
 *
 * @example
 * <RelatedLinks />
 */
const RelatedLinks = () => {
  return (
    <Box
      as="section"
      aria-labelledby="related-links-heading"
      py="clamp(3rem, calc(2rem + 2vw), 5rem)"
    >
      <Container>
        <Stack gap={5} maxW="760px">
          <Text
            as="h2"
            id="related-links-heading"
            textStyle="h2"
            color="text.primary"
          >
            Antes de escrever, talvez uma destas páginas ajude:
          </Text>
          <Stack as="ul" gap={2} listStyleType="none" p={0} m={0}>
            {LINKS.map((link) => {
              return (
                <Box as="li" key={link.id}>
                  <Link
                    asChild
                    color="link.default"
                    textDecoration="underline"
                    _hover={{ color: 'link.hover' }}
                    textStyle="body"
                    display="inline-block"
                    py={1}
                  >
                    <NextLink href={link.href}>{link.label}</NextLink>
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default RelatedLinks;
