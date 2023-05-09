import BookService from './BookService';
import BookAlreadyExistError from '../errors/BookAlreadyExistError';

describe('BookService', () => {
  const app = {
    locals: {
      models: {
        book: {
          findOne: jest.fn(),
          create: jest.fn()
        },
        author: {
          findOne: jest.fn(),
          create: jest.fn()
        }
      }
    }
  };
  const bookService = new BookService(app);
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('addBook', () => {
    it('should be able to add a book as well as a new author', async () => {
      const { book, author } = app.locals.models;
      const baskaraAuthor = {
        name: 'Baskara'
      };
      const savedBaskaraAuthor = {
        id: '12345',
        ...baskaraAuthor
      };
      const harryPotterBook = {
        title: 'Harry Potter',
        description: 'Fiction',
        author: {
          ...baskaraAuthor
        }
      };
      const harryPotterBookWithSavedAuthor = {
        title: 'Harry Potter',
        description: 'Fiction',
        author: {
          ...savedBaskaraAuthor
        }
      };

      book.create.mockResolvedValue(harryPotterBookWithSavedAuthor);
      author.findOne.mockResolvedValue(null);
      author.create.mockResolvedValue(savedBaskaraAuthor);

      await bookService.addBook(harryPotterBook);

      expect(author.findOne).toBeCalledWith({ name: baskaraAuthor.name });
      expect(author.create).toBeCalledWith(baskaraAuthor);
      expect(book.create).toBeCalledWith(harryPotterBookWithSavedAuthor);
    });

    it('should be able to add a book with existing author', async () => {
      const { book, author } = app.locals.models;
      const baskaraAuthor = {
        name: 'Baskara'
      };
      const savedBaskaraAuthor = {
        id: '12345',
        ...baskaraAuthor
      };
      const harryPotterBook = {
        title: 'Harry Potter',
        description: 'Fiction',
        author: {
          ...baskaraAuthor
        }
      };
      const harryPotterBookWithSavedAuthor = {
        title: 'Harry Potter',
        description: 'Fiction',
        author: {
          ...savedBaskaraAuthor
        }
      };

      book.create.mockResolvedValue(harryPotterBookWithSavedAuthor);
      author.findOne.mockResolvedValue(savedBaskaraAuthor);

      await bookService.addBook(harryPotterBook);

      expect(author.findOne).toBeCalledWith({ name: baskaraAuthor.name });
      expect(book.create).toBeCalledWith(harryPotterBookWithSavedAuthor);
    });

    it('should throw error when add a same book', async () => {
      const { book } = app.locals.models;
      const harryPotterBook = {
        title: 'Harry Potter',
        description: 'Fiction'
      };
      book.findOne.mockResolvedValue(harryPotterBook);

      const addBook = () => bookService.addBook(harryPotterBook);

      await expect(addBook()).rejects.toThrow(BookAlreadyExistError);
      expect(book.create).not.toBeCalledWith(harryPotterBook);
    });
  });
});
