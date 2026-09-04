import { Box, Text, VStack } from '@chakra-ui/react';

import BrandMark from './BrandMark';

/**
 * Props for {@link LoadingIndicator}.
 */
type Props = {
  /**
   * Loading message. Drives both the visible caption (rendered with a trailing
   * ellipsis) and the `role="status"` region's accessible name, keeping the two
   * in sync.
   *
   * @default 'Carregando'
   */
  label?: string;
};

/**
 * Full-bleed loading indicator: the IMAGEM:SP brand mark with a "breathing"
 * pulse (scale + opacity, via the theme's `pulseScale` keyframe) above a muted
 * caption.
 *
 * Fills its nearest positioned ancestor, so the container it is dropped into
 * needs `position="relative"` and a height of its own. Exposed to assistive
 * tech as a `role="status"` region whose accessible name is
 * {@link Props.label}; the mark itself is `aria-hidden`, so the label is not
 * announced twice.
 *
 * @example
 * // While the map runtime has not mounted yet:
 * {mounted ? <GeovisWorkspace ... /> : <LoadingIndicator label="Carregando mapa" />}
 */
const LoadingIndicator = ({ label = 'Carregando' }: Props) => {
  return (
    <VStack
      role="status"
      aria-label={label}
      position="absolute"
      inset={0}
      justify="center"
      gap={4}
    >
      <Box
        color="azure.600"
        animationName="pulseScale"
        animationDuration="1.4s"
        animationTimingFunction="ease-in-out"
        animationIterationCount="infinite"
      >
        <BrandMark size="clamp(3.25rem, 5.5vw, 5rem)" />
      </Box>
      <Text color="text.muted" fontSize="sm">
        {label}…
      </Text>
    </VStack>
  );
};

export default LoadingIndicator;
