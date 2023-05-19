import mongoose from 'mongoose';
import applyMongooseSchemaOptions from '../utils/applyMongooseSchemaOptions';

const BorrowingRecordSchema = applyMongooseSchemaOptions({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  type: {
    type: String,
    required: true
  }
});

export default mongoose.model('BorrowingRecord', BorrowingRecordSchema);
