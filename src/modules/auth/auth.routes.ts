import { Router } from "express";
import { signUpUser } from "./auth.controllers.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpUser);

authRouter.post("/sign-in", (req, res) => res.send("Sign in route"));

authRouter.post("/sign-out", (req, res) => res.send("Sign out route"));

export default authRouter;
