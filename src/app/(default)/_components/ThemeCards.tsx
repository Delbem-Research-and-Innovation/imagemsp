import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';

type Theme = {
  title: string;
  description: string;
};

const THEMES: Theme[] = [
  {
    title: 'População e perfil etário',
    description: 'Distribuição etária, concentração e projeções territoriais.',
  },
  {
    title: 'Saúde e cuidado',
    description:
      'Cobertura de serviços de saúde, UBS, especialidades e cuidado domiciliar.',
  },
  {
    title: 'Mobilidade e acesso',
    description:
      'Transporte público, calçadas, acessibilidade e proximidade de serviços.',
  },
  {
    title: 'Moradia e infraestrutura',
    description:
      'Condições habitacionais, saneamento e adequação para envelhecimento.',
  },
  {
    title: 'Espaços públicos e ambiente',
    description: 'Praças, parques, arborização e qualidade ambiental urbana.',
  },
  {
    title: 'Segurança e proteção',
    description: 'Vulnerabilidade, violência, redes de proteção e emergências.',
  },
  {
    title: 'Participação social',
    description:
      'Centros de convivência, atividades, vínculos comunitários e culturais.',
  },
  {
    title: 'Comunicação e inclusão digital',
    description: 'Acesso à internet, letramento digital e comunicação pública.',
  },
];

/**
 * Themes section — eight thematic entry points for the atlas.
 *
 * Organized by WHO age-friendly city domains, not by dataset or layer names.
 * Each card is a conceptual door into the map, not a list of variables.
 *
 * @example
 * <ThemeCards />
 */
const ThemeCards = () => {
  return (
    <Box
      as="section"
      aria-labelledby="themes-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={10}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.600">
              Temas
            </Text>
            <Text
              as="h2"
              id="themes-heading"
              textStyle="h2"
              color="text.primary"
            >
              Oito dimensões do envelhecimento urbano.
            </Text>
            <Text textStyle="body" color="text.secondary" maxW="50ch">
              Organizados pelos domínios das cidades amigas das pessoas idosas,
              não pela estrutura técnica dos dados.
            </Text>
          </Stack>

          <Grid
            templateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={4}
          >
            {THEMES.map((theme) => {
              return (
                <Stack
                  key={theme.title}
                  gap={3}
                  p={5}
                  borderRadius="card"
                  border="1px solid"
                  borderColor="border.default"
                  bg="surface.base"
                  shadow="raised"
                  transition="border-color 0.2s ease, transform 0.2s ease"
                  _hover={{
                    borderColor: 'olive.300',
                    transform: 'translateY(-2px)',
                  }}
                >
                  {/* Color accent strip */}
                  <Box
                    w="32px"
                    h="4px"
                    borderRadius="pill"
                    bg="olive.700"
                    flexShrink={0}
                    aria-hidden="true"
                  />

                  <Stack gap={2}>
                    <Text
                      as="h3"
                      textStyle="body"
                      color="text.primary"
                      fontWeight="600"
                    >
                      {theme.title}
                    </Text>
                    <Text textStyle="body-sm" color="text.muted">
                      {theme.description}
                    </Text>
                  </Stack>
                </Stack>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default ThemeCards;
