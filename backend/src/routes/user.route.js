import { Router } from "express";
import {
    createUser,
    deleteUser,
    loginUser,
    userUpdate,
} from "../controllers/user.controller.js";
import { autenticate } from "../controllers/error.controller.js";
const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.put("/users/:id", autenticate, userUpdate);
userRouter.post("/users/login", loginUser);
userRouter.delete("/user/:id", autenticate, deleteUser)

export default userRouter;
