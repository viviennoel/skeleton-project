'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  components: {
    Container: {
      styles: (theme: any) => ({
        root: {
          // backgroundColor: 'white',
        },
      }),
    },
  },
});
