import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../swaggerConfig';
import { pool } from './db';

const app = express();
app.use(express.json());
const port = 3001;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
