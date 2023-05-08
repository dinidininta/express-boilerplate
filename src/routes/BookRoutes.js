import express from 'express';

const router = express.Router();

/*
  Book routes
 */
/**
 * @swagger
 *
 * /api/books:
 *   get:
 *     tags:
 *     - Books
 *     summary: 'Get List Of Books'
 *     description: Show All list of books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: Get Data Successful
 *   post:
 *     tags:
 *     - Books
 *     summary: 'Create Course'
 *     description: Create course
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: Create course successful
 */
const initializeRoutes = (app) => {
  const { bookController } = app.locals.controllers;
  router.get('/', bookController.fetchAll);
  return router;
};

export default initializeRoutes;
