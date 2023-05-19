class BorrowingRecordController {
  #bookModel;

  #customerModel;

  #borrowingRecordModel;

  constructor(app) {
    this.#bookModel = app.locals.models.book;
    this.#customerModel = app.locals.models.customer;
    this.#borrowingRecordModel = app.locals.models.borrowingRecord;
    this.add = this.add.bind(this);
  }

  async add(request, response) {
    const { params, body } = request;
    const { customerId } = params;
    const { id: bookId } = body.book;
    const customer = await this.#customerModel.findById(customerId);
    const book = await this.#bookModel.findById(bookId);
    book.quantity -= 1;
    await book.save();
    const newBorrowingRecord = {
      customer, book, type: 'BORROWED'
    };
    const createdBorrowingRecord = await this.#borrowingRecordModel.create(newBorrowingRecord);
    response.status(201).json(createdBorrowingRecord);
  }
}

export default BorrowingRecordController;
