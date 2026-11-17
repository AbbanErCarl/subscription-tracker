import type { ErrorRequestHandler } from "express";
import { z } from "zod";
import { env } from "../config/env.js";
import { HttpError } from "../lib/http-error.js";

export interface ErrorResponse {
  error: { message: string; details?: unknown };
}

// Turn anything that was thrown into an HttpError with the right status code.
function toHttpError(err: unknown): HttpError {
  if (err instanceof HttpError) return err;
  if (err instanceof z.ZodError) {
    return new HttpError(400, "Invalid request", z.flattenError(err));
  }
  if (isClientError(err)) return new HttpError(err.status, err.message);
  return new HttpError(500, "Internal server error");
}

// Errors from Express's own middleware (e.g. malformed JSON) carry a 4xx status and expose: true.
function isClientError(err: unknown): err is Error & { status: number } {
  return (
    err instanceof Error &&
    "expose" in err &&
    err.expose === true &&
    "status" in err &&
    typeof err.status === "number"
  );
}

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const httpError = toHttpError(err);
  if (httpError.statusCode >= 500) console.error(err);

  const body: ErrorResponse = { error: { message: httpError.message } };
  if (httpError.details !== undefined) body.error.details = httpError.details;
  if (httpError.statusCode >= 500 && env.NODE_ENV !== "production" && err instanceof Error) {
    body.error.details = { stack: err.stack };
  }

  res.status(httpError.statusCode).json(body);
};

export default errorHandler;
