import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CssBaseline } from '@mui/material';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider, extendTheme as joyExtendTheme } from '@mui/joy/styles';

const materialTheme = materialExtendTheme({
  typography: {
    fontFamily: '"Yu Gothic",YuGothic,sans-serif',
  },
});

const joyTheme = joyExtendTheme({
  fontFamily: {
    body: '"Yu Gothic",YuGothic,sans-serif',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={joyTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </UserProvider>
  );
}
