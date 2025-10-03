import express from 'express';
import { loginController, signUpController } from '../controller/auth';

const authRouter = express.Router();

authRouter.post("/signup", signUpController);
authRouter.post("/login", loginController);

export default authRouter;

