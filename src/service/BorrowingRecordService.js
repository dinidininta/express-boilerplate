import BookService from './BookService';
import CustomerService from './CustomerService';

class BorrowingRecordService {
  #app;

  #customerService;

  #bookService;

  #borrowingRecordModel;

  constructor(app) {
    this.#app = app;
    this.#customerService = new CustomerService(app);
    this.#bookService = new BookService(app);
    this.#borrowingRecordModel = this.#app.locals.models.borrowingRecord;
  }

  async add(customerId, bookId) {
    const customer = await this.#customerService.findCustomerById(customerId);
    const book = await this.#bookService.findBookById(bookId);
    book.quantity -= 1;
    await book.save();
    const newBorrowingRecord = {
      customer, book, type: 'BORROWED'
    };
    return this.#borrowingRecordModel.create(newBorrowingRecord);
  }
}

export default BorrowingRecordService;
