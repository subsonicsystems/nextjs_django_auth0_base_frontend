import NextLink from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Typography } from '@mui/material';
import { Link } from '@mui/joy';
import Layout from '@/components/layout';

export default function Index() {
  return (
    <Layout>
      <div>
        <Typography
          variant="h6"
          gutterBottom
        >
          ホーム
        </Typography>
        <NextLink
          href="/message"
          passHref
          legacyBehavior
        >
          <Link>
            サーバ応答
          </Link>
        </NextLink>
        <p />
        <NextLink
          href="/api/auth/logout"
          passHref
          legacyBehavior
        >
          <Link>
            ログアウト
          </Link>
        </NextLink>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
