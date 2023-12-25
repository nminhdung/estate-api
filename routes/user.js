import express from "express";
import { userController } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/verifyUser.js";



const router = express.Router();
router.get('/test', userController.test);
router.put('/update/:id', verifyToken, userController.updateUser);
router.delete('/delete/:id', verifyToken, userController.deleteUser);

export const userRouter = router;