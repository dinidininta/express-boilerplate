import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './utils/swaggerUtils';
import BookController from './controller/BookController';
import CustomerController from './controller/CustomerController';
import BookService from './service/BookService';
import indexRoutes from './routes';
import Book from './models/book';
import Author from './models/author';
import Customer from './models/customer';
import errorMiddleware from './middlewares/errorMiddleware';

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(express.json());

const createModels = () => ({
  book: Book,
  author: Author,
  customer: Customer
});

const createControllers = () => ({
  bookController: new BookController(app),
  customerController: new CustomerController(app)
});

const createServices = () => ({
  bookService: new BookService(app)
});

const registerDependencies = () => {
  app.locals.models = createModels();
  app.locals.services = createServices();
  app.locals.controllers = createControllers();
};

const main = () => {
  registerDependencies();

  indexRoutes(app);

  return 'done.';
};

main();
app.use(errorMiddleware);

export default app;
