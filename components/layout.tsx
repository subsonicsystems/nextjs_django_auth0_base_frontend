import { ReactNode } from 'react';
import Head from 'next/head';
import { IconButton, Typography } from '@mui/joy';
import {
  AppBar, Box, Toolbar,
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
            sx={{
              mr: 2,
              color: 'common.white',
              '&:hover': {
                backgroundColor: 'primary.500',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            level="title-lg"
            textColor="#ffffff"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Nextjs Django Auth0 Base
          </Typography>
          <IconButton
            sx={{
              color: 'common.white',
              '&:hover': {
                backgroundColor: 'primary.500',
              },
            }}
          >
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
