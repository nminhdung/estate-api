import express from "express";
import { userController } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/verifyUser.js";



const router = express.Router();
router.get('/test', userController.test);
router.put('/update/:id', verifyToken, userController.updateUser);

export const userRouter = router;