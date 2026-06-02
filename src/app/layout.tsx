import type { Metadata } from 'next';
import {
  Atkinson_Hyperlegible,
  IBM_Plex_Mono,
  Source_Serif_4,
} from 'next/font/google';
import localFont from 'next/font/local';

import { Providers } from './providers';

/**
 * Primary UI/body face — Gotham.
 * Self-hosted via next/font/local. Registered as --font-gotham.
 */
const gotham = localFont({
  src: [
    {
      path: '../fonts/gotham/Gotham-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/gotham/Gotham-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/gotham/Gotham-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/gotham/Gotham-BookItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/gotham/Gotham-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/gotham/Gotham-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/gotham/Gotham-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/gotham/Gotham-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-gotham',
  display: 'swap',
});

/**
 * Editorial display face — Source Serif 4.
 * Used for h1 and display-level headings.
 * Registered as --font-source-serif.
 */
const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
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
      className={`${gotham.variable} ${sourceSerif4.variable} ${atkinson.variable} ${plexMono.variable}`}
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
