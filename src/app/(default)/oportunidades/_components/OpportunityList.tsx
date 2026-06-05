import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';
import CtaLink from '../../../../components/ui/CtaLink';
import Section from '../../../../components/ui/Section';
import { OPPORTUNITIES, type Opportunity } from '../_data/opportunities';

const CONTACT_EMAIL = 'contato-imagemsp@usp.br';

const applyMailto = (opp: Opportunity) => {
  const subject = encodeURIComponent(`[Candidatura] ${opp.title}`);
  const email = opp.contactEmail ?? CONTACT_EMAIL;
  return `mailto:${email}?subject=${subject}`;
};

const STATUS_LABELS: Record<Opportunity['status'], string> = {
  open: 'Aberta',
  upcoming: 'Em breve',
  rolling: 'Inscrições contínuas',
  closed: 'Encerrada',
  filled: 'Preenchida',
  'expression-of-interest': 'Manifestação de interesse',
};

const STATUS_COLORS: Record<
  Opportunity['status'],
  { bg: string; color: string }
> = {
  open: { bg: 'brand.subtle', color: 'brand.fg' },
  upcoming: { bg: 'state.warning.subtle', color: 'state.warning.fg' },
  rolling: { bg: 'brand.subtle', color: 'brand.fg' },
  closed: { bg: 'surface.muted', color: 'text.muted' },
  filled: { bg: 'surface.muted', color: 'text.muted' },
  'expression-of-interest': { bg: 'surface.base', color: 'text.secondary' },
};

/**
 * Opportunity card — renders the minimum required fields for a list item.
 *
 * The apply CTA is a mailto link with a predefined subject line so candidates
 * can reach the team without filling in a form.
 *
 * @example
 * <OpportunityCard opportunity={opp} />
 */
const OpportunityCard = ({
  opportunity: opp,
}: {
  opportunity: Opportunity;
}) => {
  const badge = STATUS_COLORS[opp.status];
  return (
    <Box
      bg="surface.raised"
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="card"
      p={{ base: 6, md: 8 }}
      boxShadow="raised"
    >
      <Stack gap={4}>
        <Flex align="center" gap={3} flexWrap="wrap">
          <Box
            px={2}
            py="2px"
            bg={badge.bg}
            borderRadius="xs"
            border="1px solid"
            borderColor="border.subtle"
          >
            <Text textStyle="caption" color={badge.color} fontWeight="medium">
              {STATUS_LABELS[opp.status]}
            </Text>
          </Box>
          {opp.projectArea.map((area) => {
            return (
              <Text key={area} textStyle="caption" color="text.muted">
                {area}
              </Text>
            );
          })}
        </Flex>

        <Stack gap={2}>
          <Text as="h3" textStyle="h4" color="text.primary">
            {opp.title}
          </Text>
          <Text textStyle="body-sm" color="text.secondary">
            {opp.summary}
          </Text>
        </Stack>

        <Flex gap={4} flexWrap="wrap" align="center">
          {opp.applicationDeadline && (
            <Text textStyle="caption" color="text.muted">
              Prazo: <strong>{opp.applicationDeadline}</strong>
            </Text>
          )}
          {opp.location && (
            <Text textStyle="caption" color="text.muted">
              {opp.location}
            </Text>
          )}
        </Flex>

        {opp.eligibility.length > 0 && (
          <Text textStyle="caption" color="text.muted">
            Elegibilidade: {opp.eligibility.join('; ')}
          </Text>
        )}

        <Flex gap={3} flexWrap="wrap">
          <CtaLink href={applyMailto(opp)}>Candidatar-se por email</CtaLink>
          {opp.officialNoticeUrl && (
            <CtaLink href={opp.officialNoticeUrl} variant="outline">
              Consultar edital oficial
            </CtaLink>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};

/**
 * Current opportunities section — renders active items or the empty state.
 *
 * Content is driven entirely by the OPPORTUNITIES data array.
 * The empty state is mandatory per spec: do not remove the section when no
 * opportunities are listed.
 *
 * @example
 * <OpportunityList />
 */
const OpportunityList = () => {
  const active = OPPORTUNITIES.filter((o) => {
    return (
      o.status === 'open' || o.status === 'upcoming' || o.status === 'rolling'
    );
  }).sort((a, b) => {
    const ORDER: Record<Opportunity['status'], number> = {
      open: 0,
      upcoming: 1,
      rolling: 2,
      closed: 3,
      filled: 4,
      'expression-of-interest': 5,
    };
    return ORDER[a.status] - ORDER[b.status];
  });

  return (
    <Section id="oportunidades-atuais" labelledBy="oportunidades-list-heading">
      <Container>
        <Stack gap={10}>
          <Stack gap={3}>
            <Text textStyle="eyebrow" color="brand.fg">
              Oportunidades atuais
            </Text>
            <Text
              as="h2"
              id="oportunidades-list-heading"
              textStyle="h2"
              color="text.primary"
            >
              {active.length > 0
                ? 'Oportunidades abertas agora.'
                : 'Nenhuma oportunidade aberta no momento.'}
            </Text>
          </Stack>

          {active.length === 0 ? (
            <Box
              bg="surface.trust"
              border="1px solid"
              borderColor="border.subtle"
              borderRadius="card"
              p={{ base: 8, md: 12 }}
              maxW="64ch"
            >
              <Stack gap={5}>
                <Text textStyle="body" color="text.secondary">
                  Novas vagas, bolsas e oportunidades de treinamento técnico
                  serão publicadas aqui quando disponíveis. Para manifestar
                  interesse ou tirar dúvidas, entre em contato com a equipe por
                  email.
                </Text>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  gap={3}
                  align={{ base: 'flex-start', sm: 'center' }}
                >
                  <CtaLink
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('[Interesse] IMAGEM:SP')}`}
                  >
                    Enviar email de interesse
                  </CtaLink>
                  <CtaLink href="/contato" variant="outline">
                    Falar com a equipe
                  </CtaLink>
                </Flex>
              </Stack>
            </Box>
          ) : (
            <Stack gap={4}>
              {active.map((opp) => {
                return <OpportunityCard key={opp.id} opportunity={opp} />;
              })}
            </Stack>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

export default OpportunityList;
