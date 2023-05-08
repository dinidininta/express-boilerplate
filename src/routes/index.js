import express from 'express';
import bookRoute from './BookRoutes';

const router = express.Router();

const indexRoutes = (app) => {
  app.use('/api', router);
  router.use('/books', bookRoute(app));
};

export default indexRoutes;
