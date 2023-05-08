import mongoose from 'mongoose';
import applyMongooseSchemaOptions from '../utils/applyMongooseSchemaOptions';

const AuthorSchema = applyMongooseSchemaOptions({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('Author', AuthorSchema);
