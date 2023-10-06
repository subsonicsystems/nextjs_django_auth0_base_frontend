import { ReactNode, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
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

export default function Layout({ children }: {
  children: ReactNode
}) {
  const router = useRouter();
  const { user } = useUser();

  const [openMenu, setOpenMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const clickOpenMenu = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const clickOpenAccountMenu = () => {
    setOpenAccountMenu(true);
  };

  const closeAccountMenu = () => {
    setOpenAccountMenu(false);
  };

  const movePage = (url: string) => () => {
    router.push(url)
      .then(() => {
        if (openMenu) {
          setOpenMenu(false);
        }

        if (openAccountMenu) {
          setOpenAccountMenu(false);
        }
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
                color: 'common.white',
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
            onClick={clickOpenAccountMenu}
            sx={{
              color: 'common.white',
              '&:hover': {
                color: 'common.white',
                backgroundColor: 'primary.500',
              },
            }}
          >
            <AccountCircle />
          </IconButton>
          <Drawer
            open={openAccountMenu}
            onClose={closeAccountMenu}
            anchor="right"
            size="sm"
            sx={{
              '& .MuiDrawer-backdrop': { backdropFilter: 'none' },
              '--Drawer-transitionDuration': openAccountMenu ? '0.3s' : 0,
            }}
          >
            <ModalClose />
            <DialogTitle>
              {user ? user.name : '&nbsp;'}
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemButton onClick={movePage('/api/auth/logout')}>
                    ログアウト
                  </ListItemButton>
                </ListItem>
              </List>
            </DialogContent>
          </Drawer>
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
