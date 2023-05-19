import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './utils/swaggerUtils';
import BookController from './controller/BookController';
import CustomerController from './controller/CustomerController';
import BorrowingRecordController from './controller/BorrowingRecordController';
import BookService from './service/BookService';
import CustomerService from './service/CustomerService';
import indexRoutes from './routes';
import Book from './models/book';
import Author from './models/author';
import Customer from './models/customer';
import BorrowingRecord from './models/borrowingRecord';
import errorMiddleware from './middlewares/errorMiddleware';

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(express.json());

const createModels = () => ({
  book: Book,
  author: Author,
  customer: Customer,
  borrowingRecord: BorrowingRecord
});

const createControllers = () => ({
  bookController: new BookController(app),
  customerController: new CustomerController(app),
  borrowingRecordController: new BorrowingRecordController(app)
});

const createServices = () => ({
  bookService: new BookService(app),
  customerService: new CustomerService(app)
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
