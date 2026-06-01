import { Box, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';
import MapPreviewCard from './MapPreviewCard';

/**
 * "Product preview" section — demonstrates the IMAGEMSP interface with
 * a static/lightweight mock that looks and reads like the real product.
 *
 * No live GIS engine is loaded. The MapPreviewCard component renders
 * a static representation with source metadata intact.
 *
 * @example
 * <ProductPreviewSection />
 */
const ProductPreviewSection = () => {
  return (
    <Box
      as="section"
      aria-labelledby="preview-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      bg="olive.900"
      borderBottom="1px solid"
      borderColor="olive.800"
    >
      <Container>
        <Stack gap={12}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.400">
              Prévia do produto
            </Text>
            <Text
              as="h2"
              id="preview-heading"
              textStyle="h2"
              color="text.onContrast"
            >
              Território, indicador, fonte.
            </Text>
            <Text textStyle="body" color="text.onFooterMuted" maxW="48ch">
              Cada consulta mostra indicador, interpretação, fonte, unidade
              territorial e limitações — sem necessidade de conhecimento técnico
              em GIS.
            </Text>
          </Stack>

          <Box maxW="900px">
            <MapPreviewCard />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductPreviewSection;
