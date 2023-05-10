import express from 'express';

const router = express.Router();

const initializeRoutes = (app) => {
  const { customerController } = app.locals.controllers;
  router.get('/', customerController.fetchByName);
  return router;
};

export default initializeRoutes;
