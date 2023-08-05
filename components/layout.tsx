import { ReactNode } from 'react';
import Head from 'next/head';
import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>
          Nextjs Django Auth0 Base
        </title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Nextjs Django Auth0 Base
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Box p={2}>
          {children}
        </Box>
      </main>
    </>
  );
}
