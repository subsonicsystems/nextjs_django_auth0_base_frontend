import Head from 'next/head';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Index = () => (
  <>
    <Head>
      <title>
        Nextjs Django Auth0 Base
      </title>
    </Head>
    <main>
      <div>
        <h1>
          ホーム
        </h1>
        <Link href="/api/auth/logout">
          ログアウト
        </Link>
      </div>
    </main>
  </>
);

export const getServerSideProps = withPageAuthRequired();

export default Index;
