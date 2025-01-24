import bcrypt from "bcryptjs";
import prisma from "../config/dbConfig.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res, next) => {
  // const payload = registerSchema.parse(req.body);

  const { email, password, name } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    next(new AppError("User with this email already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
    select: { password: false, email: true, name: true },
  });

  res.status(201).json({
    message: "User registered successfully",
    data: user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    next(new AppError("user does not exists", 404));
  }

  const checkPassword = await bcrypt.compare(
    password,
    user?.password as string
  );

  if (!checkPassword) {
    next(new AppError("invalid email or password", 400));
  }
});
