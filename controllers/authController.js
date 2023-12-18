import User from "../models/user.js";
import bcryptjs from 'bcryptjs'

const signUp = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new Error('Missing input');
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = await User.create({ username, email, password: hashedPassword })
    try {
        if (newUser) {
            res.status(201).json({
                result: newUser,
                mes:'User created successfully' 
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

    
}
export const authController = {
    signUp
}