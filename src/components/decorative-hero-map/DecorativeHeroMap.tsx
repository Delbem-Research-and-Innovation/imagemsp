'use client';

import * as React from 'react';

import { HERO_MAP_PALETTES } from './heroMapPalette';
import { HERO_SAO_PAULO_DISTRICTS } from './sp-district-map.generated';

export type DecorativeHeroMapProps = {
  /**
   * CSS class forwarded to the SVG root.
   * Use to control size and position from the parent — e.g. `width: 100%`.
   */
  className?: string;
  /**
   * Inline styles forwarded to the SVG root.
   * Use to control size from the parent — e.g. `{ height: '100%', width: 'auto' }`.
   */
  style?: React.CSSProperties;
  /**
   * Enable the staggered district assembly animation.
   * Respects `prefers-reduced-motion: reduce` via CSS.
   * @default true
   */
  animated?: boolean;
};

// Styles shared regardless of animation state.
const BASE_CSS =
  '.dhm-shadow path{fill:rgba(31,23,18,.08);transform:translateY(10px);filter:blur(5px)}' +
  '.dhm-boundary path{fill:none;stroke:rgba(15,10,6,1);stroke-width:.85;vector-effect:non-scaling-stroke;pointer-events:none}' +
  '.dhm-path-tray,.dhm-path-overlay{vector-effect:non-scaling-stroke;transform-box:fill-box;transform-origin:center}' +
  // Overlay pieces sit above the tray, invisible until placed.
  '.dhm-path-overlay{opacity:0}';

// Phase 1 — outlines traced center-outward (pathLength=1 normalises any path length).
// Phase 2 — tray assembles in, district by district.
// Phase 3 — overlay palette pieces drop from above every ~6s, cycling through all palettes.
const ASSEMBLY_CSS =
  '@media(prefers-reduced-motion:no-preference){' +
  '.dhm-animated .dhm-boundary path{stroke-dasharray:1;stroke-dashoffset:1;' +
  'animation:dhmDraw 600ms cubic-bezier(.4,0,.2,1) forwards;' +
  'animation-delay:calc(var(--enter-index,0)*20ms)}' +
  // Tray: assembles in on mount; fill updates between cycles without re-animating.
  '.dhm-animated .dhm-path-tray{' +
  'animation:dhmAssemble 760ms cubic-bezier(.2,0,0,1) both;' +
  'animation-delay:calc(3.2s + var(--enter-index,0)*18ms)}' +
  // Overlay: key-remount resets animation; new palette drops in each cycle.
  '.dhm-placing .dhm-path-overlay{' +
  'animation:dhmPlace 640ms cubic-bezier(.2,0,0,1) forwards;' +
  'animation-delay:calc(var(--enter-index,0)*14ms)}' +
  '}' +
  '@keyframes dhmDraw{to{stroke-dashoffset:0}}' +
  '@keyframes dhmAssemble{' +
  '0%{opacity:0;transform:translateY(-10px) scale(.965)}' +
  '58%{opacity:1;transform:translateY(-2px) scale(1.008)}' +
  '100%{opacity:1;transform:translateY(0) scale(1)}}' +
  // Piece held above (oversized+translucent), drops, overshoots, snaps flush to tray.
  '@keyframes dhmPlace{' +
  '0%{opacity:0;transform:translateY(-20px) scale(1.08)}' +
  '50%{opacity:1;transform:translateY(3px) scale(.997)}' +
  '75%{opacity:1;transform:translateY(-1.5px) scale(1.003)}' +
  '100%{opacity:1;transform:translateY(0) scale(1)}}';

// Cycle timing (ms).
// Assembly phase 2 ends at ~5.67s → 4s gap → first overlay at 9.7s.
// Each cycle: ~2s for last piece to land + idle = CYCLE_INTERVAL_MS total.
const FIRST_TRIGGER_MS = 9700;
const CYCLE_INTERVAL_MS = 4500;

/**
 * Purely decorative SVG map of São Paulo municipal districts for the homepage hero.
 * Renders 96 district paths across three layers: shadow, surfaces, and boundaries.
 *
 * Animation sequence (when `animated={true}`):
 * 1. Outlines traced district-by-district (~2.5s)
 * 2. Blue districts assemble onto the tray (~2.5s, starts at 3.2s)
 * 3. Overlay palette pieces drop from above every ~6s, cycling through all palettes
 *
 * Hidden from assistive technologies (`aria-hidden`).
 * Ensure surrounding hero copy describes the visual content.
 *
 * @example
 * <DecorativeHeroMap />
 *
 * @example
 * <DecorativeHeroMap animated={false} style={{ height: '100%', width: 'auto' }} />
 */
export const DecorativeHeroMap = ({
  className,
  style,
  animated = true,
}: DecorativeHeroMapProps) => {
  const [cycleCount, setCycleCount] = React.useState(0);

  React.useEffect(() => {
    if (!animated) return;
    // Respect prefers-reduced-motion: skip timers entirely so the tray never
    // flashes through palette changes without the accompanying animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const schedule = (delay: number) => {
      timerId = setTimeout(() => {
        setCycleCount((c) => {
          return c + 1;
        });
        schedule(CYCLE_INTERVAL_MS);
      }, delay);
    };

    schedule(FIRST_TRIGGER_MS);
    return () => {
      return clearTimeout(timerId);
    };
  }, [animated]);

  const placing = cycleCount >= 1;
  // Tray shows the previous palette — matches the landed overlay at the moment of remount,
  // so there is no visual discontinuity when the overlay <g> is replaced.
  const trayPalette =
    HERO_MAP_PALETTES[
      (cycleCount === 0 ? 0 : cycleCount - 1) % HERO_MAP_PALETTES.length
    ] ?? HERO_MAP_PALETTES[0];
  // Overlay shows the current palette; key={cycleCount} resets the CSS animation on each cycle.
  const overlayPalette =
    HERO_MAP_PALETTES[cycleCount % HERO_MAP_PALETTES.length] ??
    HERO_MAP_PALETTES[0];

  const svgClass = [
    'dhm-svg',
    animated && 'dhm-animated',
    placing && 'dhm-placing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      viewBox="0 0 540 720"
      aria-hidden="true"
      focusable="false"
      className={svgClass}
      style={{ overflow: 'visible', ...style }}
    >
      <style>{animated ? BASE_CSS + ASSEMBLY_CSS : BASE_CSS}</style>

      {/* Layer 1 — shadow: blurred offset copy of all district paths */}
      <g className="dhm-shadow" aria-hidden="true">
        {HERO_SAO_PAULO_DISTRICTS.map((district) => {
          return <path key={district.id} d={district.path} />;
        })}
      </g>

      {/* Layer 2 — tray: assembles in, fill updates to previous palette on each cycle */}
      <g className="dhm-surfaces-tray">
        {HERO_SAO_PAULO_DISTRICTS.map((district) => {
          return (
            <path
              key={district.id}
              className="dhm-path-tray"
              d={district.path}
              fill={trayPalette[district.dataClass] ?? trayPalette[0]}
              style={
                { '--enter-index': district.enterOrder } as React.CSSProperties
              }
            />
          );
        })}
      </g>

      {/* Layer 3 — overlay: key remount resets animation; new palette drops in each cycle */}
      <g key={cycleCount} className="dhm-surfaces-overlay">
        {HERO_SAO_PAULO_DISTRICTS.map((district) => {
          return (
            <path
              key={district.id}
              className="dhm-path-overlay"
              d={district.path}
              fill={overlayPalette[district.dataClass] ?? overlayPalette[0]}
              style={
                { '--enter-index': district.enterOrder } as React.CSSProperties
              }
            />
          );
        })}
      </g>

      {/* Layer 4 — boundaries: traced center-outward in phase 1, then acts as hairline overlay */}
      <g className="dhm-boundary" aria-hidden="true">
        {HERO_SAO_PAULO_DISTRICTS.map((district) => {
          return (
            <path
              key={district.id}
              d={district.path}
              pathLength={1}
              style={
                { '--enter-index': district.enterOrder } as React.CSSProperties
              }
            />
          );
        })}
      </g>
    </svg>
  );
};
