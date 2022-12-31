import mongoose from "mongoose";


const printOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  printType: {
    type: String,
    required: true,
    enum: ['color', 'black-and-white']
  },
  pages: {
    type: Number,
    required: true
  },
  sides: {
    type: String,
    required: true,
    enum: ['single', 'double']
  },
  copies: {
    type: Number,
    required: true
  },
  binding: {
    type: String,
    required: true,
    enum: ['none', 'stapled', 'spiral']
  },
  totalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'processing', 'completed', 'cancelled']
  }
}, { timestamps: true });




// paperType: {
//   type: String,
//   required: true,
//   enum: ['matte', 'glossy']
// },
// printQuality: {
//   type: String,
//   required: true,
//   enum: ['high', 'medium', 'low']
// },
// printSize: {
//   type: String,
//   required: true,
//   enum: ['letter', 'legal', 'a4']
// },

export default mongoose.model('PrintOrder', printOrderSchema);
