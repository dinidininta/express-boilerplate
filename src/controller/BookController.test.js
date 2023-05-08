import request from 'supertest';
import app from '../app';
import Book from '../models/book';

describe('BookController', () => {
  describe('BookController', () => {
    const mockBook = {
      title: 'Algorithm',
      description: 'wow description'
    };
    describe('GET /books', () => {
      it('should retrieve all books', async () => {
        const book = await Book.create(mockBook);
        const expectedResult = {
          data: JSON.parse(JSON.stringify([book]))
        };

        const { body } = await request(app).get('/api/books').expect(200);

        expect(body).toEqual(expectedResult);
      });
    });
  });
});
