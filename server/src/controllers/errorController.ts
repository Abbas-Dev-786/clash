import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { ZodError } from "zod";

const sendProdError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    console.log(err + "💥");

    return res.status(500).json({
      status: "error",
      message: "something went really wrong 😢. We are working on it 🛠.",
    });
  }
};

const sendDevError = (err: AppError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// DB schema validation error handler
const handleValidationError = (err: ZodError) => {
  return new AppError("Validation error", 400);
};

// JWT Generation error handler
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

// JWT Expired Error handler
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode ||= 500;
  err.status ||= "error";

  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    //   if (error.name === "CastError") error = handleCastError(error);
    //   if (error.code === 11000) error = handleDuplicateFieldError(error);
    if (error instanceof ZodError) error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendProdError(error, res);
  }
};

export default globalErrorHandler;
