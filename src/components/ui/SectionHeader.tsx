import { Stack, Text } from '@chakra-ui/react';

/** Colour variant for the section header block. */
type Variant = 'default' | 'inverse';

type Props = {
  /** Short all-caps label above the heading. */
  eyebrow?: string;
  /** Main section heading rendered as `<h2>`. */
  heading: string;
  /**
   * `id` placed on the heading element; used by the enclosing `<section
   * aria-labelledby>` to provide an accessible name.
   */
  headingId?: string;
  /**
   * Optional lead paragraph below the heading.
   * Use for sections that need a short disambiguation line.
   */
  body?: string;
  /**
   * `max-width` for the outer `<Stack>`.
   * Pass a value for standalone section headers (e.g. `"52ch"`, `"72ch"`).
   * Omit when the parent already constrains the width (Grid column, capped container).
   *
   * @default "72ch"
   */
  maxW?: string;
  /**
   * `max-width` for the body paragraph only.
   * Useful when the outer `maxW` is wider than ideal for prose.
   */
  bodyMaxW?: string;
  /**
   * Use `"inverse"` on `background.inverse` dark sections.
   * Switches all text tokens to their on-dark equivalents.
   *
   * @default "default"
   */
  variant?: Variant;
};

/**
 * Reusable eyebrow + heading + optional body block used at the top of content
 * sections throughout the site.
 *
 * Server Component — no hooks or client state.
 *
 * @example
 * // Standard light section
 * <SectionHeader
 *   eyebrow="Como funciona"
 *   heading="Do território à interpretação."
 *   headingId="how-heading"
 * />
 *
 * @example
 * // Dark inverse section
 * <SectionHeader
 *   eyebrow="Para quem é"
 *   heading="Uma plataforma com camadas para públicos diferentes."
 *   headingId="audience-heading"
 *   variant="inverse"
 * />
 *
 * @example
 * // With body paragraph and width overrides
 * <SectionHeader
 *   eyebrow="Temas"
 *   heading="Oito dimensões do envelhecimento urbano."
 *   headingId="themes-heading"
 *   body="Organizados pelos domínios das cidades amigas das pessoas idosas, não pela estrutura técnica dos dados."
 *   maxW="72ch"
 *   bodyMaxW="50ch"
 * />
 */
const SectionHeader = ({
  eyebrow,
  heading,
  headingId,
  body,
  maxW = '72ch',
  bodyMaxW,
  variant = 'default',
}: Props) => {
  const isInverse = variant === 'inverse';
  const eyebrowColor = isInverse ? 'text.onDarkMuted' : 'eyebrown.fg';
  const headingColor = isInverse ? 'text.onDark' : 'text.primary';
  const bodyColor = isInverse ? 'text.onDarkBody' : 'text.secondary';

  return (
    <Stack gap={3} maxW={maxW}>
      {eyebrow && (
        <Text textStyle="eyebrow" color={eyebrowColor}>
          {eyebrow}
        </Text>
      )}
      <Text as="h2" id={headingId} textStyle="h2" color={headingColor}>
        {heading}
      </Text>
      {body && (
        <Text textStyle="body" color={bodyColor} maxW={bodyMaxW}>
          {body}
        </Text>
      )}
    </Stack>
  );
};

export default SectionHeader;
