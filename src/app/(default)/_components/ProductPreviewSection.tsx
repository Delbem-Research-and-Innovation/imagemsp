import { Box } from '@chakra-ui/react';

import SectionLayout from '../../../components/ui/SectionLayout';
import MapPreviewCard from './MapPreviewCard';

/**
 * "Product preview" section — demonstrates the IMAGEM:SP interface with
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
    <SectionLayout
      headingId="preview-heading"
      eyebrow="Prévia do produto"
      heading="Território, indicador, fonte."
      body="Cada consulta mostra indicador, interpretação, fonte, unidade territorial e limitações — sem necessidade de conhecimento técnico em GIS."
      bodyMaxW="48ch"
    >
      <Box maxW="900px">
        <MapPreviewCard />
      </Box>
    </SectionLayout>
  );
};

export default ProductPreviewSection;
