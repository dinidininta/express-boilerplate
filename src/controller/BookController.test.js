import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

describe('BookController', () => {
  const { book, author } = app.locals.models;
  const { bookService } = app.locals.services;
  const harryPotterBook = {
    title: 'Algorithm',
    description: 'wow description',
    author: {
      name: 'Baskara'
    }
  };

  afterEach(async () => {
    const { collections } = mongoose.connection;
    await collections.authors.deleteMany({});
    await collections.books.deleteMany({});
  });

  describe('GET /books', () => {
    it('should retrieve all books', async () => {
      const createdAuthor = await author.create(harryPotterBook.author);
      const newBook = { ...harryPotterBook, author: createdAuthor._id };
      await book.create(newBook);
      const books = await book.find().populate('author');
      const expectedResult = {
        books: JSON.parse(JSON.stringify(books))
      };

      const { body } = await request(app).get('/api/books?source=test').expect(200);

      expect(body).toEqual(expectedResult);
    });
  });

  describe('POST /books', () => {
    it('should able to add a new book and add a new', async () => {
      const { body: createdBook } = await request(app).post('/api/books').send(harryPotterBook).expect(201);

      const books = await book.find();
      const expectedBook = books[0];

      expect(books).toHaveLength(1);
      expect(createdBook.id).toEqual(expectedBook.id);
      expect(createdBook.title).toEqual(expectedBook.title);
      expect(createdBook.description).toEqual(expectedBook.description);
      expect(createdBook.author.id).toBeDefined();
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
