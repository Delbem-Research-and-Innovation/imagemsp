import { Box } from '@chakra-ui/react';
import type * as React from 'react';

type Props = {
  /**
   * Value of the heading `id` that labels this section.
   * Wired to `aria-labelledby` so screen readers announce the section by name.
   */
  labelledBy: string;
  /**
   * DOM id for the section element. Use when the section is a named
   * fragment-link target (e.g. `href="#oportunidades-atuais"`).
   */
  id?: string;
  /**
   * Background token. Pass `"background.inverse"` for dark inverted sections.
   * Omit to inherit the page canvas (`surface.base` / `paper.200`).
   */
  bg?: string;
  children: React.ReactNode;
};

/**
 * Standard page-section wrapper — consistent vertical rhythm, bottom divider,
 * and accessible ARIA landmark identity for all public-facing content sections.
 *
 * Vertical padding: `clamp(4rem, calc(3rem + 3vw), 7rem)` — fluid across
 * viewports without media-query breakpoints.
 * Bottom border: `border.subtle` — uniform section separator across the page.
 *
 * Server Component — no hooks or client state.
 *
 * @example
 * // Standard light section
 * <Section labelledBy="what-is-heading">
 *   <Container>...</Container>
 * </Section>
 *
 * @example
 * // Dark inverse section
 * <Section labelledBy="audience-heading" bg="background.inverse">
 *   <Container>...</Container>
 * </Section>
 *
 * @example
 * // Section with a fragment-link id
 * <Section id="oportunidades-atuais" labelledBy="oportunidades-list-heading">
 *   <Container>...</Container>
 * </Section>
 */
const Section = ({ labelledBy, id, bg, children }: Props) => {
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={labelledBy}
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      bg={bg}
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      {children}
    </Box>
  );
};

export default Section;
