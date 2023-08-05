import { useEffect, useState } from 'react';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';
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
        <Typography
          variant="h6"
          gutterBottom
        >
          サーバ応答
        </Typography>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            {message}
          </CardContent>
        </Card>
        <Box mt={2}>
          <Link href="/">
            ホーム
          </Link>
        </Box>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
