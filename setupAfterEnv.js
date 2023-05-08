import mongoose from 'mongoose';
import dbConfig from './src/db/config';

const clearDatabase = () => {
  const { collections } = mongoose.connection;
  const deleteCollectionJob = [];
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in collections) {
    const collection = collections[key];
    deleteCollectionJob.push(collection.deleteMany());
  }
  return Promise.all(deleteCollectionJob);
};

afterEach(() => clearDatabase());

afterAll(() => mongoose.connection.dropDatabase());
beforeAll(() => dbConfig.connect());
