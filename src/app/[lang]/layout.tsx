import '@mantine/core/styles.css';
import { getDictionary } from './dictionaries';
import '@/src/styles/global.scss'

import React, { ReactElement } from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../../../theme';
import { HeaderMenu } from '@/src/components/HeaderMenu/HeaderMenu';
import DictionaryProvider from '@/src/dictionaries/dictionary-provider';
import { Footer } from '@/src/components/Footer/Footer';

// TODO : make this translated & dynamic
export const metadata = {
  title: 'Franck sabet',
  description: "Vente de tapis d'excellence | nettoyage | Restauration",
};

export default async function RootLayout({ children, params }: { children: ReactElement, params: Promise<{ lang: 'en' | 'fr' }> }) {
  const lang = (await params).lang
  const dictionary = await getDictionary(lang)

  return (
    <html {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ backgroundImage: 'linear-gradient(to right, #cdc8c8, white, white, white, white, white, white, white, white, #cdc8c8)' }}>
        <DictionaryProvider dictionary={dictionary}>
          <MantineProvider theme={theme}>
            <HeaderMenu />{children}<Footer />
          </MantineProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
