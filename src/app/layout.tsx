import type { Metadata } from 'next';
import {
  Atkinson_Hyperlegible,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Newsreader,
} from 'next/font/google';

import { Providers } from './providers';

/**
 * Primary UI/body face — IBM Plex Sans.
 * Registered as CSS variable --font-plex-sans consumed by the Chakra theme.
 */
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

/**
 * Editorial display face — Newsreader serif.
 * Used for h1 and display-level headings.
 * Registered as --font-newsreader.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

/**
 * Accessibility face — Atkinson Hyperlegible.
 * Used in data-text-size accessibility mode.
 * Registered as --font-atkinson.
 */
const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson',
  display: 'swap',
});

/**
 * Monospace face — IBM Plex Mono.
 * Used for code blocks and tabular data.
 * Registered as --font-plex-mono.
 */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IMAGEM:SP — Mapa Inteligente do Envelhecimento de São Paulo',
  description:
    'Atlas digital de inteligência territorial sobre o envelhecimento em São Paulo. Dados públicos para apoiar compreensão, pesquisa, planejamento e políticas baseadas em evidências.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${plexSans.variable} ${newsreader.variable} ${atkinson.variable} ${plexMono.variable}`}
    >
      <head>
        {/*
         * Flash-prevention: sets data-text-size before first paint so the correct
         * font-size is already applied when the browser lays out the page.
         * Runs synchronously in <head> — no React, no hydration wait.
         * try/catch guards against restricted localStorage in some private-browsing modes.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('IMAGEM:SP-text-size');if(s==='large'||s==='extra-large'){document.documentElement.setAttribute('data-text-size',s);}}catch(e){}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } } :root { --text-scale: 1; } html[data-text-size="large"] { --text-scale: 1.125; } html[data-text-size="extra-large"] { --text-scale: 1.25; }',
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
