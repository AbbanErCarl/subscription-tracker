import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.controllers.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:userId", getUserById);

userRouter.post("/", createUser);

userRouter.put("/:userId", updateUser);

userRouter.delete("/:userId", deleteUser);

export default userRouter;
