import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"

import registrationRoute from "./routes/RegistrationRoute.js";
import offersRoute from "./routes/OffersRoute.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL1;
const app = express();

app.use(express.json());
app.use(cors());

app.use(registrationRoute);
app.use(offersRoute);
app.use("/images", express.static("images"));

const start = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start()