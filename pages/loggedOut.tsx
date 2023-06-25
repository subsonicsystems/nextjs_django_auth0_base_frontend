import Head from 'next/head';
import Link from 'next/link';

const LoggedOut = () => (
  <>
    <Head>
      <title>
        Nextjs Django Auth0 Base
      </title>
    </Head>
    <main>
      <div>
        <span>
          ログアウトしました。
        </span>
        <p />
        <Link href="/api/auth/login">
          ログイン
        </Link>
      </div>
    </main>
  </>
);

export default LoggedOut;
