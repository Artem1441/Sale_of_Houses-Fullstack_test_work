import mongoose from "mongoose"
const { Schema, model } = mongoose

const House = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    rentCost: { type: Number },
    saleCost: { type: Number },
})

export default model("House", House)