import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import validateRequestBody from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../validations/authValidations.js";

const router = Router();

router.post("/register", validateRequestBody(registerSchema), register);

router.post("/login", validateRequestBody(loginSchema), login);

export default router;
