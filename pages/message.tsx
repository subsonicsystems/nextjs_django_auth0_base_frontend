import { useEffect, useState } from 'react';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import Layout from '@/components/layout';
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
    <Layout>
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
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
