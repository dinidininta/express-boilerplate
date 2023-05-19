import BookService from './BookService';
import BookAlreadyExistError from '../errors/BookAlreadyExistError';
import BookNotFoundError from '../errors/BookNotFoundError';

describe('BookService', () => {
  const app = {
    locals: {
      models: {
        book: {
          findOne: jest.fn(),
          create: jest.fn(),
          findById: jest.fn()
        },
        author: {
          findOne: jest.fn(),
          create: jest.fn()
        }
      }
    }
  };
  const bookService = new BookService(app);

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
  const savedHarryPotterBook = {
    id: '67890',
    ...harryPotterBookWithSavedAuthor
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addBook', () => {
    it('should be able to add a book as well as a new author', async () => {
      book.create.mockResolvedValue(savedHarryPotterBook);
      author.findOne.mockResolvedValue(null);
      author.create.mockResolvedValue(savedBaskaraAuthor);

      await bookService.addBook(harryPotterBook);

      expect(author.findOne).toBeCalledWith({ name: baskaraAuthor.name });
      expect(author.create).toBeCalledWith(baskaraAuthor);
      expect(book.create).toBeCalledWith(harryPotterBookWithSavedAuthor);
    });

    it('should be able to add a book with existing author', async () => {
      book.create.mockResolvedValue(savedHarryPotterBook);
      author.findOne.mockResolvedValue(savedBaskaraAuthor);

      await bookService.addBook(harryPotterBook);

      expect(author.findOne).toBeCalledWith({ name: baskaraAuthor.name });
      expect(book.create).toBeCalledWith(harryPotterBookWithSavedAuthor);
    });

    it('should throw error when add a same book', async () => {
      book.findOne.mockResolvedValue(harryPotterBook);

      const addBook = () => bookService.addBook(harryPotterBook);

      await expect(addBook()).rejects.toThrow(new BookAlreadyExistError());
      expect(book.create).not.toBeCalledWith(harryPotterBook);
    });
  });

  describe('#findBookById', () => {
    it('should return the correct book when given bookId exists', async () => {
      book.findById.mockResolvedValue(savedHarryPotterBook);

      const actualResult = await bookService.findBookById(savedHarryPotterBook.id);

      expect(actualResult).toEqual(savedHarryPotterBook);
    });

    it('should throw BookNotFoundError when given bookId does not exist', async () => {
      book.findById.mockResolvedValue(null);

      const findBookById = () => bookService.findBookById(savedHarryPotterBook.id);

      await expect(findBookById()).rejects.toThrow(new BookNotFoundError());
    });
  });
});
