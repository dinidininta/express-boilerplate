class BookController {
  #app;
  #bookService

  constructor(app) {
    this.#app = app;
    this.#bookService = this.#app.locals.services.bookService;
    this.fetchAll = this.fetchAll.bind(this);
    this.add = this.add.bind(this);
  }

  async fetchAll(req, res, next) {
    try {
      const books = await this.#app.locals.models.book.find();
      res.status(200);
      res.json({
        data: books
      });
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      const createdBook = await this.#bookService.addBook(req.body);
      res.status(201);
      res.json(createdBook);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
