/**
 * Central icon registry for the imagemsp app.
 *
 * Convention:
 *   - UI navigation / menus  → Phosphor regular (line)  e.g. "ph:caret-left"
 *   - Interactive controls   → Phosphor bold            e.g. "ph:caret-left-bold"
 *   - Active / highlight     → Phosphor fill            e.g. "ph:caret-left-fill"
 *   - Map pins / POI markers → Maki                     e.g. "maki:hospital"
 *
 * Add icons here before use to avoid Iconify API calls in production.
 * Import path: @iconify/icons-<prefix>/<icon-name>
 */
import { addIcon, Icon } from '@ttoss/react-icons';

// Phosphor — navigation (bold for WCAG AAA on interactive controls)
import phCaretLeftBold from '@iconify/icons-ph/caret-left-bold';
import phCaretRightBold from '@iconify/icons-ph/caret-right-bold';

// Phosphor — double caret (bold for toggle buttons)
import phCaretDoubleLeftBold from '@iconify/icons-ph/caret-double-left-bold';
import phCaretDoubleRightBold from '@iconify/icons-ph/caret-double-right-bold';

// Phosphor — line style (menus, labels, decorative)
import phCaretLeft from '@iconify/icons-ph/caret-left';
import phCaretRight from '@iconify/icons-ph/caret-right';

// Register bundled icons (no API call in production)
addIcon('ph:caret-left-bold', phCaretLeftBold);
addIcon('ph:caret-right-bold', phCaretRightBold);
addIcon('ph:caret-double-left-bold', phCaretDoubleLeftBold);
addIcon('ph:caret-double-right-bold', phCaretDoubleRightBold);
addIcon('ph:caret-left', phCaretLeft);
addIcon('ph:caret-right', phCaretRight);

export { Icon };

// Icon name constants — use these instead of raw strings to get typo safety
export const ICONS = {
  // Navigation — bold (WCAG AAA: interactive controls)
  caretLeftBold: 'ph:caret-left-bold',
  caretRightBold: 'ph:caret-right-bold',

  // Double caret — bold (toggle sidebars)
  caretDoubleLeftBold: 'ph:caret-double-left-bold',
  caretDoubleRightBold: 'ph:caret-double-right-bold',

  // Navigation — regular (decorative / menu labels)
  caretLeft: 'ph:caret-left',
  caretRight: 'ph:caret-right',
} as const;

export type IconName = (typeof ICONS)[keyof typeof ICONS];
