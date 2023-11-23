import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// user management  route
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getUserByUserId);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// order management route
router.put('/:userId/orders', UserController.updateOrder);
router.get('/:userId/orders');
router.get('/:userId/orders/total-price');
export const userRoutes = router;
