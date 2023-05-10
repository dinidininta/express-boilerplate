import mongoose from 'mongoose';
import applyMongooseSchemaOptions from '../utils/applyMongooseSchemaOptions';

const CustomerSchema = applyMongooseSchemaOptions({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('Customer', CustomerSchema);
