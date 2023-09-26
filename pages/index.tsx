import NextLink from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Link, Typography } from '@mui/joy';
import Layout from '@/components/layout';

export default function Index() {
  return (
    <Layout>
      <div>
        <Typography
          level="title-md"
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
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
