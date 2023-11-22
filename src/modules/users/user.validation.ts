import { z, ZodError } from 'zod';
import { TUsers } from './user.interface';

const UserNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const UserAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: UserNameSchema,
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: UserAddressSchema,
  orders: z.array(OrderSchema).optional(),
});

export const UserSchemaValidate = (data: TUsers) => {
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
