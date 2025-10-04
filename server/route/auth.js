import express from 'express';
import { login,  signUp } from '../controller/auth.js';

const authRouter = express.Router();

authRouter.post("/signup", signUp );
authRouter.post("/login", login);

export default authRouter;

