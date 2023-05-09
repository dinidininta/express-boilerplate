class BookController {
  #app;

  #bookService;

  constructor(app) {
    this.#app = app;
    this.#bookService = this.#app.locals.services.bookService;
    this.fetchAll = this.fetchAll.bind(this);
    this.add = this.add.bind(this);
  }

  async fetchAll(request, response, next) {
    try {
      const books = await this.#app.locals.models.book.find();
      response.status(200);
      response.json({
        data: books
      });
    } catch (error) {
      next(error);
    }
  }

  async add(request, response, next) {
    try {
      const createdBook = await this.#bookService.addBook(request.body);
      response.status(201);
      response.json(createdBook);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
