import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    }
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL']
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be at least 0']
    },
    countInStock: {
      type: Number,
      required: [true, 'Please add count in stock'],
      min: [0, 'Stock count must be at least 0'],
      default: 0
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Calculate discount price
productSchema.virtual('discountPrice').get(function() {
  return this.price * (1 - this.discount / 100);
});

// Create text index for search
productSchema.index({ name: 'text', brand: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;