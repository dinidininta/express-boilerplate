import mongoose from 'mongoose';
import applyMongooseSchemaOptions from '../utils/applyMongooseSchemaOptions';

const BookSchema = applyMongooseSchemaOptions({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export default mongoose.model('Book', BookSchema);
