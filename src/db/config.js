import mongoose from 'mongoose';

const connect = () => {
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

const disconnect = async () => {
  await mongoose.disconnect();
};

export default {
  connect,
  disconnect
};
