const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ms-express-boilerplate',
      version: '1.0.0'
    }
  },
  basePath: '/',
  apis: ['./src/**/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
