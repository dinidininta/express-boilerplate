import request from 'supertest';
import app from '../app';

describe('BookController', () => {
  const { book } = app.locals.models;
  const { bookService } = app.locals.services;
  const harryPotterBook = {
    title: 'Algorithm',
    description: 'wow description'
  };

  describe('GET /books', () => {
    it('should retrieve all books', async () => {
      const createdBook = await book.create(harryPotterBook);
      const expectedResult = {
        data: JSON.parse(JSON.stringify([createdBook]))
      };

      const { body } = await request(app).get('/api/books').expect(200);

      expect(body).toEqual(expectedResult);
    });
  });

  describe('POST /books', () => {
    it('should able to add a new book', async () => {
      await request(app).post('/api/books').send(harryPotterBook).expect(201);

      const books = await book.find({});

      expect(books).toHaveLength(1);
      expect(books[0].title).toEqual(harryPotterBook.title);
    });

    it('should throw error 400 when book already exist', async () => {
      const expectedBody = {
        message: 'Book Already Exist!'
      };
      await bookService.addBook(harryPotterBook);
      const { body } = await request(app).post('/api/books').send(harryPotterBook).expect(400);

      expect(body).toEqual(expectedBody);
    });
  });
});
