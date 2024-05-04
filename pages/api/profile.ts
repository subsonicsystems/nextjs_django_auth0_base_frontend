import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios, { isAxiosError } from 'axios';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.API_URL) {
    res.status(500).json({ message: 'The API URL is undefined.' });
    return;
  }

  const { accessToken } = await getAccessToken(req, res);

  try {
    const response = await axios.postForm(`${process.env.API_URL}/update_profile`, req.body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (!isAxiosError(error)) {
      res.status(500).json({ message: 'An error has occurred.' });
      return;
    }

    if (error.response) {
      res.status(error.response.status).json({ data: error.response.data });
    } else if (error.request) {
      res.status(500).json({ request: error.request });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});
