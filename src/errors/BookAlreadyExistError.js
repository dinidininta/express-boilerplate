class BookAlreadyExistError extends Error {
  constructor() {
    super('Book Already Exist!');
    this.httpStatus = 400;
  }
}

export default BookAlreadyExistError;
