import { errorHandler } from "../middlewares/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';

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
export const userController = {
    test,
    updateUser
}