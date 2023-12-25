import User from "../models/user.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../middlewares/error.js";
import jwt from 'jsonwebtoken';

const signUp = async (req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new Error('Missing input');
    const existEmail = await User.findOne({ email: email });
    if (existEmail) throw new Error("Email existed");
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    try {
        if (newUser) {
            res.status(201).json({
                result: newUser ? newUser : null,
                mes: 'User created successfully'
            })
        }
    } catch (error) {
        next(error);
    }
}
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs",
        });
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, "User not found!"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Password is wrong"))

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { password: pass, ...userData } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({
            result: validUser ? userData : null,
            success: validUser ? true : false
        });
    } catch (error) {
        next(error)
    }
}
export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...dataUser } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(dataUser)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = await User.create({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashPassword,
                avatar: req.body.photo
            })

            const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...dataUser } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }).status(200).json(dataUser)
        }
    } catch (error) {
        next(error)
    }
}
export const authController = {
    signUp,
    signIn,
    google
}