import Head from 'next/head';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Index() {
  return (
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
          <Link href="/message">
            サーバ応答
          </Link>
          <p />
          <Link href="/api/auth/logout">
            ログアウト
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
