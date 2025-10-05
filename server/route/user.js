import express from "express";
import {
  approveRequest,
  changeRole,
  deleteUser,
  getAllUsers,
  getPendingUsers,
  getSingleUser,
  rejectRequest,
  updateUserProfile,
} from "../controller/user.js";
import { authMiddleware, authorizeRoles } from "../midddleware/auth.js";

const userRouter = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("admin")); // only admin can access

userRouter.get("/", getAllUsers);
userRouter.get("/single/:id", getSingleUser);
userRouter.patch("/approve/:id", approveRequest);
userRouter.patch("/reject/:id", rejectRequest);
userRouter.put("/:id", updateUserProfile);
userRouter.delete("/:id", deleteUser);
userRouter.get("/pending", getPendingUsers);
userRouter.get("/change-role/:id", changeRole)

export default userRouter;
