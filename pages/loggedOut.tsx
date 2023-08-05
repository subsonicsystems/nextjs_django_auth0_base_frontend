import Head from 'next/head';
import Link from 'next/link';

export default function LoggedOut() {
  return (
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
}
