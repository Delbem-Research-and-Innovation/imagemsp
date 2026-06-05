import { Stack } from '@chakra-ui/react';
import type * as React from 'react';

import Container from './Container';
import Section from './Section';
import SectionHeader from './SectionHeader';

/** Colour variant forwarded to SectionHeader. */
type Variant = 'default' | 'inverse';

type Props = {
  /**
   * The `id` placed on the h2 heading. Drives both `aria-labelledby` on the
   * `<section>` element and the heading's own `id` — kept in sync automatically.
   */
  headingId: string;
  /** DOM id for the section element — for fragment-link anchors. */
  id?: string;
  /**
   * Background token. Pass `"background.inverse"` for dark inverted sections.
   * Omit to inherit the page canvas.
   */
  bg?: string;
  /** Short all-caps label above the heading. */
  eyebrow?: string;
  /** Main section h2 text. */
  heading: string;
  /** Optional lead paragraph below the heading. */
  body?: string;
  /** max-width for the SectionHeader outer Stack.
   *
   * @default "72ch"
   */
  headerMaxW?: string;
  /** max-width for the body paragraph only. */
  bodyMaxW?: string;
  /**
   * Colour variant forwarded to SectionHeader.
   * Pass `"inverse"` on dark sections — switches all text tokens to on-dark values.
   *
   * @default "default"
   */
  variant?: Variant;
  /**
   * Gap for the outer content Stack (header + children).
   *
   * @default 12
   */
  gap?: number;
  /**
   * max-width for the whole Container Stack.
   * Use for narrow text-only or single-column sections.
   * @example contentMaxW="64ch"
   */
  contentMaxW?: string;
  children: React.ReactNode;
};

/**
 * Standard section layout shell — `Section` → `Container` → `Stack` →
 * `SectionHeader` + `children`. Covers the repeated pattern used in all
 * content sections whose body stacks vertically below the heading.
 *
 * For sections whose layout places the heading inside a grid column
 * (WhySection, OriginSection, DataTrustSection), compose `Section` +
 * `Container` + `Grid` + `SectionHeader` directly.
 *
 * Server Component — no hooks or client state.
 *
 * @example
 * // Standard section
 * <SectionLayout
 *   headingId="themes-heading"
 *   eyebrow="Temas"
 *   heading="Oito dimensões do envelhecimento urbano."
 *   headerMaxW="72ch"
 *   gap={10}
 * >
 *   <Grid ...>{...}</Grid>
 * </SectionLayout>
 *
 * @example
 * // Dark inverse section with narrow content column
 * <SectionLayout
 *   headingId="official-links-heading"
 *   eyebrow="Links e avisos oficiais"
 *   heading="Canais e processos institucionais."
 *   bg="background.inverse"
 *   variant="inverse"
 *   gap={10}
 *   contentMaxW="64ch"
 * >
 *   {...}
 * </SectionLayout>
 */
const SectionLayout = ({
  headingId,
  id,
  bg,
  eyebrow,
  heading,
  body,
  headerMaxW,
  bodyMaxW,
  variant = 'default',
  gap = 12,
  contentMaxW,
  children,
}: Props) => {
  return (
    <Section labelledBy={headingId} id={id} bg={bg}>
      <Container>
        <Stack gap={gap} maxW={contentMaxW}>
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            headingId={headingId}
            body={body}
            maxW={headerMaxW}
            bodyMaxW={bodyMaxW}
            variant={variant}
          />
          {children}
        </Stack>
      </Container>
    </Section>
  );
};

export default SectionLayout;
