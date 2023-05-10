class CustomerController {
  #app;

  constructor(app) {
    this.#app = app;
    this.fetchByName = this.fetchByName.bind(this);
  }

  async fetchByName(request, response, next) {
    try {
      const { query: { name } } = request;
      const fetchQuery = { name: { $regex: name } };
      const customer = await this.#app.locals.models.customer.find(fetchQuery);
      response.status(200);
      response.json({ customer });
    } catch (error) {
      next(error);
    }
  }
}

export default CustomerController;
