import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios, { isAxiosError } from 'axios';

export interface User {
  last_name: string;
  first_name: string;
  email: string;
}

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.API_URL) {
    res.status(500).json({ message: 'The API URL is undefined.' });
    return;
  }

  const { accessToken } = await getAccessToken(req, res);

  try {
    const response = await axios.get<User>(`${process.env.API_URL}/users/get_user/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
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
