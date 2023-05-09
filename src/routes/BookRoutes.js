import express from 'express';

const router = express.Router();

/*
  Book routes
 */
/**
 * @swagger
 *  paths:
 *   /api/books:
 *     get:
 *       tags:
 *       - Books
 *       summary: 'Get list of books'
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *          description: Successfully returns a list of books
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    books:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          title:
 *                            type: string
 *                            example: Algorithm
 *                          description:
 *                            type: string
 *                            example: wow description
 *                          author:
 *                            type: object
 *                            properties:
 *                              name:
 *                                type: string
 *                                example: Baskara
 *     post:
 *        tags:
 *        - Books
 *        summary: Create a new book
 *        consumes:
 *          - application/json
 *        produces:
 *          - application/json
 *        requestBody:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                      example: Algorithm
 *                    description:
 *                      type: string
 *                      example: wow description
 *                    author:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          example: Baskara
 *                  required:
 *                    - title
 *                    - author
 *        responses:
 *           201:
 *             description: Successfully created a new book
 *             content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      title:
 *                        type: string
 *                        example: Algorithm
 *                      description:
 *                        type: string
 *                        example: wow description
 *                      author:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Baskara
 *           400:
 *             description: Failed to create a new book due to duplication
 *             content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Book Already Exist!
 */
const initializeRoutes = (app) => {
  const { bookController } = app.locals.controllers;
  router.get('/', bookController.fetchAll);
  router.post('/', bookController.add);
  return router;
};

export default initializeRoutes;
