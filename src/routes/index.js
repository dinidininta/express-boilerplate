import express from 'express';
import bookRoute from './BookRoutes';
import customerRoute from './CustomerRoutes';

const router = express.Router();

const indexRoutes = (app) => {
  app.use('/api', router);
  router.use('/books', bookRoute(app));
  router.use('/customer', customerRoute(app));
};

export default indexRoutes;
