import { createContext, useState } from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CssBaseline } from '@mui/material';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider, extendTheme as joyExtendTheme } from '@mui/joy/styles';
import '@fontsource-variable/noto-sans-jp';

interface UserData {
  name: string;
  email: string;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const materialTheme = materialExtendTheme({
  typography: {
    fontFamily: '"Noto Sans JP Variable",sans-serif',
  },
});

const joyTheme = joyExtendTheme({
  fontFamily: {
    body: '"Noto Sans JP Variable",sans-serif',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
          <JoyCssVarsProvider theme={joyTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
      </UserContext.Provider>
    </UserProvider>
  );
}
