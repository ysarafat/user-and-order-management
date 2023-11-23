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
export const UserController = { createUser, getAllUser };
