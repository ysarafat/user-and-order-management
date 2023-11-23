import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUser);
router.get('/users/:userId', UserController.getUserByUserId);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);
export const userRoutes = router;
