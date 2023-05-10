import express from 'express';

const router = express.Router();

/*
  Customer routes
 */
/**
 * @swagger
 *  paths:
 *   /api/customers:
 *     get:
 *       tags:
 *       - Customers
 *       summary: 'Get list of customers that containing name'
 *       produces:
 *         - application/json
 *       parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *            description: The name of customer
 *       responses:
 *         200:
 *          description: Successfully returns a list of customers that containing name
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    customers:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Bob
 */
const initializeRoutes = (app) => {
  const { customerController } = app.locals.controllers;
  router.get('/', customerController.fetchByName);
  return router;
};

export default initializeRoutes;
