import express from 'express';

const router = express.Router();

/*
  Course routes
 */
/**
 * @swagger
 *
 * /api/courses:
 *   get:
 *     tags:
 *     - Courses
 *     summary: 'Get List Of Courses'
 *     description: Create demand request with multiple talent request
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: Get Data Successful
 *   post:
 *     tags:
 *     - Courses
 *     summary: 'Create Course'
 *     description: Create course
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: Create course successful
 */
const initializeRoutes = (app) => {
  const { courseController } = app.locals.controllers;
  router.get('/', courseController.fetchAll);
  return router;
};

export default initializeRoutes;
