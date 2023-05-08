import mongoose from 'mongoose';

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
