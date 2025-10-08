import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/change-password", authController.changePassword);
router.post("/logout", isAuthenticated, authController.logout);
router.post("/check-email", authController.checkEmail);

export default router;
