# IMAGEMSP — Open Positions & Opportunities Page Spec

## 0. Scope

Build the `Open Positions & Opportunities` page for the IMAGEMSP website.

This page publishes open positions, scholarships, technical training opportunities, research roles, and structured ways to express interest in joining or collaborating with the project.

It must not become a generic careers page, volunteer campaign, full team page, HR portal, grant-management page, or institutional news feed.

Use `design.instructions.md` as the design authority. Use `theme.ts` for colors, typography, spacing, radii, shadows, elevation, motion, and component variants. Do not hardcode visual values in page components.

---

## 1. Page objective

The page objective is:

> Help qualified candidates and collaborators understand whether there is a current opportunity to join IMAGEMSP, what type of opportunity it is, what is expected, how to apply, and what to do when no opportunities are open.

The page must create trust through clarity, transparency, status, and accessible language.

It should answer:

1. Is there an open opportunity now?
2. What type of opportunity is it?
3. Am I eligible?
4. What will I do?
5. What documents or information are required?
6. How and when do I apply?
7. Who can I contact?
8. What can I do if there are no openings?

---

## 2. Project framing

IMAGEMSP is a public, research-based, civic digital atlas for understanding aging in São Paulo through territorial data.

The opportunities page should present joining the team as participation in a public-interest research and technology project, not as joining a startup or campaign.

Suggested framing:

```txt
Join the IMAGEMSP team

Work on a public digital atlas that connects aging, territory, data, policy, accessibility, and technology in São Paulo.
```

Portuguese version:

```txt
Junte-se à equipe do IMAGEMSP

Participe de um atlas digital público que conecta envelhecimento, território, dados, políticas públicas, acessibilidade e tecnologia em São Paulo.
```

Tone:

```txt
clear
public
institutional
welcoming
precise
transparent
non-promotional
```

Avoid:

```txt
startup hype
“rockstar” language
charity framing
vague innovation claims
urgent activist language
career-page clichés
overpromising scholarships or hiring
```

---

## 3. Audience

Primary users:

```txt
undergraduate students
master's students
doctoral students
postdoctoral researchers
technical training candidates
research assistants
data and software collaborators
UX/UI and accessibility collaborators
institutional partners
```

Secondary users:

```txt
professors or supervisors sharing opportunities
research offices
journalists or stakeholders checking project activity
people interested in future collaboration
```

The page should be understandable to early-career candidates and credible to experienced researchers.

---

## 4. Route and navigation

Recommended route:

```txt
/opportunities
```

Recommended navigation label:

```txt
Opportunities
```

Alternative label if the site is mostly Portuguese:

```txt
Oportunidades
```

Recommended page title:

```txt
Open Positions & Opportunities
```

Recommended bilingual title if needed:

```txt
Oportunidades — Vagas, bolsas e formas de colaboração
```

Do not split `Open Positions` and `Scholarships` into separate pages unless the content volume requires it.

---

## 5. Information architecture

Required sections, in order:

1. Hero
2. Current opportunities
3. Opportunity types
4. How selection works
5. Future interest / expression of interest
6. Project areas
7. Accessibility and inclusion note
8. Contact and official links
9. Footer

Optional sections:

```txt
FAQ
Past opportunities
Timeline
Institutional funding note
```

Do not include:

```txt
full team bios
full grant documentation
budget details
private selection criteria
long legal text
unapproved openings
unverified scholarship amounts
forms asking for sensitive personal data
```

---

## 6. Content model

Opportunities must be content-driven, not hardcoded into layout components.

Recommended type:

```ts
export type OpportunityStatus =
  | 'open'
  | 'upcoming'
  | 'closed'
  | 'filled'
  | 'rolling'
  | 'expression-of-interest';

export type OpportunityKind =
  | 'scholarship'
  | 'technical-training'
  | 'research-position'
  | 'software-development'
  | 'data-science'
  | 'ux-design'
  | 'collaboration';

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
```

Minimum fields for an opportunity card:

```txt
title
kind
status
summary
deadline or status note
area
CTA
```

Minimum fields for an opportunity detail view:

```txt
title
status
summary
area
eligibility
activities
deadline
required documents
selection process
application channel
contact
official notice or publication link
last updated
```

---

## 7. Hero specification

Purpose: explain what the page is for and whether opportunities exist.

Suggested copy:

```txt
Open Positions & Opportunities

Join a public research and technology project about aging, territory, data, and policy in São Paulo.

Find current openings, scholarships, technical training opportunities, and ways to express interest in future collaboration with IMAGEMSP.
```

Primary CTA when there are open opportunities:

```txt
View open opportunities
```

Primary CTA when there are no open opportunities:

```txt
Register future interest
```

Secondary CTA:

```txt
Learn about the project
```

Hero metadata chips:

```txt
Research
Public technology
Data and maps
Aging and territory
Accessibility
```

Rules:

```txt
Do not imply there are open positions if none exist.
Show a clear status summary above the fold.
Keep the page useful even when no positions are open.
```

---

## 8. Current opportunities

Purpose: make the current status immediately clear.

If opportunities exist, show a filtered list with cards.

Filters:

```txt
All
Scholarships
Technical training
Research
Software / data
UX / design
Collaboration
```

Card content:

```txt
Title
Status badge
Opportunity type
Short summary
Area
Deadline
Location/modality
CTA: View details / Apply
```

Status badges:

```txt
Open
Upcoming
Rolling
Closed
Filled
Expression of interest
```

Rules:

```txt
Open items must appear first.
Closed items must not dominate the page.
Deadlines must be explicit.
Cards must not hide critical eligibility.
Do not show “Apply” unless an actual application channel exists.
```

---

## 9. Empty state

The empty state is mandatory.

When there are no current open opportunities, show:

```txt
No open opportunities at the moment.

New positions and scholarships will be published here when available. You can register your interest to receive information about future opportunities related to data, software, design, aging, public health, urban planning, and territorial analysis.
```

CTA:

```txt
Register future interest
```

Secondary CTA:

```txt
Contact the team
```

Rules:

```txt
Do not make the page look abandoned.
Do not remove the page when there are no openings.
Do not hide the date of last update.
```

---

## 10. Opportunity types

Purpose: explain what kinds of opportunities may appear.

Cards:

```txt
Scholarships
Academic opportunities linked to research, data, methods, mapping, public health, aging, or technology.

Technical training
Applied roles for implementation, data pipelines, visualization, documentation, or platform support.

Research roles
Opportunities for students and researchers working on aging, health, urban planning, geography, policy, or data science.

Software, data and design
Technical collaboration in web development, geospatial systems, accessibility, UX/UI, visualization, and open-source infrastructure.

Institutional collaboration
Partnerships with public agencies, research groups, civil-society organizations, and related projects.
```

Rules:

```txt
Use “may include” language unless there are approved opportunities.
Do not promise scholarship categories before they are confirmed.
Do not publish values, benefits, or eligibility unless officially approved.
```

---

## 11. How selection works

Purpose: make the process understandable and fair.

Suggested steps:

```txt
1. Opportunity is published
Each opening includes title, area, eligibility, activities, deadline, documents, and application channel.

2. Candidate submits application
Applications follow the channel indicated in the opportunity notice.

3. Team reviews eligibility and fit
Selection considers the requirements listed for the specific opportunity.

4. Shortlisted candidates may be contacted
The team may request interviews, portfolio, writing sample, technical material, or additional documentation.

5. Result and next steps
Selected candidates receive instructions about formalization, start date, and institutional requirements.
```

Rules:

```txt
Keep this generic enough for scholarships and positions.
Do not define a process that conflicts with FAPESP, USP, or project-specific notices.
Always let the opportunity notice override the generic process.
```

---

## 12. Future interest form

Purpose: allow interested candidates to connect without creating a formal application when no opening exists.

Recommended fields:

```txt
Name
Email
Current affiliation
Area of interest
Short message
Link to CV Lattes, ORCID, GitHub, portfolio, or LinkedIn
Consent checkbox for contact about future opportunities
```

Area options:

```txt
Aging / gerontology
Public health
Urban planning
Geography / GIS
Data science
Software engineering
UX/UI and accessibility
Visualization
Public policy
Communication / documentation
Other
```

Rules:

```txt
Make clear this is not an application.
Do not request sensitive data.
Do not ask for documents unless there is a specific opportunity.
Include privacy/retention note.
Confirm submission with a clear success message.
```

Suggested disclaimer:

```txt
Submitting interest does not guarantee selection or future contact. Formal applications must follow the instructions published for each opportunity.
```

---

## 13. Project areas

Purpose: show where candidates may contribute.

Use concise cards:

```txt
Aging and public health
Research on aging, health, care, functional ability, services, and public policy.

Territorial data and GIS
Data integration, territorial units, map layers, spatial analysis, and geospatial quality.

Software and open infrastructure
Web app, data pipelines, documentation, testing, accessibility, and open-source engineering.

UX, accessibility and communication
Older-adult-centered UX, plain language, inclusive design, documentation, and public communication.

Policy and evaluation
Indicator design, monitoring, domain frameworks, public management, and impact evaluation.
```

Rules:

```txt
This section should inspire fit, not become a research agenda.
Do not duplicate the Project Overview page.
```

---

## 14. Accessibility and inclusion note

The page must model the accessibility values of IMAGEMSP.

Suggested copy:

```txt
IMAGEMSP values accessible communication, inclusive participation, and respectful collaboration. Opportunity notices should be written in clear language and provide contact information for questions about accessibility, documentation, or application procedures.
```

Rules:

```txt
Do not frame accessibility as a favor.
Provide a contact channel.
Ensure all forms and opportunity cards are keyboard-accessible.
```

---

## 15. Official links and disclaimers

Purpose: avoid confusion between the IMAGEMSP site, FAPESP pages, USP processes, and official opportunity notices.

Required guidance:

```txt
Each opportunity must state whether it is an IMAGEMSP publication, an official FAPESP opportunity, a USP-linked process, or another type of collaboration.

When an official external notice exists, link to it.

If rules differ between this page and the official notice, the official notice prevails.
```

Recommended links when relevant:

```txt
FAPESP Oportunidades de Bolsas
FAPESP Bolsas
SAGe
USP / program page if applicable
Project contact email
```

Do not publish unverified scholarship rules, amounts, dates, or eligibility.

---

## 16. Visual design

Follow Civic Material Atlas.

The page should feel:

```txt
public
clear
trustworthy
welcoming
research-backed
not corporate HR
not startup recruiting
not academic bureaucracy
```

Use:

```txt
warm surfaces
clear cards
status badges
simple filters
tactile CTAs
readable metadata
calm institutional typography
```

Avoid:

```txt
stock career imagery
people-as-decoration photos
aggressive recruiting language
confetti/celebration visuals
neon gradients
low-contrast badges
small metadata
```

---

## 17. Accessibility requirements

Minimum:

```txt
WCAG 2.2 AA
semantic HTML
one h1
ordered headings
keyboard-accessible filters
visible focus states
large tap/click targets
plain-language status labels
no color-only status communication
accessible form labels and errors
support 200% text zoom
no hover-only content
```

Opportunity status must use both color and text.

Form errors must be specific:

```txt
Enter a valid email address.
Select at least one area of interest.
This field is required.
```

---

## 18. SEO and metadata

Suggested title:

```txt
Open Positions & Opportunities — IMAGEMSP
```

Suggested description:

```txt
Find open positions, scholarships, technical training opportunities, and ways to collaborate with IMAGEMSP, a public digital atlas about aging, territory, data, and policy in São Paulo.
```

Portuguese description:

```txt
Veja vagas, bolsas, oportunidades de treinamento técnico e formas de colaboração com o IMAGEMSP, um atlas digital público sobre envelhecimento, território, dados e políticas públicas em São Paulo.
```

---

## 19. Analytics events

Track only meaningful actions:

```txt
opportunities_view_open_clicked
opportunities_filter_changed
opportunity_detail_opened
opportunity_apply_clicked
opportunities_interest_form_started
opportunities_interest_form_submitted
opportunities_contact_clicked
opportunities_external_notice_clicked
```

Do not track typing in form fields.

---

## 20. Acceptance criteria

The page is approved when:

```txt
Users immediately know whether there are open opportunities.
Open items show title, type, status, deadline, area, eligibility summary, and CTA.
No-openings state is useful and not abandoned.
Scholarships are not implied unless approved.
Official notices and external processes are clearly separated from site content.
Future-interest form does not pretend to be a formal application.
The page fits Civic Material Atlas style.
The page is accessible, responsive, and readable at 200% zoom.
Status is not communicated by color alone.
All content can be managed without editing layout components.
```

---

## 21. Implementation prompt

```txt
Build the IMAGEMSP Open Positions & Opportunities page.

Use design.instructions.md and theme.ts. Do not hardcode design tokens.

This page publishes current and future ways to join or collaborate with IMAGEMSP: open positions, scholarships, technical training opportunities, research roles, software/data/design roles, and expression of interest.

The page must not be a generic HR page. It should feel like a public research and technology project: civic, clear, accessible, transparent, and institutionally credible.

Required sections:
1. Hero with clear status summary
2. Current opportunities list
3. Empty state when no opportunities are open
4. Opportunity types
5. How selection works
6. Future interest form
7. Project areas
8. Accessibility and inclusion note
9. Official links and disclaimers
10. Footer

Implement opportunities as content/data objects, not hardcoded cards. Each item must include title, kind, status, summary, area, deadline/status note, eligibility, activities, application channel, official notice link if available, and last updated date.

Do not imply open roles exist when none are published. Do not publish scholarship values, rules, or deadlines unless officially approved. If an official external notice exists, link to it and state that it prevails.

Use accessible filters, status badges with text labels, visible focus, large targets, clear form labels, specific form errors, and no color-only communication.
```
