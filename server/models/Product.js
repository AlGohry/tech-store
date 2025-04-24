import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: String,
  rating: {
    type: Number,
    required: true
  },
  comment: String
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: Number,
  category: String,
  brand: String,
  images: [String], // روابط الصور
  colors: [String],
  sizes: [String],
  countInStock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)
export default Product
