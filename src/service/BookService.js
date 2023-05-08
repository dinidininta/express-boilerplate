class BookService {
  #app;

  #bookModel;

  constructor(app) {
    this.#app = app;
    this.#bookModel = this.#app.locals.models.book;
  }

  async addBook(book) {
    const foundBook = await this.#bookModel.findOne({ title: book.title });
    if (foundBook) {
      throw new Error('Book Already Exist!');
    }

    return this.#bookModel.create(book);
  }
}

export default BookService;
