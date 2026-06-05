import { Box, Link, Stack, Text } from '@chakra-ui/react';

import SectionLayout from '../../../../components/ui/SectionLayout';

type OfficialLink = {
  id: string;
  label: string;
  href: string;
  description: string;
};

const OFFICIAL_LINKS: OfficialLink[] = [
  {
    id: 'fapesp-oportunidades',
    label: 'FAPESP — Oportunidades de Bolsas',
    href: 'https://fapesp.br/oportunidades',
    description: 'Portal oficial de bolsas e oportunidades da FAPESP.',
  },
  {
    id: 'fapesp-bolsas',
    label: 'FAPESP — Bolsas no País',
    href: 'https://fapesp.br/bolsas/nopais',
    description: 'Modalidades de bolsas para pesquisa no país.',
  },
  {
    id: 'sage',
    label: 'SAGe — Sistema de Apoio à Gestão',
    href: 'https://sage.fapesp.br',
    description:
      'Sistema da FAPESP para submissão e acompanhamento de propostas.',
  },
];

/**
 * Official links and disclaimers section — prevents confusion between
 * IMAGEM:SP publications, FAPESP processes, and USP institutional channels.
 *
 * When an official external notice exists for an opportunity, that notice
 * is linked from the opportunity card and always prevails over this page.
 *
 * @example
 * <OfficialLinks />
 */
const OfficialLinks = () => {
  return (
    <SectionLayout
      headingId="official-links-heading"
      eyebrow="Links e avisos oficiais"
      heading="Canais e processos institucionais."
      bg="background.inverse"
      variant="inverse"
      gap={10}
      contentMaxW="64ch"
    >
      <Stack gap={3}>
        <Text textStyle="body" color="text.onDarkBody">
          Cada oportunidade indica se é uma publicação do IMAGEM:SP, um processo
          vinculado à FAPESP, à USP ou a outro tipo de colaboração. Quando
          existir um edital externo oficial, ele será vinculado à oportunidade e
          suas regras prevalecem sobre as informações desta página.
        </Text>
        <Text textStyle="body" color="text.onDarkBody">
          Não publique nem compartilhe regras de bolsas, valores, datas ou
          critérios de elegibilidade sem confirmação oficial.
        </Text>
      </Stack>

      <Stack gap={3}>
        {OFFICIAL_LINKS.map((link) => {
          return (
            <Box
              key={link.id}
              p={{ base: 4, md: 5 }}
              bg="surface.inverseCard"
              border="1px solid"
              borderColor="border.inverseSubtle"
              borderRadius="card"
            >
              <Stack gap={1}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="text.onDark"
                  fontWeight="medium"
                  textDecoration="underline"
                  _hover={{ color: 'text.onDarkMuted' }}
                >
                  {link.label}
                </Link>
                <Text textStyle="caption" color="text.onDarkBody">
                  {link.description}
                </Text>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </SectionLayout>
  );
};

export default OfficialLinks;
