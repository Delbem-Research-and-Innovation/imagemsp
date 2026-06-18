import { Box, Flex, Grid, HStack, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

import { footerNavGroups, legalNav } from '../../../config/navigation';
import { EXPO_OUT } from '../../../config/site';
import Container from '../../ui/Container';

/**
 * SiteFooter
 * Signals institutional depth: brand + mission statement, three grouped nav columns,
 * and a legal baseline. Dark ink text on light sand gives clear readability.
 *
 * Layout:
 * - Top strip: brand wordmark + mission statement + primary CTA
 * - Baseline: legal links + copyright
 *
 * @example
 * <Footer />
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box as="footer" bg="surface.footer">
      <Container>
        {/* Top: brand + mission + CTA */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'flex-end' }}
          justify="space-between"
          gap={8}
          pt="clamp(3rem, calc(2.25rem + 3vw), 6rem)"
          pb={8}
          borderBottom="1px solid"
          borderColor="border.subtle"
        >
          <Stack gap={4} maxW={{ base: '100%', md: '52ch' }}>
            {/* Brand wordmark */}
            <Link
              asChild
              display="inline-flex"
              textDecoration="none"
              _hover={{ opacity: 0.75 }}
              transition={`opacity 0.3s ${EXPO_OUT}`}
            >
              <NextLink href="/">
                <Image
                  src="/imagem-logo-completo-rgb.svg"
                  alt="IMAGEM:SP"
                  width={385}
                  height={163}
                  style={{ height: '96px', width: 'auto' }}
                />
              </NextLink>
            </Link>

            {/* Mission statement */}
            <Text textStyle="body-sm" color="text.onFooterMuted" maxW="48ch">
              Atlas digital de inteligência territorial sobre o envelhecimento
              em São Paulo. Dados públicos para apoiar compreensão, pesquisa,
              planejamento e políticas baseadas em evidências.
            </Text>
          </Stack>

          {/* Primary CTA */}
          <Link
            asChild
            display="inline-flex"
            alignItems="center"
            alignSelf={{ base: 'flex-start', md: 'auto' }}
            flexShrink={0}
            px={6}
            py="13px"
            borderRadius="pill"
            bg="brand.solid"
            color="brand.contrast"
            fontSize="0.8125rem"
            fontWeight="600"
            letterSpacing="0.04em"
            textTransform="uppercase"
            textDecoration="none"
            transition={`all 0.3s ${EXPO_OUT}`}
            _hover={{ bg: 'brand.hover', transform: 'translateY(-1px)' }}
          >
            <NextLink href="/mapas">Explorar o mapa</NextLink>
          </Link>
        </Flex>

        {/* Nav columns */}
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          gap="clamp(2rem, calc(1.5rem + 2vw), 4rem)"
          py="clamp(2.5rem, calc(2rem + 2vw), 5rem)"
          borderBottom="1px solid"
          borderColor="border.subtle"
        >
          {footerNavGroups.map((group) => {
            return (
              <Stack key={group.id} gap={4}>
                <Text textStyle="eyebrow" color="text.secondary">
                  {group.label}
                </Text>
                {group.entries.map((entry) => {
                  return (
                    <Link
                      key={entry.id}
                      asChild
                      textStyle="body-sm"
                      color="text.onFooterMuted"
                      textDecoration="none"
                      transition={`color 0.3s ${EXPO_OUT}`}
                      _hover={{ color: 'text.onFooter' }}
                    >
                      <NextLink href={entry.href}>{entry.label}</NextLink>
                    </Link>
                  );
                })}
              </Stack>
            );
          })}
        </Grid>

        {/* Baseline: legal links + copyright */}
        <Flex
          direction={{ base: 'column-reverse', sm: 'row' }}
          align={{ base: 'flex-start', sm: 'center' }}
          justify="space-between"
          gap={4}
          py={6}
          wrap="wrap"
        >
          <HStack gap={6} wrap="wrap">
            {legalNav.map((entry) => {
              return (
                <Link
                  key={entry.id}
                  asChild
                  textStyle="caption"
                  color="text.onFooterMuted"
                  textDecoration="none"
                  transition={`color 0.3s ${EXPO_OUT}`}
                  _hover={{ color: 'text.onFooter' }}
                >
                  <NextLink href={entry.href}>{entry.label}</NextLink>
                </Link>
              );
            })}
          </HStack>
          <Text textStyle="caption" color="text.onFooterMuted">
            © {year} IMAGEM:SP. Dados públicos, uso livre com atribuição.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
