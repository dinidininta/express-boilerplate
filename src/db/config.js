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

const disconnect = () => {
  mongoose.disconnect();
};

export default {
  connect,
  disconnect
};
