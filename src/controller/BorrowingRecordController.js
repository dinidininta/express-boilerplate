class BorrowingRecordController {
  #borrowingRecordService;

  constructor(app) {
    this.#borrowingRecordService = app.locals.services.borrowingRecordService;
    this.add = this.add.bind(this);
  }

  async add(request, response, next) {
    const { params, body } = request;
    const { customerId } = params;
    const { id: bookId } = body.book;
    try {
      const createdBorrowingRecord = await this.#borrowingRecordService.add(customerId, bookId);
      response.status(201).json(createdBorrowingRecord);
    } catch (error) {
      next(error);
    }
  }
}

export default BorrowingRecordController;
