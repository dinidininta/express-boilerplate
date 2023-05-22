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
 *   /api/customers/{customerId}/borrowing-records/:
 *     post:
 *       tags:
 *       - Customers
 *       summary: 'Borrow an existing book'
 *       produces:
 *         - application/json
 *       parameters:
 *        - in: path
 *          name: customerId
 *          schema:
 *            type: string
 *            description: The id of customer
 *       requestBody:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    book:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The id of book
 *                  required:
 *                    - book
 *       responses:
 *         201:
 *          description: Successfully creates a new borrowing record and reduces quantity of book
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                      type: string
 *                      description: Borrowing record id
 *                    book:
 *                      type: object
 *                      description: Book metadata
 *                      properties:
 *                         id:
 *                           type: string
 *                           description: The id of book
 *                         title:
 *                           type: string
 *                           description: The title of book
 *                           example: Algorithm
 *                         description:
 *                           type: string
 *                           description: The description of book
 *                           example: wow description
 *                         author:
 *                           type: object
 *                           description: Book author metadata
 *                           properties:
 *                              id:
 *                                type: string
 *                                description: The id of author
 *                              name:
 *                                type: string
 *                                description: The name of author
 *                                example: Paksi
 *                         quantity:
 *                           type: number
 *                           description: The quantity of book that is available
 *                           example: 10
 *                    customer:
 *                      type: object
 *                      description: Customer metadata
 *                      properties:
 *                         id:
 *                           type: string
 *                           description: The id of customer
 *                         name:
 *                           type: string
 *                           description: The name of customer
 *                           example: Baskara
 *                    type:
 *                      type: string
 *                      description: Borrowing record type
 *                      example: BORROWED
 *         404:
 *          description: Failed to borrow a book due to nonexistent customer or book
 *          content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Customer Does Not Exist!
 */
const initializeRoutes = (app) => {
  const { customerController, borrowingRecordController } = app.locals.controllers;
  router.get('/', customerController.fetchByName);
  router.post('/:customerId/borrowing-records', borrowingRecordController.add);
  return router;
};

export default initializeRoutes;
