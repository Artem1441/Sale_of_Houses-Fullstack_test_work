import User from "../models/User.js"
import bcrypt from "bcrypt";
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const generateJwtTokken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "72h" })
}

class authController {

    async SignUp(req, res) {
        try {
            const validateErrors = validationResult(req)

            if (!validateErrors.isEmpty()) return res.status(400).json({ message: "Write correct data: password min length > 6 and email format is example@gmail.com" })

            const { email, password } = req.body
            const isExistUser = await User.findOne({ email }) // checking on existing user

            if (isExistUser) return res.status(400).json({ message: "User with this email is already exist" })

            const hashPassword = bcrypt.hashSync(password, 5);
            const user = new User({ email, password: hashPassword })

            return await user.save((err, room) => {
                const tokken = generateJwtTokken(room.id)

                return res.json({ message: "User was created!", tokken })
            })

        }
        catch (e) {
            console.log(e)
            res.status(400).json({ message: "Sign Up error" })
        }
    }

    async SignIn(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) return res.status(400).json({ message: "User with this email not found" })

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) return res.status(400).json({ message: "Password isn't correct" })

            const tokken = generateJwtTokken(user._id)

            return res.json({ message: "You're enter the system!", tokken })
        }
        catch (e) {
            console.log(e)
            res.status(400).json({ message: "Sign In error" })
        }
    }

    async test(req, res) {
        try {
            const { admin } = await User.findOne({ _id: req.user.id })
            const users = await User.find()
            res.json({ users, admin })
        } catch (e) {
            console.log(e)
        }
    }

}

export default new authController()
