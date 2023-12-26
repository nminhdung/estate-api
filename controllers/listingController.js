import Listing from "../models/listing.js"

const createListing = async (req, res, next) => {
    try {
        Object.keys(req.body).forEach(key=>{
            if(!req.body[key]) throw Error("Missing input")
        })
        const listing = await Listing.create(req.body);
        return res.status(200).json({
            success: listing ? true : false,
            result: listing ? listing : null
        })
    } catch (error) {
        next(error)
    }
}



export const listingController = {
    createListing
}