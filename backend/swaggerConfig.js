import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DDara API',
    version: '1.0.0',
    description: 'API documentation for DDara Project',
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
  components: {
    schemas: {
      LoginRequest: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User ID',
          },
          password: {
            type: 'string',
            description: 'User password',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'Authentication token',
          },
          userId: {
            type: 'string',
            description: 'User ID',
          },
        },
      },
    },
  },
  paths: {},
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

export const specs = swaggerJSDoc(options);
