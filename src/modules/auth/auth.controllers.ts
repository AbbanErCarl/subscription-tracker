import type { RequestHandler } from "express";

export const signUpUser: RequestHandler = (_req, res) => {
  res.send("Sign up a new user");
};