import { ZodError, z } from 'zod';
import { TOrders } from './user.interface';
const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});
export const OrderSchemaValidation = (data: TOrders) => {
  try {
    return OrderSchema.parse(data);
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
