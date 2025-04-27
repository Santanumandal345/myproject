import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be at least 0']
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

const shippingAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  city: {
    type: String,
    required: [true, 'Please add a city']
  },
  postalCode: {
    type: String,
    required: [true, 'Please add a postal code']
  },
  country: {
    type: String,
    required: [true, 'Please add a country']
  }
});

const paymentResultSchema = new mongoose.Schema({
  id: String,
  status: String,
  update_time: String,
  email_address: String
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: [true, 'Please add a payment method'],
      enum: ['Credit Card', 'PayPal', 'Stripe', 'Cash On Delivery']
    },
    paymentResult: paymentResultSchema,
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveredAt: Date,
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Calculate prices before saving
orderSchema.pre('save', async function(next) {
  this.itemsPrice = this.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  
  // Default tax rate (can be configured)
  this.taxPrice = Number((this.itemsPrice * 0.15).toFixed(2));
  
  // Default shipping (free over $100)
  this.shippingPrice = this.itemsPrice > 100 ? 0 : 15;
  
  this.totalPrice = Number(
    (this.itemsPrice + this.taxPrice + this.shippingPrice).toFixed(2)
  );
  
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;