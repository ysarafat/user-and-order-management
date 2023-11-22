import { Request, Response } from 'express';
import { UserServices } from './user.services';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUser(userData);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserController = { createUser };
