import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TOrders,
  TUserName,
  TUsers,
  UserModel,
} from './user.interface';
const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const UserAddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const OrderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const UserSchema = new Schema<TUsers, UserModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: UserNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: UserAddressSchema,
    required: true,
  },
  orders: {
    type: [OrderSchema],
  },
});

// pre save middleware
UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// custom statics methods
UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId }).select({
    username: 1,
    'fullName.firstName': 1,
    'fullName.lastName': 1,
    age: 1,
    email: 1,
    'address.street': 1,
    'address.city': 1,
    'address.country': 1,
    _id: 0,
  });
  return existingUser;
};

const User = model<TUsers, UserModel>('User', UserSchema);

export default User;
