import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { track_id } = req.query;

  if (!track_id) {
    res.status(400).json({ error: 'Missing track_id parameter' });
    return;
  }

  const quality = 5;

  const apiUrl = `http://sv.hdmusics.com:8080/api/download-music?track_id=${track_id}&quality=${quality}`;

  try {
    console.debug('Download music API request URL:', apiUrl);
    const response = await axios.get(apiUrl);

    console.debug('Download music API response:', response.data);

    if (response.data && response.data.data.url) {
      const trackUrl = response.data.data.url;

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'inline');

      // Pipe the audio stream to the response using axios
      const audioResponse = await axios({
        method: 'get',
        url: trackUrl,
        responseType: 'stream',
      });

      if (!audioResponse.data) {
        res.status(404).json({ error: 'Audio stream not found' });
        return;
      }
      audioResponse.data.pipe(res);
    } else {
      res.status(404).json({ error: 'Audio URL not found' });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Download music API error response:', error.response.data);
      } else if (error.request) {
        console.error('Download music API no response received:', error.request);
      } else {
        console.error('Download music API error:', error.message);
      }
    } else {
      console.error('Unexpected error in download-music API:', error);
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
