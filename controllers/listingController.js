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



export const listingController = {
    createListing
}