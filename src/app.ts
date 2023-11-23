import cors from 'cors';
import express, { Application } from 'express';
import { userRoutes } from './modules/users/user.routes';
const app: Application = express();

// default middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRoutes);
export default app;
