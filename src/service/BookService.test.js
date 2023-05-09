import BookService from './BookService';
import BookAlreadyExistError from '../errors/BookAlreadyExistError';

describe('BookService', () => {
  const app = {
    locals: {
      models: {
        book: {
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
    it('should be able to add a book', async () => {
      const { book } = app.locals.models;
      const harryPotterBook = {
        title: 'Harry Potter',
        description: 'Fiction'
      };
      book.create.mockResolvedValue(harryPotterBook);

      await bookService.addBook(harryPotterBook);

      expect(book.create).toBeCalledWith(harryPotterBook);
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
