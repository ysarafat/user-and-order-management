import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUser);
export const userRoutes = router;
