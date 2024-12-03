import express from 'express';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import cors from 'cors';
import { specs } from '../swaggerConfig.js';
import { PORT } from './constants/constants.js';
import { initializeWebSocketServer } from './websocketServer.js';
import { authRouter } from './routes/authRouter.js';
import { channelRouter } from './routes/channelRouter.js';

const app = express();
app.use(express.json());

// TODO: 프론트 배포 후 origin url 변경
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://223.130.151.43', 'https://ddara.kro.kr'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRouter);
app.use('/api/channel', channelRouter);
app.get('/api/search', async (req, res) => {
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

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 초기화
try {
  initializeWebSocketServer(server);
  console.log('WebSocket server initialized successfully.');
} catch (error) {
  console.error('Failed to initialize WebSocket server:', error);
}

server.listen(PORT, () => {
  console.log(`Server is running`);
});
