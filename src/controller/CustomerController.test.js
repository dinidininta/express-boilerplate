import request from 'supertest';
import app from '../app';

describe('CustomerController', () => {
  const { customer } = app.locals.models;

  describe('GET /customers', () => {
    it('should retrieve customer with name containing Bob', async () => {
      await customer.insertMany([{ name: 'Bob' }, { name: 'Bobby' }, { name: 'Alice' }]);
      const { body } = await request(app).get('/api/customers?name=Bob').expect(200);
      const bob = body.customer[0];
      const bobby = body.customer[1];

      expect(body.customer).toHaveLength(2);
      expect(bob.id).toBeDefined();
      expect(bob.name).toEqual('Bob');
      expect(bobby.id).toBeDefined();
      expect(bobby.name).toEqual('Bobby');
    });
  });
});
