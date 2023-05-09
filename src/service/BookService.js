import BookAlreadyExistError from '../errors/BookAlreadyExistError';

class BookService {
  #app;

  #bookModel;

  #authorModel;

  constructor(app) {
    this.#app = app;
    this.#bookModel = this.#app.locals.models.book;
    this.#authorModel = this.#app.locals.models.author;
  }

  async addBook(book) {
    const foundBook = await this.#bookModel.findOne({ title: book.title });
    if (foundBook) {
      throw new BookAlreadyExistError();
    }
    const newBook = await this.findAuthorAndCreateIfNotExists(book);
    return this.#bookModel.create(newBook);
  }

  async findAuthorAndCreateIfNotExists(book) {
    const existingAuthor = await this.#authorModel.findOne({ name: book.author.name });
    if (!existingAuthor) {
      const savedAuthor = await this.#authorModel.create(book.author);
      const newBook = { ...book, author: savedAuthor };
      return newBook;
    }
    const newBook = { ...book, author: existingAuthor };
    return newBook;
  }
}

export default BookService;
