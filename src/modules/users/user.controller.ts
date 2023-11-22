import { Request, Response } from 'express';
import { TUsers } from './user.interface';
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
    const result = await UserServices.createUser(ValidateData as TUsers);
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
