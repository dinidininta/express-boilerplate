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
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

export default mongoose.model('Book', BookSchema);
