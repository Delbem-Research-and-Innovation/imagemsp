/**
 * Data model and content for the IMAGEM:SP opportunities page.
 *
 * Opportunities are typed data objects managed here — layout components never
 * contain hardcoded opportunity content.
 *
 * Add entries to OPPORTUNITIES only when a position has been officially approved
 * and published by the IMAGEM:SP team. Do not include unconfirmed roles, estimated
 * scholarship values, or unverified deadlines.
 *
 * @example
 * // Render only active opportunities
 * const active = OPPORTUNITIES.filter(
 *   (o) => o.status === 'open' || o.status === 'upcoming' || o.status === 'rolling',
 * );
 */

/** Publication and selection status of an opportunity. */
export type OpportunityStatus =
  | 'open'
  | 'upcoming'
  | 'closed'
  | 'filled'
  | 'rolling'
  | 'expression-of-interest';

/** Category of the opportunity. */
export type OpportunityKind =
  | 'scholarship'
  | 'technical-training'
  | 'research-position'
  | 'software-development'
  | 'data-science'
  | 'ux-design'
  | 'collaboration';

/**
 * Full opportunity record.
 *
 * Only `id`, `slug`, `title`, `kind`, `status`, `summary`, `projectArea`,
 * `eligibility`, `activities`, and `updatedAt` are required.
 * All other fields are shown when present and omitted when absent.
 */
export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  kind: OpportunityKind;
  status: OpportunityStatus;
  summary: string;
  projectArea: string[];
  level?: string;
  fundingSource?: string;
  institution?: string;
  location?: string;
  modality?: 'onsite' | 'hybrid' | 'remote' | 'to-be-defined';
  applicationDeadline?: string;
  startDate?: string;
  duration?: string;
  eligibility: string[];
  activities: string[];
  desiredSkills?: string[];
  requiredDocuments?: string[];
  selectionProcess?: string[];
  applyUrl?: string;
  contactEmail?: string;
  officialNoticeUrl?: string;
  externalPublicationUrl?: string;
  updatedAt: string;
};

/**
 * Active and past opportunities for IMAGEM:SP.
 *
 * This array is intentionally empty until an opportunity is officially approved.
 * The page handles the empty state gracefully — do not add placeholder entries.
 *
 * @example
 * const open = OPPORTUNITIES.filter((o) => o.status === 'open');
 */
export const OPPORTUNITIES: Opportunity[] = [];
