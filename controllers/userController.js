import { errorHandler } from "../middlewares/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import Listing from "../models/listing.js";

const test = (req, res) => {
    res.json({
        message: 'Hello World'
    })
}
const updateUser = async (req, res, next) => {
    const { id } = req.user

    if (req.params.id !== id) {
        return next(errorHandler(401, 'You can only update your own account'))
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true }).select('-password')
        res.status(200).json({
            success: updatedUser ? true : false,
            rs: updatedUser ? updatedUser : ''
        })
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    const { id } = req.user

    if (req.params.id !== id) {
        return next(errorHandler(401, 'You can only update your own account'))
    }
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({
            success: deletedUser ? true : false
        })
    } catch (error) {
        next(error)
    }
}
const getListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json({
                success: listings ? true : false,
                result: listings ? listings : []
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings'))
    }
}
export const userController = {
    test,
    updateUser,
    deleteUser,
    getListings
}