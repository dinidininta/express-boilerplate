import mongoose from 'mongoose';
import dbConfig from './src/db/config';

const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  const deleteCollectionJob = [];
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in collections) {
    const collection = collections[key];
    deleteCollectionJob.push(collection.deleteMany({}));
  }
  return Promise.all(deleteCollectionJob);
};

afterEach(() => clearDatabase());

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await dbConfig.disconnect();
});

beforeAll(() => dbConfig.connect());
