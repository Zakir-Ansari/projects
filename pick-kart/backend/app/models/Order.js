const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    selectedSize: { type: String },
    payedAmount: { type: Number, required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Submitted', 'Accepted', 'Shipped', 'Out of Delivery', 'Delivered', 'Cancelled'],
      default: 'Submitted',
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
