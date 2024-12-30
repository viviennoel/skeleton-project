import '@mantine/core/styles.css';
import { getDictionary } from './dictionaries'

import React, { ReactElement } from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../../../theme';
import { HeaderMenu } from '@/src/components/HeaderMenu/HeaderMenu';
import DictionaryProvider from '@/src/dictionaries/dictionary-provider';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
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
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <MantineProvider theme={theme}>
            <HeaderMenu />{children}
          </MantineProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
