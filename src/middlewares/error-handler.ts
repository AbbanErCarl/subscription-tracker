import type { ErrorRequestHandler } from "express";
import { z } from "zod";
import { env } from "../config/env.js";
import { HttpError } from "../lib/http-error.js";
import mongoose from "mongoose";

export interface ErrorResponse {
  error: { message: string; details?: unknown };
}

// MongoDB reports a unique-index clash as code 11000, usually with the clashing fields in keyValue.
function isDuplicateKeyError(err: unknown): err is { keyValue?: Record<string, unknown> } {
  return typeof err === "object" && err !== null && "code" in err && err.code === 11000;
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

// Turn anything that was thrown into an HttpError with the right status code.
function toHttpError(err: unknown): HttpError {
  if (err instanceof HttpError) return err;

  if (err instanceof z.ZodError) {
    return new HttpError(400, "Invalid request", z.flattenError(err));
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const fields = Object.fromEntries(
      Object.entries(err.errors).map(([field, fieldError]) => [field, fieldError.message]),
    );
    return new HttpError(400, "Validation failed", { fields });
  }

  if (err instanceof mongoose.Error.CastError) {
    return new HttpError(400, `Invalid value for ${err.path}`);
  }

  if (isDuplicateKeyError(err)) {
    const details = err.keyValue ? { fields: Object.keys(err.keyValue) } : undefined;
    return new HttpError(409, "Already exists", details);
  }

  if (isClientError(err)) return new HttpError(err.status, err.message);

  return new HttpError(500, "Internal server error");
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
