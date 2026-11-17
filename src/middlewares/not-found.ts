import type { RequestHandler } from "express";
import { HttpError } from "../lib/http-error.js";

const notFound: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export default notFound;
