import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const adminMiddleware = async (req, res, next) => {
    if (req.method === "OPTIONS") next()
    
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return res.status(403).json({ message: "User isn't authorized" })

        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        const { id } = decodedData
        const user = await User.findOne({ _id: id })

        if (!user.admin) return res.status(403).json({ message: "User isn't admin" }) // if try to add not admin

        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: "User isn't authorized" })
    }
}

export default adminMiddleware