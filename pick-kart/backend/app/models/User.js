const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  address: { type: String, default: '' },
  image: { type: String, default: '' },
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  cartList: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Product reference
      count: { type: Number, default: 1 }, // Count field with a default value
    },
  ],
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Seller', 'User'], default: 'User' },
    isActive: { type: Boolean, default: true },
    profile: {
      type: ProfileSchema,
      default: () => ({}), // Initialize with an empty object by default
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
