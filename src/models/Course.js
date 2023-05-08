import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Courses', CourseSchema);
