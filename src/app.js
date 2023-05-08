import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './utils/swaggerUtils';
import BookController from './controller/BookController';
import indexRoutes from './routes';
import Book from './models/book';

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(express.json());

const createModels = () => ({
  book: Book
});

const createControllers = () => ({
  bookController: new BookController(app)
});

const registerDependencies = () => {
  app.locals.models = createModels();
  app.locals.controllers = createControllers();
};

const main = () => {
  createModels();
  createControllers();
  registerDependencies();

  indexRoutes(app);

  return 'done.';
};

main();

export default app;
