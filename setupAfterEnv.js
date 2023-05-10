import mongoose from 'mongoose';
import dbConfig from './src/db/config';

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await dbConfig.disconnect();
});

beforeAll(() => dbConfig.connect());
