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
const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'))
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listing'))
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            success: updatedListing ? true : false,
            rs: updatedListing ? updatedListing : null
        })
    } catch (error) {
        next(error)
    }
}
const getListing = async (req, res, next) => {

    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json({
            success: listing ? true : false,
            rs: listing ? listing : null
        })
    } catch (error) {
        next(error)
    }
}
const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const skip = parseInt(req.query.startIndex) || 0;
        if (req.query.offer === undefined || req.query.offer === 'false') {
            req.query.offer = { $in: [false, true] }
        }
        if (req.query.furnished === undefined || req.query.furnished === 'false') {
            req.query.furnished = { $in: [false, true] }
        }
        if (req.query.parking === undefined || req.query.parking === 'false') {
            req.query.parking = { $in: [false, true] }
        }
        if (req.query.type === undefined || req.query.type === 'all') {
            req.query.type = { $in: ['sale', 'rent'] }
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer: req.query.offer,
            furnished: req.query.furnished,
            parking: req.query.parking,
            type: req.query.type
        }).sort({
            [sort]: order
        }).limit(limit).skip(skip)
        return res.status(200).json({
            success: listings ? true : false,
            result: listings ? listings : []
        })

    } catch (error) {
        next(error)
    }
}




export const listingController = {
    createListing,
    deleteListing,
    updateListing,
    getListing,
    getListings
}