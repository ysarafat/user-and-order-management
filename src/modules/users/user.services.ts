import { TOrders, TUsers } from './user.interface';
import User from './user.model';

// create user
const createUser = async (user: TUsers) => {
  const newUser = new User(user);
  await newUser.save();
  const result = await User.findById(newUser._id).select({
    password: 0,
    __v: 0,
    _id: 0,
    orders: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  return result;
};

// get users
const getAllUser = async () => {
  const result = await User.find().select({
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
  return result;
};

// get user by userId
const getUserByUserId = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  return existingUser;
};
// update user
const updateUser = async (userId: number, userData: TUsers) => {
  await User.updateOne({ userId }, userData);
  const updatedData = await getUserByUserId(userId);
  return updatedData;
};

// delete user
const deleteUser = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

// update order
const updateOrder = async (userId: number, orderData: TOrders) => {
  const update = await User.updateOrder(Number(userId), orderData);
  return update;
};
// get all orders by user id
const getOrdersByUserId = async (userId: number) => {
  const orders = await User.ordersByUserId(userId);
  return orders;
};

// calculate Total Price of Orders for a Specific User
const calculateTotalPrice = async (userId: number) => {
  const user: TUsers | null = await User.ordersByUserId(userId);

  if (user && user.orders) {
    const totalPrice = user.orders.reduce(
      (totalPrice, order) => totalPrice + order.price * order.quantity,
      0,
    );

    return totalPrice;
  }
};
export const UserServices = {
  createUser,
  getAllUser,
  getUserByUserId,
  updateUser,
  deleteUser,
  updateOrder,
  getOrdersByUserId,
  calculateTotalPrice,
};
