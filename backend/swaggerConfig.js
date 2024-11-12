import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Name',
    version: '1.0.0',
    description: 'API documentation for Your Project',
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

export const specs = swaggerJSDoc(options);
