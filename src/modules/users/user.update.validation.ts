import { z, ZodError } from 'zod';
import { TUsers } from './user.interface';

const UserNameSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const UserAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const OrderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

const UserSchema = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: UserNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: UserAddressSchema.optional(),
  orders: z.array(OrderSchema).optional(),
});

export const UserUpdateSchemaValidate = (data: TUsers) => {
  try {
    return UserSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const zodErrors = error.errors.map((err) => {
        return { message: err.path[0] + ' is ' + err.message };
      });
      const { message } = zodErrors[0];
      return {
        error: true,
        errorMessage: message,
      };
    }
    throw error;
  }
};
