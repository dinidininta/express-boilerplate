import mongoose from 'mongoose';

const applyMongooseSchemaOptions = (schema) => new mongoose.Schema(schema, {
  toJSON: {
    transform: (document, returnValue) => {
      const { _id, __v, ...object } = returnValue;
      return { id: document.get('id'), ...object };
    }
  }
});

export default applyMongooseSchemaOptions;
