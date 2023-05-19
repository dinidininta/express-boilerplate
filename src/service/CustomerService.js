import CustomerNotFoundError from '../errors/CustomerNotFoundError';

class CustomerService {
  #app;

  #customerModel;

  constructor(app) {
    this.#app = app;
    this.#customerModel = this.#app.locals.models.customer;
  }

  async findCustomerById(customerId) {
    const customer = await this.#customerModel.findById(customerId);
    if (!customer) {
      throw new CustomerNotFoundError();
    }
    return customer;
  }
}

export default CustomerService;
