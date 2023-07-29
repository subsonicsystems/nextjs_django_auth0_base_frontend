import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout';

export default function Index() {
  return (
    <Layout>
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
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
