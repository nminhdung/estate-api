import express from "express";
import { authController } from "../controllers/authController.js";
const router = express.Router();

router.post('/signup',authController.signUp)
router.post('/signin',authController.signIn)

export const authRouter = router;
