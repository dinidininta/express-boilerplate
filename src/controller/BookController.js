class BookController {
  #app;

  constructor(app) {
    this.#app = app;
    this.fetchAll = this.fetchAll.bind(this);
  }

  async fetchAll(req, res, next) {
    try {
      const courses = await this.#app.locals.models.book.find();
      res.status(200);
      res.json({
        data: courses
      });
    } catch (error) {
      next(error);
    }
  }
}
export default BookController;
