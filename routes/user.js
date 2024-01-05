import express from "express";
import { userController } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/verifyUser.js";



const router = express.Router();
router.get('/listings/:id',verifyToken, userController.getListings);
router.put('/update/:id', verifyToken, userController.updateUser);
router.delete('/delete/:id', verifyToken, userController.deleteUser);
router.get('/get-user', verifyToken, userController.getUser);

export const userRouter = router;