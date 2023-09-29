import Head from 'next/head';
import NextLink from 'next/link';
import { Link } from '@mui/joy';
import { Box } from '@mui/material';

export default function LoggedOut() {
  return (
    <>
      <Head>
        <title>
          Nextjs Django Auth0 Base
        </title>
      </Head>
      <main>
        <Box p={2}>
          <span>
            ログアウトしました。
          </span>
          <p />
          <NextLink
            href="/api/auth/login"
            passHref
            legacyBehavior
          >
            <Link>
              ログイン
            </Link>
          </NextLink>
        </Box>
      </main>
    </>
  );
}
