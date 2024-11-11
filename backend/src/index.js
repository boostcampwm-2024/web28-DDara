import express from 'express';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import { specs } from '../swaggerConfig';
import { pool } from './db';
import { PORT } from './constants';
import { initializeWebSocketServer } from './websocketServer';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// TODO: 데이터베이스에서 데이터 가져오기 예시
app.get('/guests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM guest');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

// TODO: 예제 라우터 (추가 예정인 라우터의 주석을 Swagger 주석 형식으로 문서화)
app.get('/example', (req, res) => {
  res.send('Hello World');
});

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 초기화
initializeWebSocketServer(server);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
