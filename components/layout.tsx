import {
  ReactNode, useContext, useEffect, useState,
} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ModalClose,
  Snackbar,
  SnackbarProps,
  Typography,
} from '@mui/joy';
import {
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { User } from '@/pages/api/getUser';
import { UserContext } from '@/pages/_app';

export default function Layout({ children }: {
  children: ReactNode
}) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<SnackbarProps['color']>();
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  useEffect(() => {
    axios
      .get<User>('/api/getUser')
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setMessage('情報を取得できませんでした。');
        setSnackbarColor('danger');
        setOpenSnackbar(true);
      });
  }, []);

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
          <Box sx={{ flexGrow: 1 }}>
            <NextLink
              href="/"
              passHref
              legacyBehavior
            >
              <Link>
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                >
                  Nextjs Django Auth0 Base
                </Typography>
              </Link>
            </NextLink>
          </Box>
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
            <AccountCircleIcon />
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
              {user ? `${user.last_name} ${user.first_name}` : '&nbsp;'}
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemButton onClick={movePage('/profile')}>
                    <ListItemDecorator>
                      <AccountCircleOutlinedIcon />
                    </ListItemDecorator>
                    プロフィール
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={movePage('/api/auth/logout')}>
                    <ListItemDecorator>
                      <LogoutOutlinedIcon />
                    </ListItemDecorator>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        color={snackbarColor}
        variant="soft"
      >
        {message}
      </Snackbar>
    </>
  );
}
