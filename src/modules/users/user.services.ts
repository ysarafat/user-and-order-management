import { TUsers } from './user.interface';
import User from './user.model';

// create user
const createUser = async (user: TUsers) => {
  const result = await User.create(user);
  return result;
};

export const UserServices = { createUser };
