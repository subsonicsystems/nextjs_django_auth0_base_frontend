import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios, { isAxiosError } from 'axios';

export interface Message {
  message: string;
}

export default withApiAuthRequired(async (req, res) => {
  const url = process.env.MESSAGE_URL;

  if (!url) {
    res.status(500).json({ message: 'URL is undefined.' });
    return;
  }

  try {
    const { accessToken } = await getAccessToken(req, res);

    const response = await axios.get<Message>(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        res.status(error.response.status).json({ data: error.response.data });
      } else if (error.request) {
        res.status(500).json({ request: error.request });
      } else {
        res.status(500).json({ message: error.message });
      }

      return;
    }

    res.status(500).json({ message: 'An error has occurred.' });
  }
});
