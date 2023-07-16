import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { Message } from '@/pages/api/message';

export default function Message() {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    axios.get<Message>('/api/message')
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage('エラー');
      });
  }, []);

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
            サーバ応答
          </h1>
          <div>
            {message}
          </div>
          <Link href="/">
            ホーム
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
