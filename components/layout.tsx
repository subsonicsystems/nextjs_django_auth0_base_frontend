import { ReactNode, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ModalClose,
  Typography,
} from '@mui/joy';
import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);

  const clickOpenMenu = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const movePage = (url: string) => () => {
    router.push(url)
      .then(() => {
        setOpenMenu(false);
      });
  };

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
            onClick={clickOpenMenu}
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
          <Drawer
            open={openMenu}
            onClose={closeMenu}
            size="sm"
            sx={{
              '& .MuiDrawer-backdrop': { backdropFilter: 'none' },
              '--Drawer-transitionDuration': openMenu ? '0.3s' : 0,
            }}
          >
            <ModalClose />
            <DialogTitle>
               &nbsp;
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemButton onClick={movePage('/')}>
                    ホーム
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={movePage('/message')}>
                    サーバ応答
                  </ListItemButton>
                </ListItem>
              </List>
            </DialogContent>
          </Drawer>
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
