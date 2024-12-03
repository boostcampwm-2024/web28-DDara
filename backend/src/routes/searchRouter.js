import express from 'express';

export const searchRouter = express.Router();

searchRouter.get('/', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=10&start=1&sort=random`,
      {
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': 'RwiDUxdYdlPHF1pcM0id',
          'X-Naver-Client-Secret': 'zmxxnHsoM0',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Naver API Error:', errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({
      error: error.message,
    });
  }
});
