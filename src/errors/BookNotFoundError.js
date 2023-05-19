class BookNotFoundError extends Error {
  constructor() {
    super('Book Does Not Exist!');
    this.httpStatus = 404;
  }
}

export default BookNotFoundError;
