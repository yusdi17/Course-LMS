import mongoose from 'mongoose';
import { de } from 'zod/v4/locales';

const userModel = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  photo:{
    type: String,
    required: false
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ['student', 'manager'],
    default: 'manager'
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  manager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

export default mongoose.model('User', userModel);