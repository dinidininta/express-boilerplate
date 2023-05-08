import request from 'supertest';
import app from '../app';
import book from '../models/book';

describe('BookController', () => {
  describe('BookController', () => {
    const mockBook = {
      title: 'Algorithm',
      description: 'wow description'
    };
    describe('GET /books', () => {
      it('should retrieve all books', async () => {
        const createdBook = await book.create(mockBook);
        const expectedResult = {
          data: JSON.parse(JSON.stringify([createdBook]))
        };

        const { body } = await request(app).get('/api/books').expect(200);

        expect(body).toEqual(expectedResult);
      });
    });

    describe('POST /books', () => {
      it('should able to add a new book', async () => {
        const mockBook = {
        title: 'Algorithm',
        description: 'wow description'
       };
        await request(app).post('/api/books').send(mockBook).expect(201);

        const books = await book.find();

        expect(books).toHaveLength(1);
        expect(books[0].title).toEqual(mockBook.title);
      });
    });
  });
});
