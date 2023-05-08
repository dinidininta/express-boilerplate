/* eslint-disable max-lines-per-function */
import express from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import dbConfig from './db/config';
import swaggerDocs from './utils/SwaggerUtils';
import Course from './models/Course';
import CourseRepository from './repository/CourseRepository';
import CourseController from './controller/CourseController';
import indexRoutes from './routes';

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(express.json());

const main = () => {
  dbConfig.connect();

  const createModels = () => ({
    course: Course
  });

  const createRepositories = (models) => ({
    courseRepository: new CourseRepository(models)
  });

  const createServices = (repositories) => ({
  });

  const createControllers = () => ({
    courseController: new CourseController(app)
  });

  const registerDependencies = () => {
    app.locals.models = createModels();
    app.locals.repositories = createRepositories(app.locals.models);
    app.locals.services = createServices(app.locals.repositories);
    app.locals.controllers = createControllers();
  };

  registerDependencies();
  indexRoutes(app);
  console.log('Connected successfully to server');

  return 'done.';
};

main();

const server = http.createServer(app);

server.listen(process.env.PORT);

const shutdownProcess = () => {
  // eslint-disable-next-line no-console
  server.close(() => {
    // eslint-disable-next-line no-console
    dbConfig.disconnect();
    process.exit(0);
  });
};

process.on('SIGTERM', shutdownProcess);
process.on('SIGINT', shutdownProcess);

export default app;
