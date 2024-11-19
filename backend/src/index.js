import express from 'express';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import { specs } from '../swaggerConfig.js';
import { PORT } from './constants/constants.js';
import { initializeWebSocketServer } from './websocketServer.js';
import { authRouter } from './routes/authRouter.js';
import { channelRouter } from './routes/channelRouter.js';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRouter);
app.use('/api/channel', channelRouter);

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 초기화
try {
  initializeWebSocketServer(server);
  console.log('WebSocket server initialized successfully.');
} catch (error) {
  console.error('Failed to initialize WebSocket server:', error);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
