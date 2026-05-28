import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import { isLocale } from '../config/locales';
import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'ImagemSP',
  description: 'Visualizações de dados demográficos de São Paulo',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieLocale = (await cookies()).get('locale')?.value;
  const acceptLanguage = (await headers()).get('accept-language') ?? '';
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : acceptLanguage.toLowerCase().includes('pt')
      ? 'pt-BR'
      : 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
