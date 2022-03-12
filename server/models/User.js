import mongoose from "mongoose"
const { Schema, model } = mongoose

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false }
})

export default model("User", User)