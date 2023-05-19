class BorrowingRecordController {
  #bookService;

  #customerModel;

  #borrowingRecordModel;

  constructor(app) {
    this.#bookService = app.locals.services.bookService;
    this.#customerModel = app.locals.models.customer;
    this.#borrowingRecordModel = app.locals.models.borrowingRecord;
    this.add = this.add.bind(this);
  }

  async add(request, response, next) {
    const { params, body } = request;
    const { customerId } = params;
    const { id: bookId } = body.book;
    try {
      const customer = await this.#customerModel.findById(customerId);
      const book = await this.#bookService.findBookById(bookId);
      book.quantity -= 1;
      await book.save();
      const newBorrowingRecord = {
        customer, book, type: 'BORROWED'
      };
      const createdBorrowingRecord = await this.#borrowingRecordModel.create(newBorrowingRecord);
      response.status(201).json(createdBorrowingRecord);
    } catch (error) {
      next(error);
    }
  }
}

export default BorrowingRecordController;
