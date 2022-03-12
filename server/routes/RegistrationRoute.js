import express from "express";
import authController from "../controllers/RegistrationController.js";
import authMiddleware from "../middleware/RegistrationMiddleware.js";
import { check } from "express-validator"

const router = express.Router();

router.post("/SignUp", [
    check("email", "Email can't be empty").notEmpty(),
    check("password", "Min length of password - 6").isLength({ min: 6 })
], authController.SignUp);
router.post("/SignIn", authController.SignIn);
router.get("/test", authMiddleware, authController.test)

export default router;