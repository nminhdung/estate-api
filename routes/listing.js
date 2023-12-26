import express from "express";
import { listingController } from "../controllers/listingController.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, listingController.createListing)



export const listingRouter = router;
