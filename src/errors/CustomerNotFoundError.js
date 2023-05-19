class CustomerNotFoundError extends Error {
  constructor() {
    super('Customer Does Not Exist!');
    this.httpStatus = 404;
  }
}

export default CustomerNotFoundError;
