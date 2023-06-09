import request from 'supertest';
import app from '../app';

describe('BorrowingRecordController', () => {
  const {
    author, book, borrowingRecord, customer
  } = app.locals.models;
  const harryPotterBook = {
    title: 'Harry Potter',
    description: 'wow description',
    quantity: 10
  };
  const harryPotterAuthor = {
    name: 'Baskara'
  };
  const dini = {
    name: 'Dini'
  };
  const createBorrowingRecordPayload = (id) => ({
    book: { id }
  });

  describe('POST /customers/:customerId/borrowing-records', () => {
    it('should return 201 create new borrowing record and reduce quantity of books when customer and book exist', async () => {
      const savedAuthor = await author.create(harryPotterAuthor);
      const harryPotterBookWithAuthor = { ...harryPotterBook, author: savedAuthor };
      const savedHarryPotterBook = await book.create(harryPotterBookWithAuthor);
      const savedCustomer = await customer.create(dini);
      const payload = createBorrowingRecordPayload(savedHarryPotterBook.id);

      const { body: actualResult } = await request(app)
        .post(`/api/customers/${savedCustomer.id}/borrowing-records`)
        .send(payload)
        .expect(201);

      const expectedBorrowingRecord = await borrowingRecord
        .findOne({ book: savedHarryPotterBook._id });
      const borrowedBook = await book.findById(savedHarryPotterBook._id);

      expect(actualResult.id).toEqual(expectedBorrowingRecord.id);
      expect(actualResult.type).toEqual('BORROWED');
      expect(borrowedBook.quantity).toEqual(9);
    });

    it('should return 404 book not found when trying to borrow nonexistent book', async () => {
      const savedCustomer = await customer.create(dini);
      const nonExistentId = '51c35e5ced18cb901d000001';
      const payload = createBorrowingRecordPayload(nonExistentId);
      const expectedResult = { message: 'Book Does Not Exist!' };

      const { body: actualResult } = await request(app)
        .post(`/api/customers/${savedCustomer.id}/borrowing-records`)
        .send(payload)
        .expect(404);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return 404 customer not found when trying to borrow with nonexistent customer id', async () => {
      const nonExistentId = '51c35e5ced18cb901d000001';
      const payload = createBorrowingRecordPayload(nonExistentId);
      const expectedResult = { message: 'Customer Does Not Exist!' };

      const { body: actualResult } = await request(app)
        .post(`/api/customers/${nonExistentId}/borrowing-records`)
        .send(payload)
        .expect(404);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
