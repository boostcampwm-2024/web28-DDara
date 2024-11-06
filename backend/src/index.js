import express from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerConfig.js';

const app = express();
const port = 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 예제 라우터 (추가 예정인 라우터의 주석을 Swagger 주석 형식으로 문서화)
app.get('/example', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
