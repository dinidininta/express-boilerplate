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
    const existingAuthor = await this.#authorModel.findOne({ name: book.author.name });
    if (!existingAuthor) {
      const savedAuthor = await this.#authorModel.create(book.author);
      const newBook = { ...book, author: savedAuthor };
      return this.#bookModel.create(newBook);
    }
    return this.#bookModel.create(book);
  }
}

export default BookService;
