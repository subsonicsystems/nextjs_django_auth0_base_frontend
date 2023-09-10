import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
  Box, Card, CardContent,
} from '@mui/material';
import { Link, Typography } from '@mui/joy';
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
          level="title-md"
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
          <NextLink
            href="/"
            passHref
            legacyBehavior
          >
            <Link>
              ホーム
            </Link>
          </NextLink>
        </Box>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
