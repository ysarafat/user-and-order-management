import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { OrderSchemaValidation } from './user.order.validation';
import { UserServices } from './user.services';
import { UserUpdateSchemaValidate } from './user.update.validation';
import { UserSchemaValidate } from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 500,
        description: error.message || 'This is an server side error.',
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
    const userData = req.body;
    const ValidateData = UserUpdateSchemaValidate(userData);
    const updatedData = await UserServices.updateUser(
      Number(userId),
      ValidateData,
    );
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

// delete user
const deleteUser = async (req: Request, res: Response) => {
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
    const isDeleted = await UserServices.deleteUser(Number(userId));
    if (isDeleted.deletedCount > 0) {
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      throw new Error('User deleted unsuccessful! please try agin');
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: 'This is an server side error.',
      },
    });
  }
};

// update orders
const updateOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const existingUser = await UserServices.getUserByUserId(Number(userId));
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const orderData = req.body;
    const ValidateData = OrderSchemaValidation(orderData);
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
    const result = await UserServices.updateOrder(Number(userId), orderData);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
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
// get all orders by userId
const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const existingUser = await UserServices.getUserByUserId(Number(userId));
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserServices.getOrdersByUserId(Number(userId));
    return res.status(200).json({
      success: true,
      message: 'Order fetched  successfully!',
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
// get all orders by userId
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const existingUser = await UserServices.getUserByUserId(Number(userId));
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserServices.calculateTotalPrice(Number(userId));
    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
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
  deleteUser,
  updateOrder,
  getOrdersByUserId,
  calculateTotalPrice,
};
