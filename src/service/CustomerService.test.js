import CustomerService from './CustomerService';
import CustomerNotFoundError from '../errors/CustomerNotFoundError';

describe('CustomerService', () => {
  const app = {
    locals: {
      models: {
        customer: {
          findById: jest.fn()
        }
      }
    }
  };
  const customerService = new CustomerService(app);

  const { customer } = app.locals.models;
  const savedDiniCustomer = {
    id: '1234',
    name: 'Dini'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#findCustomerById', () => {
    it('should return existing customer when given customerId exists in database', async () => {
      customer.findById.mockResolvedValue(savedDiniCustomer);

      const actualResult = await customerService.findCustomerById(savedDiniCustomer.id);

      expect(actualResult).toEqual(savedDiniCustomer);
    });

    it('should throw 404 customer not found when given customer id does not exist', async () => {
      customer.findById.mockResolvedValue(null);

      const findCustomerById = () => customerService.findCustomerById(savedDiniCustomer.id);

      await expect(findCustomerById).rejects.toThrow(new CustomerNotFoundError());
    });
  });
});
