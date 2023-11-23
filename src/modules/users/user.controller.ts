import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { UserSchemaValidate } from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const ValidateData = UserSchemaValidate(userData);

    if ('error' in ValidateData) {
      return res.status(200).json({
        success: false,
        message: ValidateData.errorMessage as string,
        error: {
          code: 499,
          description: ValidateData.errorMessage as string,
        },
      });
    }
    const result = await UserServices.createUser(ValidateData);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'This is an server side error.',
      },
    });
  }
};

// get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'This is an server side error.',
      },
    });
  }
};
//  get user by userId
const getUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByUserId(Number(userId));
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'This is an server side error.',
      },
    });
  }
};
// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByUserId(Number(userId));
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // update user data
    const { user: userData } = req.body;
    const updatedData = await UserServices.updateUser(Number(userId), userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'This is an server side error.',
      },
    });
  }
};
export const UserController = {
  createUser,
  getAllUser,
  getUserByUserId,
  updateUser,
};
