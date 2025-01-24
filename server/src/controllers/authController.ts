import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { registerSchema } from "../validations/authValidations.js";

export const register = catchAsync(async (req, res, next) => {
  const payload = registerSchema.parse(req.body);
});
