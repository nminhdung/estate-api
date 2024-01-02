import { errorHandler } from "../middlewares/error.js";
import Listing from "../models/listing.js"

const createListing = async (req, res, next) => {
    try {
        // if (!req.body.name || !req.body.description || !req.body.address || !req.body.type)
        // {
        //     throw new Error('Missing inputs')
        // }
        const listing = await Listing.create(req.body);
        return res.status(200).json({
            success: listing ? true : false,
            result: listing ? listing : null
        })
    } catch (error) {
        next(error)
    }
}

const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
   
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'))
    }

    if (req.user.id !== listing.userRef) {  

        return next(errorHandler(401, 'You can only delete your own listing'))
    }
    try {
        const listingDeleted = await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: listingDeleted ? true : false,
            message: listingDeleted ? "Deleted listing successfully." : "Can not delete listing"
        })
    } catch (error) {
        next(error)
    }
}



export const listingController = {
    createListing,
    deleteListing
}