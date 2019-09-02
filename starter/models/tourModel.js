const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'tour name is requires'],
    unique: [true, 'Name must be unique'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'duration required']
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'max group size exceeded']
  },
  difficulty: {
    type: String,
    required: [true, 'difficulty is required']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a description']
  },
  imageCover: {
    type: String,
    required: [true, 'Tour image is required']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
