import express from "express";
import { listingController } from "../controllers/listingController.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, listingController.createListing)
router.delete('/delete/:id', verifyToken, listingController.deleteListing)
router.put('/update/:id', verifyToken, listingController.updateListing)
router.get('/get-listing/:id', listingController.getListing)


export const listingRouter = router;
