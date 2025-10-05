import express from "express";
import {
  approveRequest,
  deleteUser,
  getAllUsers,
  getPendingUsers,
  getSingleUser,
  rejectRequest,
  updateUserProfile,
} from "../controller/user.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/single/:id", getSingleUser);
userRouter.patch("/approve/:id", approveRequest);
userRouter.patch("/reject/:id", rejectRequest);
userRouter.put("/:id", updateUserProfile);
userRouter.delete("/:id", deleteUser);
userRouter.get("/pending", getPendingUsers);

export default userRouter;
