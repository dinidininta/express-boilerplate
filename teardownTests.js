import mongoose from 'mongoose';

const stopServer = async () => {
  await mongoose.disconnect();
  await globalThis.MONGOD.stop();
};

export default stopServer;
